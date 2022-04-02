import React from 'react';
import {emptyQueryableInstance, Redirect, Route, stringifyRoute} from 'src/core/router';
import {declareRouteParams} from 'src/core/router/core';
import DemoPage from 'src/pages/DemoPage';
import DemoRouter, {DemoRouterPageTab} from 'src/pages/DemoRouter';
import {demoRouterPageQueryableInstance} from 'src/pages/DemoRouter/query';
import MainPage from 'src/pages/MainPage';
import TodoEditPage from 'src/pages/TodoEditPage';

export type AppRoute<Params, Query> = Route<Params, Query> & {
  render: (params: Params, query: Query) => JSX.Element;
};
const createRoute = <Params extends Record<string, string>, Query>(
  route: AppRoute<Params, Query>
): AppRoute<Params, Query> => route;

// =
export const demo = createRoute({
  pattern: '/demo',
  params: declareRouteParams(),
  query: emptyQueryableInstance,
  render: () => <DemoPage />,
});
export const root = createRoute({
  pattern: '/',
  params: declareRouteParams(),
  query: emptyQueryableInstance,
  render: () => <Redirect to={stringifyRoute(todoList, {}, {})} />,
});

// =
export const todoList = createRoute({
  pattern: '/todo/list',
  params: declareRouteParams(),
  query: emptyQueryableInstance,
  render: () => <MainPage />,
});
export const todoNew = createRoute({
  pattern: '/todo/new',
  params: declareRouteParams(),
  query: emptyQueryableInstance,
  render: () => <TodoEditPage />,
});
export const todoEdit = createRoute({
  pattern: '/todo/:todoId/edit',
  params: declareRouteParams<{todoId: string}>(),
  query: emptyQueryableInstance,
  render: ({todoId}) => <TodoEditPage todoId={todoId} />,
});

export const demoRouter = createRoute({
  pattern: '/demo/demo-router/:tab',
  params: declareRouteParams<{tab: DemoRouterPageTab}>(),
  query: demoRouterPageQueryableInstance,
  render: ({tab}, query) => <DemoRouter tab={tab} query={query} />,
});
