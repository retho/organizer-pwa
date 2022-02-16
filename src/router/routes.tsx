import React from 'react';
import {emptyQueryableInstance, Queryable, Redirect, Route, stringifyRoute} from 'src/core/router';
import DemoPage from 'src/pages/DemoPage';
import DemoRouter, {DemoRouterPageTab} from 'src/pages/DemoRouter';
import {demoRouterPageQueryableInstance} from 'src/pages/DemoRouter/query';
import MainPage from 'src/pages/MainPage';
import TodoEditPage from 'src/pages/TodoEditPage';

type QueryOf<T> = T extends Queryable<infer J> ? J : never;
export type AppRoute<Params extends Record<string, string>, Query> = Route<Params, Query> & {
  render: (params: Params, query: Query) => JSX.Element;
};
const createRoute = <
  Params extends Record<string, string> = Record<string, never>,
  Query extends unknown = QueryOf<typeof emptyQueryableInstance>
>(
  queryableInstance: Queryable<Query>
) => (route: Omit<AppRoute<Params, Query>, 'queryableInstance'>): AppRoute<Params, Query> => ({
  ...route,
  queryableInstance,
});

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
export const todoEdit = createRoute<{todoId: string}>(emptyQueryableInstance)({
  pattern: '/todo/:todoId/edit',
  render: ({todoId}) => <TodoEditPage todoId={todoId} />,
});

export const devDemoRouter = createRoute<
  {
    tab: DemoRouterPageTab;
  },
  QueryOf<typeof demoRouterPageQueryableInstance>
>(demoRouterPageQueryableInstance)({
  pattern: '/demo/demo-router/:tab',
  render: ({tab}, query) => <DemoRouter tab={tab} query={query} />,
});
