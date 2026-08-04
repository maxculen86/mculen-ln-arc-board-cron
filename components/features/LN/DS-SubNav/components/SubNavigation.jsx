import React from 'react';
import SubNavScrollArea from './SubNavScrollArea';
import SubNavCollapsible from './SubNavCollapsible';

function SubNavigation({
    navigation = [],
    navigationType = 'scroll',
    brand = 'none'
}) {
    if (!navigation?.length || navigationType === 'none') return null;

    if (navigationType === 'collapsible') {
        return <SubNavCollapsible navigation={navigation} brand={brand} />;
    }

    return <SubNavScrollArea navigation={navigation} brand={brand} />;
}

export default SubNavigation;
