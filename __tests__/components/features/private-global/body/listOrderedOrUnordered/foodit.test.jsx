import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ListOrderedOrUnordered from '../../../../../../components/features/private-global/body/listOrderedOrUnordered/foodit';

describe('BodyComponents - Foodit - Image', () => {
    it('handles empty data correctly', () => {
        const data = { items: [] };
        render(<ListOrderedOrUnordered data={data} />);
    });

    it('renders list items correctly', () => {
        const data = {
            items: [
                { _id: '1', type: 'text', content: 'Item 1' },
                { _id: '2', type: 'text', content: 'Item 2' }
            ],
            list_type: 'unordered'
        };
        render(<ListOrderedOrUnordered data={data} />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('applies setExternalLinks function correctly', () => {
        const data = {
            items: [
                {
                    _id: '1',
                    type: 'text',
                    content: '<a href="http://example.com">Example</a>'
                }
            ],
            list_type: 'unordered'
        };
        render(<ListOrderedOrUnordered data={data} />);
        const link = screen.getByText('Example');
        expect(link).toHaveAttribute('href', 'http://example.com');
    });
});
