jest.mock(
    '../../../../components/private/common/hocs/withStatic.jsx',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

jest.mock(
    '../../../../components/private/common/hocs/withNavigation.jsx',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

import React from 'react';
import NavigationList from '../../../../components/private/common/navigationList';
import LinkList from '../../../../components/private/common/com-link-list';
import withNavigation from '../../../../components/private/common/hocs/withNavigation';
import withStatic from '../../../../components/private/common/hocs/withStatic';
import { shallow, mount } from 'enzyme';

describe('LN-Common-NavigationList =>', () => {
    describe('with an empty list', () => {
        it('return null', () => {
            const wrapper = shallow(<NavigationList navigations={[]} />);
            expect(wrapper.html()).toBe('');
        });
    });
    describe('with a list', () => {
        const props = {
            title: 'Lista de prueba',
            extraClass: '--tags',
            navigations: [
                {
                    display_name: 'LN Link Custom',
                    url: 'http://www.google.com',
                    node_type: 'link'
                },
                {
                    name: 'OHLALA',
                    _id: '/revista-ohlala',
                    node_type: 'section'
                }
            ]
        };
        const wrapper = mount(<NavigationList {...props} />);
        const returnedComponent = wrapper.find('ComLinkList').at(0);
        const { extraClass, title, list } = returnedComponent.props();

        it('return LinkList component ', () => {
            expect(returnedComponent.exists()).toBeTruthy();
        });

        it('Validate props from LinkList component when navigationList has items with nodeType === link', () => {
            // take values from attributes url and display_name
            expect(extraClass).toBe(props.extraClass);
            expect(title).toBe(props.title);
            expect(list[0].link).toBe(props.navigations[0].url);
            expect(list[0].textname).toBe(props.navigations[0].display_name);
            expect(list[0].title).toBe(props.navigations[0].display_name);
            expect(list[0].target).toBe('_blank');
        });

        it('Validate props from LinkList component when navigationList has items with nodeType === section', () => {
            // take values from attributes _id and name
            expect(extraClass).toBe(props.extraClass);
            expect(title).toBe(props.title);
            expect(list[1].link).toBe(props.navigations[1]._id);
            expect(list[1].textname).toBe(props.navigations[1].name);
            expect(list[1].title).toBe(props.navigations[1].name);
            expect(list[1].target).toBe('');
        });

        it('snapshot', () => {
            expect(wrapper.render()).toMatchSnapshot();
        });
    });
});
