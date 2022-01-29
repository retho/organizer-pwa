import {History, Location} from 'history';
import React, {FC, useContext, useLayoutEffect, useMemo} from 'react';

import {cn} from '../bem';
import {panic, useForceRender} from '../utils';
import {Href, matchRoute, Route} from './core';
import styles from './react.module.scss';

type RouterContext = {
  history: History;
};
const routerContext = React.createContext<null | RouterContext>(null);
const useRouterContext = (): RouterContext =>
  useContext(routerContext) || panic('No router context provided');

export const RouterProvider: FC<{history: History}> = ({history, children}) => (
  <routerContext.Provider value={{history}}>{children}</routerContext.Provider>
);

export const Link: FC<
  {href: Href; replace?: boolean} & React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({href, className, replace, onClick, ...rest}) => {
  const history = useHistory();
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    if (replace) history.replace(href);
    else history.push(href);
    onClick && onClick(e);
  };
  return <a href={href} onClick={handleClick} className={cn(styles.link, className)} {...rest} />;
};
export const Redirect: FC<{to: Href}> = ({to}) => {
  const {history} = useRouterContext();
  useLayoutEffect(() => {
    history.replace(to);
  }, []);
  return null;
};

type UsedHistory = {
  push: (path: Href) => void;
  replace: (path: Href) => void;
};
export const useHistory = (): UsedHistory => {
  const {history} = useRouterContext();
  return useMemo(() => {
    return {
      push: (path: Href) => history.push(encodeURI(path)),
      replace: (path: Href) => history.replace(encodeURI(path)),
    };
  }, []);
};

export const useLocation = (): Location => {
  const {history} = useRouterContext();
  const forceRender = useForceRender();
  useLayoutEffect(() => history.listen(forceRender), [history]);
  return history.location;
};

export const useRoutes = <R extends Route<Record<string, string>, unknown>>(
  routes: R[]
): null | {route: R; params: Record<string, string>; query: unknown} => {
  const location = useLocation();

  return useMemo(() => {
    for (const r of routes) {
      const route = r;
      const matched = matchRoute(route, location.pathname, location.search);
      if (matched) {
        const {params, query} = matched;
        return {route, params, query};
      }
    }
    return null;
  }, [routes, location.pathname, location.search]);
};
