import './styles.scss';

import React, {FC} from 'react';
import FooterTabs, {FooterTab} from 'src/components/forPages/FooterTabs';
import MainLayout from 'src/components/templates/MainLayout';
import {bem} from 'src/core/bem';

import SettingsList from './SettingsList';

const root = bem(module.id, 'SettingsPage');
const SettingsPage: FC = () => {
  return (
    <MainLayout header="Settings">
      <div className={root()}>
        <div className={root('body')}>
          <SettingsList />
        </div>
        <FooterTabs className={root('footer')} activeTab={FooterTab.settings} />
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
