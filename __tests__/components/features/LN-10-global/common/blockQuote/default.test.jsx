import React from 'react';
import { render, screen } from '@testing-library/react';
import BlockQuote from '../../../../../../components/features/LN-10-global/common/body/blockQuote/default';

const testId = 'blockquote';

const baseData = {
    data: {
        content_elements: [{ content: 'Texto destacado' }],
        subtype: 'blockquote'
    },
    'data-testid': testId
};

const emptyData = {
    ...baseData,
    data: {
        content_elements: [],
        subtype: 'blockquote'
    }
};

const differentSubtypeData = {
    ...baseData,
    data: {
        subtype: 'otro'
    }
};

describe('BlockQuote', () => {
    it('renders correctly and matches snapshot', () => {
        render(<BlockQuote {...baseData} />);
        const blockquote = screen.getByTestId(testId);
        expect(blockquote).toBeInTheDocument();
        expect(blockquote).toMatchSnapshot();
    });

    it('does not render if subtype is not "blockquote"', () => {
        render(<BlockQuote {...differentSubtypeData} />);
        const blockquote = screen.queryByTestId(testId);
        expect(blockquote).not.toBeInTheDocument();
    });

    it('does not render if content_elements is empty', () => {
        render(<BlockQuote {...emptyData} />);
        const blockquote = screen.queryByTestId(testId);
        expect(blockquote).not.toBeInTheDocument();
    });

    it('renders content when provided and subtype is "blockquote"', () => {
        render(<BlockQuote {...baseData} />);
        const blockquote = screen.getByTestId(testId);
        expect(blockquote).toBeInTheDocument();
    });
});
