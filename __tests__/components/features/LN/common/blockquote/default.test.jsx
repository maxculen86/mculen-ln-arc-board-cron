import React from 'react';
import { render } from '@testing-library/react';
import BlockQuote from '../../../../../../components/features/LN/common/blockquote/default';

// Mock del componente UI
const mockBlockQuoteUI = jest.fn(() => null);
jest.mock(
    '../../../../../../components/features/ui/ln/blockQuote/default',
    () => ({
        __esModule: true,
        default: props => {
            mockBlockQuoteUI(props);
            return (
                <div
                    data-testid="blockquote-ui"
                    data-props={JSON.stringify(props)}
                />
            );
        }
    })
);

describe('BlockQuote', () => {
    beforeEach(() => {
        mockBlockQuoteUI.mockClear();
    });

    describe('Conditional rendering', () => {
        it('returns null if data is not provided', () => {
            const { container } = render(<BlockQuote />);
            expect(container.firstChild).toBeNull();
        });

        it('returns null if subtype is not blockquote', () => {
            const { container } = render(
                <BlockQuote data={{ subtype: 'text' }} />
            );
            expect(container.firstChild).toBeNull();
        });

        it('returns null if subtype is undefined', () => {
            const { container } = render(
                <BlockQuote
                    data={{ content_elements: [{ content: 'text' }] }}
                />
            );
            expect(container.firstChild).toBeNull();
        });
    });

    describe('Data transformation', () => {
        it('passes null content when content_elements is empty', () => {
            render(
                <BlockQuote
                    data={{ subtype: 'blockquote', content_elements: [] }}
                />
            );

            expect(mockBlockQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: undefined
                })
            );
        });

        it('passes null content when first content element has no content', () => {
            render(
                <BlockQuote
                    data={{
                        subtype: 'blockquote',
                        content_elements: [{}]
                    }}
                />
            );

            expect(mockBlockQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: undefined
                })
            );
        });

        it('extracts content from first content_element when valid', () => {
            render(
                <BlockQuote
                    data={{
                        subtype: 'blockquote',
                        content_elements: [{ content: 'Esto es una cita' }]
                    }}
                />
            );

            expect(mockBlockQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: 'Esto es una cita'
                })
            );
        });

        it('only uses first content_element when multiple are provided', () => {
            render(
                <BlockQuote
                    data={{
                        subtype: 'blockquote',
                        content_elements: [
                            { content: 'First quote' },
                            { content: 'Second quote' }
                        ]
                    }}
                />
            );

            expect(mockBlockQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: 'First quote'
                })
            );
        });
    });

    describe('Static properties', () => {
        it('exposes static component properties', () => {
            expect(BlockQuote.arcType).toBe('blockquote');
            expect(BlockQuote.isStatic).toBe(true);
        });
    });
});
