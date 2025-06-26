import React from 'react';
import { render } from '@testing-library/react';
import { FontPreload } from '../../../../components/output-types/fontPreload/foodit';

jest.mock('fusion:environment', () => ({
    FONT_PRUMO: '/fonts/prumo.woff2',
    ROBOTO_LIGHT: '/fonts/roboto-light.woff2',
    ROBOTO_REGULAR: '/fonts/roboto-regular.woff2',
    ROBOTO_BOLD: '/fonts/roboto-bold.woff2'
}));

describe('FontPreload', () => {
    const deployment = path => `https://foodit.com.ar${path}`;
    const contextPath = '/pf';

    it('should render preload links correctly', () => {
        const { container } = render(
            <FontPreload deployment={deployment} contextPath={contextPath} />
        );
        const links = container.querySelectorAll('link');
        expect(links).toHaveLength(4);

        expect(links[0]).toHaveAttribute(
            'href',
            'https://foodit.com.ar/pf/fonts/prumo.woff2'
        );
        expect(links[1]).toHaveAttribute(
            'href',
            'https://foodit.com.ar/pf/fonts/roboto-light.woff2'
        );
        expect(links[2]).toHaveAttribute(
            'href',
            'https://foodit.com.ar/pf/fonts/roboto-regular.woff2'
        );
        expect(links[3]).toHaveAttribute(
            'href',
            'https://foodit.com.ar/pf/fonts/roboto-bold.woff2'
        );

        links.forEach(link => {
            expect(link).toHaveAttribute('rel', 'preload');
            expect(link).toHaveAttribute('as', 'font');
        });
    });
    it('matches snapshot', () => {
        const { asFragment } = render(
            <FontPreload deployment={deployment} contextPath={contextPath} />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
