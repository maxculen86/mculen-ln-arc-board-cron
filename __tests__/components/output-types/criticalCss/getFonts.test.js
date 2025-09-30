import React from 'react';
import { render } from '@testing-library/react';
import { GetFonts } from '../../../../components/output-types/criticalCss/getFonts';

jest.mock('fusion:environment', () => {
    return {
        FONT_PRUMO: '/resources/fonts/prumo/Prumo-LNVF.woff2',
        FONT_PRUMO_ITALIC: '/resources/fonts/prumo/Prumo-ItalicLNVF.woff2',
        ROBOTO_LIGHT: '/resources/fonts/roboto/Roboto-Light.woff2',
        ROBOTO_REGULAR: '/resources/fonts/roboto/Roboto-Regular.woff2',
        ROBOTO_BOLD: '/resources/fonts/roboto/Roboto-Bold.woff2'
    };
});

describe('Components - outputType - criticalCss - GetFonts', () => {
    const deployment = arg => arg;
    const mockProps = {
        contextPath: '/pf',
        deployment
    };
    it('should return a defensive fragment when arcSite is undefined"', () => {
        const { container } = render(<GetFonts {...mockProps} />);
        expect(container).toBeEmptyDOMElement();
    });
    it('should match snapshot for arcSite = "foodit"', () => {
        mockProps.arcSite = 'foodit';
        const { container } = render(<GetFonts {...mockProps} />);
        expect(container).toMatchSnapshot();
    });

    it('should match snapshot for arcSite = "la-nacion-ar"', () => {
        mockProps.arcSite = 'la-nacion-ar';
        const { container } = render(<GetFonts {...mockProps} />);
        expect(container).toMatchSnapshot();
    });
});
