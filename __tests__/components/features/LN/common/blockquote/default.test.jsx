import React from 'react';
import { render, screen } from '@testing-library/react';
import BlockQuote from '../../../../../../components/features/LN/common/blockquote/default';

jest.mock(
    '../../../../../../components/features/LN/common/text/default',
    () => ({
        __esModule: true,
        default: ({ data }) => <span data-testid="text">{data.content}</span>
    })
);

describe('BlockQuote', () => {
    it('returns null if subtype is not blockquote', () => {
        const { container } = render(<BlockQuote data={{ subtype: 'text' }} />);

        expect(container.firstChild).toBeNull();
    });

    it('returns null if content_elements is empty', () => {
        const { container } = render(
            <BlockQuote
                data={{ subtype: 'blockquote', content_elements: [] }}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('returns null if first content element has no content', () => {
        const { container } = render(
            <BlockQuote
                data={{
                    subtype: 'blockquote',
                    content_elements: [{}]
                }}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('renders blockquote with text and separators when valid', () => {
        render(
            <BlockQuote
                data={{
                    subtype: 'blockquote',
                    content_elements: [{ content: 'Esto es una cita' }]
                }}
            />
        );

        const separators = screen.getAllByRole('separator');
        expect(separators).toHaveLength(2);
        expect(screen.getByText('Esto es una cita')).toBeInTheDocument();
        expect(screen.getByTestId('text')).toHaveTextContent(
            'Esto es una cita'
        );
    });
});
