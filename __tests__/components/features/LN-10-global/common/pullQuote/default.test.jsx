import React from 'react';
import { render, screen } from '@testing-library/react';
import PullQuote from '../../../../../../components/features/LN-10-global/common/body/pullQuote/default';

const testId = 'pullquote';

const baseData = {
    data: {
        citation: { content: 'Autor Ejemplo' },
        content_elements: [{ content: 'Texto de la cita' }]
    },
    'data-testid': testId
};

const dataNoAuthor = {
    ...baseData,
    data: {
        ...baseData.data,
        citation: {}
    }
};

const dataNoContent = {
    ...baseData,
    data: {
        ...baseData.data,
        content_elements: [{}]
    }
};

describe('PullQuote', () => {
    it('renders correctly and matches snapshot', () => {
        render(<PullQuote {...baseData} />);
        const pullquote = screen.getByTestId(testId);
        expect(pullquote).toBeInTheDocument();
        expect(pullquote).toHaveClass('cita-autor');
        expect(screen.getByText('Texto de la cita')).toBeInTheDocument();
        expect(screen.getByText(/— Autor Ejemplo/)).toBeInTheDocument();
        expect(pullquote).toMatchSnapshot();
    });

    it('does not render if content is missing', () => {
        render(<PullQuote {...dataNoContent} />);
        const pullquote = screen.queryByTestId(testId);
        expect(pullquote).not.toBeInTheDocument();
    });

    it('renders author when provided', () => {
        render(<PullQuote {...baseData} />);
        expect(screen.getByText(/— Autor Ejemplo/)).toBeInTheDocument();
    });

    it('does not render author if not provided', () => {
        render(<PullQuote {...dataNoAuthor} />);
        const pullquote = screen.getByTestId(testId);
        expect(pullquote).toBeInTheDocument();
        // Author text should not be present
        expect(screen.queryByText(/—/)).not.toBeInTheDocument();
        // PullQuote should still render
        expect(screen.getByText('Texto de la cita')).toBeInTheDocument();
        expect(pullquote).toMatchSnapshot();
    });
});
