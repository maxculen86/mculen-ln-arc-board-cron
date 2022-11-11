import React from 'react';
import { render, screen } from '@testing-library/react';
import ComLink from '../../../../components/private/common/com-link';

describe('Components - private - - common -ComLink', () => {
    const props = {
        children: 'Ir al sitio',
        dataEvent: 'click',
        dataSection: 'Link click',
        link: 'https://www.lanacion.com.ar/',
        textname: 'Ir a link',
        target: '_blank',
        title: 'link',
        classCondition: undefined,
        size: '',
        rel: '',
        style: '',
        withSponsoredLink: false
    };

    describe(' Tests when the link property exists', () => {
        render(<ComLink {...props} />);
        const link = screen.getByRole('link');
        test('Should return an anchor when a link exists', () => {
            expect(link).toBeTruthy();
        });

        test('Should have the com-link class', () => {
            expect(link.getElementsByClassName('com-link')).toBeTruthy();
        });

        test('It should have the target attribute in _blank', () => {
            expect(link.getAttribute('target')).toStrictEqual('_blank');
        });

        test('should have a title', () => {
            expect(link.getAttribute('title')).toStrictEqual('link');
        });

        test('It should not have the rel attribute when the link is from LN', () => {
            expect(link.getAttribute('rel')).toBeNull();
        });

        test('It should have the rel attribute set to nofollow when it is an external link and not sponsored.', () => {
            const properties = {
                ...props,
                link: 'https://dolarhoy.com/'
            };
            render(<ComLink {...properties} />);
            expect(screen.getByRole('link').getAttribute('rel')).toStrictEqual(
                'nofollow'
            );
        });

        test('It should not have the rel attribute when the external link is sponsored.', () => {
            const properties = {
                ...props,
                link: 'https://dolarhoy.com/',
                withSponsoredLink: true
            };
            render(<ComLink {...properties} />);
            expect(screen.getByRole('link').getAttribute('rel')).toBeNull();
        });
    });

    describe('Tests when the link is not defiend', () => {
        const properties = {
            ...props,
            link: undefined
        };
        const { container } = render(<ComLink {...properties} />);
        const element = container.querySelector('span');

        test('It should return a span tag', () => {
            expect(element).toBeDefined();
        });

        test('Should have the com-text class', () => {
            expect(element.getElementsByClassName('com-text')).toBeTruthy();
        });
    });
});
