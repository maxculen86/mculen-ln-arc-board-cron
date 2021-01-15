jest.mock(
    '../../../../components/private/common/navigationList',
    () => 'mock-component'
);

import React from 'react';
import NavigationListFeature from '../../../../components/features/LN-common/navigationList';
import NavigationList from '../../../../components/private/common/navigationList';
import { shallow } from 'enzyme';

describe('LN-Common-NavigationList =>', () => {
    const customFields = {
        title: 'Titulo:',
        separator: '--',
        hierarchy: 'Economy'
    };

    it('Without required custom fields return null', () => {
        const wrapper1 = shallow(<NavigationListFeature />);
        const wrapper2 = shallow(
            <NavigationListFeature
                customFields={{ ...customFields, hierarchy: undefined }}
            />
        );
        expect(wrapper1.html() && wrapper2.html()).toBeNull();
    });

    it('With idNavigation return component', () => {
        const wrapper = shallow(
            <NavigationListFeature customFields={{ ...customFields }} />
        );
        expect(wrapper.is('mock-component')).toBe(true);
    });
});
