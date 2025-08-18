import React from 'react';
import { render } from '@testing-library/react';
import { FontPreload } from '../../../../components/output-types/fontPreload/foodit';

jest.mock('fusion:environment', () => ({
    FONT_PRUMO: '/fonts/prumo.woff2',
    ROBOTO_REGULAR: '/fonts/roboto-regular.woff2'
}));

describe('FontPreload', () => {
    const deployment = path => `https://foodit.com.ar${path}`;
    const contextPath = '/pf';

    it('should render preload links correctly', () => {
        const { container } = render(
            <FontPreload deployment={deployment} contextPath={contextPath} />
        );
        const link = container.querySelector('link');
        expect(link).toHaveAttribute(
            'href',
            'https://foodit.com.ar/pf/fonts/roboto-regular.woff2'
        );

        expect(link).toHaveAttribute('rel', 'preload');
        expect(link).toHaveAttribute('as', 'font');
    });
    it('matches snapshot', () => {
        const { asFragment } = render(
            <FontPreload deployment={deployment} contextPath={contextPath} />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
