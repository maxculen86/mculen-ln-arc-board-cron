import React from 'react';
import { CommonTabs as Tabs } from '@ln/common-ui-tabs';
import MenuSemanalBody from './MenuSemanalBody';
import { daysOfWeek } from '../helpers/_helper';

function TabPanel({ weeklyMenu = [], setWeeklyMenu, subscription }) {
    return daysOfWeek?.map(({ id }) => (
        <Tabs.Panel className="w-100 pt-24" id={id} key={id}>
            <MenuSemanalBody
                subscription={subscription}
                setWeeklyMenu={setWeeklyMenu}
                weeklyMenu={weeklyMenu}
                menusDay={weeklyMenu.filter(menu => menu.bookmarkGroup === id)}
            />
        </Tabs.Panel>
    ));
}

export default TabPanel;
