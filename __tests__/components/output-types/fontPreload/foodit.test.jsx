import React from 'react';
import { render } from '@testing-library/react';
import { FontPreload } from '../../../../components/output-types/fontPreload/foodit';

jest.mock('fusion:environment', () => ({
    ROBOTO_REGULAR: '/fonts/roboto_regular.woff2',
    FONT_PRUMO: '/fonts/font_prumo.woff2'
}));

describe('FontPreload', () => {
    const deployment = path => `https://foodit.com.ar${path}`;
    const contextPath = '/pf';

    it('should render preload links correctly', () => {
        render(
            <FontPreload deployment={deployment} contextPath={contextPath} />
        );

        const links = document.head.querySelectorAll(
            'link[rel="preload"][as="font"]'
        );
        expect(links).toBeDefined();
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute(
            'href',
            'https://foodit.com.ar/pf/fonts/roboto_regular.woff2'
        );

        expect(links[0]).toHaveAttribute('rel', 'preload');
        expect(links[0]).toHaveAttribute('as', 'font');
        expect(links[0]).toHaveAttribute('type', 'font/woff2');
        expect(links[0]).toHaveAttribute('crossOrigin', 'anonymous');
        expect(links[1]).toHaveAttribute(
            'href',
            'https://foodit.com.ar/pf/fonts/font_prumo.woff2'
        );

        expect(links[1]).toHaveAttribute('rel', 'preload');
        expect(links[1]).toHaveAttribute('as', 'font');
        expect(links[1]).toHaveAttribute('type', 'font/woff2');
        expect(links[1]).toHaveAttribute('crossOrigin', 'anonymous');
    });
    it('matches snapshot', () => {
        render(
            <FontPreload deployment={deployment} contextPath={contextPath} />
        );
        const links = document.head.querySelectorAll(
            'link[rel="preload"][as="font"]'
        );
        expect(links[0].outerHTML).toMatchSnapshot();
        expect(links[1].outerHTML).toMatchSnapshot();
    });
});
