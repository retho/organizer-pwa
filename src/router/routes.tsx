import React from 'react';
import {emptyQueryableInstance, Queryable, Redirect, Route, stringifyRoute} from 'src/core/router';
import DemoPage from 'src/pages/DemoPage';
import DemoRouter, {DemoRouterPageTab} from 'src/pages/DemoRouter';
import {demoRouterPageQueryableInstance} from 'src/pages/DemoRouter/query';
import MainPage from 'src/pages/MainPage';
import TodoEditPage from 'src/pages/TodoEditPage';

export type AppRoute<Params extends Record<string, string>, Query> = Route<Params, Query> & {
  render: (params: Params, query: Query) => JSX.Element;
};
const createRoute = <Query extends unknown>(queryableInstance: Queryable<Query>) => <
  Params extends Record<string, string>
>(
  route: Omit<AppRoute<Params, Query>, 'queryableInstance'>
): AppRoute<Params, Query> => ({...route, queryableInstance});

// =
export const demo = createRoute(emptyQueryableInstance)({
  pattern: '/demo',
  render: () => <DemoPage />,
});
export const root = createRoute(emptyQueryableInstance)({
  pattern: '/',
  render: () => <Redirect to={stringifyRoute(todoList, {}, {})} />,
});

// =
export const todoList = createRoute(emptyQueryableInstance)({
  pattern: '/todo/list',
  render: () => <MainPage />,
});
export const todoNew = createRoute(emptyQueryableInstance)({
  pattern: '/todo/new',
  render: () => <TodoEditPage />,
});

export const devDemoRouter = createRoute(demoRouterPageQueryableInstance)<{
  tab: DemoRouterPageTab;
}>({
  pattern: '/demo/demo-router/:tab',
  render: ({tab}, query) => <DemoRouter tab={tab} query={query} />,
});
