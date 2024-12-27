import React from 'react';
import { render, screen, within } from '@testing-library/react';

import ComLinkList from '../../../../components/private/common/com-link-list';

describe('LN-Private-Common-ComLinkList ', () => {
    const list = [];
    test('return null', () => {
        const wrapper1 = render(<ComLinkList />);
        const wrapper2 = render(<ComLinkList list={list} />);

        expect(wrapper1.container).toBeEmptyDOMElement();
        expect(wrapper2.container).toBeEmptyDOMElement();
    });

    describe('passing a filled list by params', () => {
        const list = [
            {
                classCondition: '',
                dataEvent: 'LinkClick',
                dataSection: 'section-1',
                link: 'http://www.google.com',
                size: '',
                style: '',
                target: '_blank',
                textname: 'LN Link Custom',
                title: 'LN Link Custom',
                withSponsoredLink: false,
                rel: 'noopener'
            },
            {
                classCondition: '',
                dataEvent: 'LinkClick',
                dataSection: 'section-2',
                link: '/revista-ohlala',
                size: '',
                style: '',
                target: '_self',
                textname: 'OHLALA',
                title: 'LN Link Custom',
                withSponsoredLink: false,
                rel: 'noopener'
            }
        ];

        test('returns ul tag with class "com-unordered" and 2 children', () => {
            render(<ComLinkList list={list} />);

            const ulElement = screen.getByRole('list');

            expect(ulElement).toHaveClass('com-unordered --no-scrollbar');

            const listItems = ulElement.children;
            expect(listItems.length).toBe(list.length);
            expect(listItems.length).toBe(2);
        });

        test('returns children of type li with correct props', () => {
            render(<ComLinkList list={list} />);

            const ulElement = screen.getByRole('list');
            const liElements = within(ulElement).getAllByRole('listitem');

            liElements.forEach((liElement, index) => {
                const ComLinkComponent = within(liElement).getByRole('link');
                const ComLinkProps = {
                    link: new URL(ComLinkComponent.href).pathname,
                    target: ComLinkComponent.target,
                    title: ComLinkComponent.title,
                    textname: ComLinkComponent.textContent,
                    classCondition: ComLinkComponent.className,
                    dataEvent: ComLinkComponent.getAttribute('data-event'),
                    dataSection: ComLinkComponent.getAttribute('data-section'),
                    rel: ComLinkComponent.rel,
                    size: ComLinkComponent.getAttribute('size'),
                    style: ComLinkComponent.getAttribute('style'),
                    withSponsoredLink:
                        ComLinkComponent.hasAttribute('data-sponsored')
                };

                const expectedProps = list[index];

                expect(ComLinkProps.link).toBe(
                    new URL(expectedProps.link, 'http://localhost').pathname
                );
                expect(ComLinkProps.target).toBe(expectedProps.target || '');
                expect(ComLinkProps.title).toBe(expectedProps.title || '');
                expect(ComLinkProps.textname).toBe(
                    expectedProps.textname || ''
                );
                expect(ComLinkProps.classCondition).toBe(
                    expectedProps.classCondition || 'com-link'
                );
                expect(ComLinkProps.dataEvent).toBe(
                    expectedProps.dataEvent || ''
                );
                expect(ComLinkProps.dataSection).toBe(
                    expectedProps.dataSection || null
                );
                expect(ComLinkProps.rel).toBe(expectedProps.rel || 'nofollow');
                expect(ComLinkProps.size).toBe(expectedProps.size || null);
                expect(ComLinkProps.style).toBe(expectedProps.style || null);
                expect(ComLinkProps.withSponsoredLink).toBe(
                    expectedProps.withSponsoredLink
                );
            });
        });

        test('return ul tag with extra class. Example: --tags', () => {
            render(<ComLinkList list={list} extraClass="--tags" />);
            const ulElement = screen.getByRole('list');

            expect(ulElement).toHaveClass(
                'com-unordered',
                '--no-scrollbar',
                '--tags'
            );
        });
    });
});
