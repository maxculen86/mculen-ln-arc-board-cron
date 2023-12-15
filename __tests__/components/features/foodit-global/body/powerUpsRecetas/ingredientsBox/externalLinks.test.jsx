import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExternalLinks from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/externalLinks';

describe('components - features - foodit-global - body - powerUpRecetas - ingredientsBox - ExternalLinks', () => {
    const mockExternalLinks = {
        items: [
            {
                text: 'Guia de equivalencias',
                url: '/guia-equivalencias'
            },
            {
                text: 'Sustituto de ingredientes',
                url: '/sustituto-ingredientes'
            }
        ]
    };
    it('should render correctly, texts and links', () => {
        const { getByText } = render(<ExternalLinks {...mockExternalLinks} />);
        const text1 = getByText('Guia de equivalencias');
        const text2 = getByText('Sustituto de ingredientes');
        expect(text1).toBeInTheDocument();
        expect(text1).toHaveAttribute('href', '/guia-equivalencias');
        expect(text2).toBeInTheDocument();
        expect(text2).toHaveAttribute('href', '/sustituto-ingredientes');
    });
});
