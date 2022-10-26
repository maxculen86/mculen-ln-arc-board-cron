jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mUseRef = jest.fn();
    return {
        ...originReact,
        useRef: mUseRef
    };
});

import React, { useRef } from 'react';
import { render, mount, shallow } from 'enzyme';

import ComLinkList from '../../../../components/private/common/com-link-list';

describe('LN-Private-Common-ComLinkList ', () => {
    describe('passing an empty list by params', () => {
        const list = [];
        it('return null', () => {
            const wrapper1 = render(<ComLinkList />);
            const wrapper2 = render(<ComLinkList list={list} />);
            expect(wrapper1.html() && wrapper2.html()).toBeNull();
        });
    });

    describe('passing a filled list by params', () => {
        const list = [
            {
                classCondition: '',
                dataEvent: '',
                dataSection: '',
                link: 'http://www.google.com',
                size: '',
                style: '',
                target: '_blank',
                textname: 'LN Link Custom',
                title: 'LN Link Custom',
                withSponsoredLink: false,
                rel: undefined
            },
            {
                classCondition: '',
                dataEvent: '',
                dataSection: '',
                link: '/revista-ohlala',
                size: '',
                style: '',
                target: '',
                textname: 'OHLALA',
                title: 'OHLALA',
                withSponsoredLink: false,
                rel: undefined
            }
        ];

        const wrapper = shallow(<ComLinkList list={list} />);
        const element = wrapper.find('ul');
        const { children, className } = element.props();

        it('returns ul tag with class "com-unordered" and 2 children', () => {
            expect(element).toBeTruthy();
            expect(className).toBe('com-unordered ');
            expect(children.length).toBe(list.length);
        });

        it('returns children of type li with correct props', () => {
            children.forEach((element, index) => {
                const {
                    props: { children: { props: ComLinkProps } } = {}
                } = element;
                expect(element.type).toBe('li');
                expect(ComLinkProps).toStrictEqual(list[index]);
            });
        });

        describe('without extra class', () => {
            it('Snapshot', () => {
                expect(wrapper.render()).toMatchSnapshot();
            });
        });

        describe('with extra class', () => {
            const wrapper = shallow(
                <ComLinkList list={list} extraClass="--tags" />
            );
            const { className } = wrapper.props();
            it('return ul tag with extra class. Example: --tags', () => {
                expect(className).toBe('com-unordered --tags');
            });
            it('Snapshot', () => {
                expect(wrapper.render()).toMatchSnapshot();
            });
        });

        describe('with _ref', () => {
            it('return ul tag with reference', () => {
                const _ref = useRef();
                const wrapper = mount(<ComLinkList list={list} _ref={_ref} />);
                const { ref } = wrapper.props();
                expect(ref).toBe(_ref);
            });
        });
    });
});
