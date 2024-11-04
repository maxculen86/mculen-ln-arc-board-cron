import React from 'react';
import { render } from '@testing-library/react';
import Microdata from '../../../../../components/private/common/scriptManager/microdata';

describe('Microdata Component', () => {
    test('renders a script tag with correct type and content', () => {
        const { container } = render(<Microdata />);

        const scriptTag = container.querySelector('script');
        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag).toHaveAttribute('type', 'application/ld+json');
        expect(scriptTag).toHaveAttribute('defer');

        expect(scriptTag.innerHTML).toContain('"@context": "https://schema.org"');
    });
});