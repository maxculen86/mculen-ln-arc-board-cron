import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MoreInfo } from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/moreInfo';

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

describe('components - features - foodit-global - body - powerUpRecetas - ingredientsBox - ExternalLinks', () => {
    it('should render correctly, texts and links', () => {
        const { getByText } = render(<MoreInfo />);
        const text1 = getByText('Guía de equivalencias');
        const text2 = getByText('Guía de sustitutos de ingredientes');
        expect(text1).toBeInTheDocument();
        expect(text1).toHaveAttribute(
            'href',
            'https://foodit.lanacion.com.ar/guia-de-cocina/guia-de-equivalencias-nid16042024/'
        );
        expect(text2).toBeInTheDocument();
        expect(text2).toHaveAttribute(
            'href',
            'https://foodit.lanacion.com.ar/guia-de-cocina/guia-de-sustituciones-nid16042024/'
        );
    });
});
