jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('fusion:context', () => ({
    useFusionContext: () => ({
        arcSite: 'la-nacion-ar'
    })
}));

jest.mock(
    '../../../../components/private/common/com-title',
    () => 'mock-com-title'
);

jest.mock(
    '../../../../components/private/common/com-link-list',
    () => 'mock-com-link-list'
);

import React from 'react';
import Static from 'fusion:static';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import NavigationListFeature from '../../../../components/features/LN-common/navigationList';
import ComTitle from '../../../../components/private/common/com-title';
import ComLinkList from '../../../../components/private/common/com-link-list';
import NAVIGATION_RESPONSE from '../../../../__mocks__/data/navigation/Economy';
import { shallow, mount, render } from 'enzyme';

describe('Features - LN-Common - NavigationList =>', () => {
    describe('with empty navigation list ', () => {
        it('should return null', () => {
            useContent.mockImplementation(() => ({
                children: []
            }));
            const wrapper1 = shallow(<NavigationListFeature />);

            useContent.mockImplementation(() => ({
                children: undefined
            }));
            const wrapper2 = shallow(<NavigationListFeature />);

            expect(wrapper1.html() && wrapper2.html()).toBeNull();
        });
    });

    describe('with navigation list', () => {
        useContent.mockImplementation(() => ({
            children: NAVIGATION_RESPONSE.children
        }));

        const customFields = {
            title: 'Titulo:',
            separator: '--tags',
            hierarchy: 'Economy'
        };

        const wrapper = shallow(
            <NavigationListFeature
                _id="XUHADKLMDASIDJIHBA"
                customFields={{ ...customFields }}
            />
        );

        const result = wrapper.first();
        const sectionTag = result.find('section');
        const titleComponent = result.find('mock-com-title');
        const listComponent = result.find('mock-com-link-list');

        it('should render section tag, com-title and com-link-list components', () => {
            expect(sectionTag.exists()).toBeTruthy();
            expect(titleComponent.exists()).toBeTruthy();
            expect(listComponent.exists()).toBeTruthy();
        });

        it('section tag should have a "mod-linklist" className', () => {
            const { className } = sectionTag.props();
            expect(className).toBe('mod-linklist');
        });

        it('com-title should receive content and size by props ', () => {
            const { content, size } = titleComponent.props();
            expect(content).toBe(customFields.title);
            expect(size).toBe('--twoxs');
        });

        it('com-link-list should receive list and extraClass by props', () => {
            const { list, extraClass } = listComponent.props();
            expect(list.length).toBe(NAVIGATION_RESPONSE.children.length);
            expect(extraClass).toBe(customFields.separator);
        });

        it('Validate props from ComLinkList component when navigation list has items with nodeType === link', () => {
            // take values from attributes url and display_name;
            const { list } = listComponent.props();
            const listItem = list.find(elem => elem.target === '_blank');
            const {
                display_name: displayName,
                url
            } = NAVIGATION_RESPONSE.children.find(
                elem => elem.node_type === 'link'
            );

            expect(listItem.link).toBe(url);
            expect(listItem.textname).toBe(displayName);
            expect(listItem.title).toBe(displayName);
        });

        it('Validate props from ComLinkList component when navigation list has items with nodeType === section', () => {
            // take values from attributes _id and name
            const { list } = listComponent.props();
            const listItem = list.find(elem => elem.target === '');
            const { name, _id } = NAVIGATION_RESPONSE.children.find(
                elem => elem.node_type === 'section'
            );

            expect(listItem.link).toBe(_id);
            expect(listItem.textname).toBe(name);
            expect(listItem.title).toBe(name);
        });
    });
});
