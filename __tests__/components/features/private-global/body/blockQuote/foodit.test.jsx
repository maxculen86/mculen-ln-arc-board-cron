import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BlockQuote from '../../../../../../components/private/LN/nota/cuerpo/blockQuote';

describe('BodyComponents - Foodit - BlockQuote', () => {
    it('renders correctly with valid data', () => {
        const data = {
            content_elements: [{ content: 'Test Quote' }],
            subtype: 'blockquote'
        };
        render(<BlockQuote data={data} />);
        expect(screen.getByText('Test Quote')).toBeInTheDocument();
    });

    it('does not render when contentElements is empty', () => {
        const data = { content_elements: [], subtype: 'blockquote' };
        render(<BlockQuote data={data} />);
        expect(screen.queryByRole('blockquote')).toBeNull();
    });

    it('does not render when subtype is not blockquote', () => {
        const data = {
            content_elements: [{ content: 'Test Quote' }],
            subtype: 'not-blockquote'
        };

        render(<BlockQuote data={data} />);
        expect(screen.queryByRole('blockquote')).toBeNull();
    });
});
