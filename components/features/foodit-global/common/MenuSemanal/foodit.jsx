import React from 'react';
import { CommonTabs as Tabs } from '@ln/common-ui-tabs';
import { Horizontalscroller } from '@ln/common-ui-horizontalscroller';
import { Text } from '@ln/common-ui-text';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import { EmptyStateComponent } from './emptyStateComponent';
import { useGetWeeklyMenu } from './hooks/useGetWeeklyMenu';
import TabPanel from './components/TabPanel';
import {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
} from './helpers/daysIds';
import { daysOfWeek } from './helpers/_helper';

export function WeeklyMenu() {
    const { userType, isSubscribed: subscription } = useGetUserConfig();
    const { weeklyMenu, setWeeklyMenu } = useGetWeeklyMenu(subscription);
    const daysNames = [
        SUNDAY,
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY
    ];

    const day = new Date().getDay();

    return (
        <div>
            {subscription ? (
                <div>
                    <Tabs
                        selectedColor="var(--secondary-positive)"
                        defaultValue={daysNames[day]}
                    >
                        <Tabs.ItemContainer className="gap-16">
                            <Horizontalscroller
                                classnames={{
                                    button: 'bg-light-1'
                                }}
                            >
                                {daysOfWeek?.map(({ id, title, callback }) => (
                                    <Tabs.Item
                                        className="flex ai-center text-wrap cursor-pointer"
                                        id={id}
                                        key={id}
                                        color="secondary-positive"
                                        onClick={callback}
                                    >
                                        <Text
                                            as="h2"
                                            className="roboto roboto-bold text-secondary-positive__hover"
                                            text={title}
                                        />
                                    </Tabs.Item>
                                ))}
                            </Horizontalscroller>
                        </Tabs.ItemContainer>
                        <TabPanel
                            weeklyMenu={weeklyMenu}
                            setWeeklyMenu={setWeeklyMenu}
                            subscription={subscription}
                        />
                    </Tabs>
                </div>
            ) : (
                <EmptyStateComponent userType={userType} />
            )}
        </div>
    );
}
