import './styles.scss';

import React, {FC} from 'react';
import FooterTabs, {FooterTab} from 'src/components/forPages/FooterTabs';
import MainLayout from 'src/components/templates/MainLayout';
import {bem} from 'src/core/bem';

import TodoList from './TodoList';

const root = bem(module.id, 'MainPage');
const MainPage: FC = () => {
  return (
    <MainLayout header="Todo list">
      <div className={root()}>
        <div className={root('body')}>
          <TodoList />
        </div>
        <FooterTabs className={root('footer')} activeTab={FooterTab.todoList} />
      </div>
    </MainLayout>
  );
};

export default MainPage;
