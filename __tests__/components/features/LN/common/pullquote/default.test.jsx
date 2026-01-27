import React from 'react';
import { render } from '@testing-library/react';
import PullQuote from '../../../../../../components/features/LN/common/pullquote/default';

// Mock del componente UI
const mockPullQuoteUI = jest.fn(() => null);
jest.mock(
    '../../../../../../components/features/ui/ln/pullQuote/default',
    () => ({
        __esModule: true,
        default: props => {
            mockPullQuoteUI(props);
            return (
                <div
                    data-testid="pullquote-ui"
                    data-props={JSON.stringify(props)}
                />
            );
        }
    })
);

describe('PullQuote Container', () => {
    beforeEach(() => {
        mockPullQuoteUI.mockClear();
    });

    describe('Data transformation', () => {
        it('passes null content when data is not provided', () => {
            render(<PullQuote />);

            expect(mockPullQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: undefined,
                    author: ''
                })
            );
        });

        it('passes null content when content_elements is empty', () => {
            render(<PullQuote data={{ content_elements: [] }} />);

            expect(mockPullQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: undefined,
                    author: ''
                })
            );
        });

        it('passes null content when first content element has no content', () => {
            render(<PullQuote data={{ content_elements: [{}] }} />);

            expect(mockPullQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: undefined,
                    author: ''
                })
            );
        });

        it('extracts content from first content_element', () => {
            render(
                <PullQuote
                    data={{
                        content_elements: [{ content: 'This is a pull quote' }]
                    }}
                />
            );

            expect(mockPullQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: 'This is a pull quote',
                    author: ''
                })
            );
        });

        it('extracts author from citation.content', () => {
            render(
                <PullQuote
                    data={{
                        citation: { content: 'Author Name' },
                        content_elements: [{ content: 'Quote text' }]
                    }}
                />
            );

            expect(mockPullQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: 'Quote text',
                    author: 'Author Name'
                })
            );
        });

        it('passes empty string as author when citation is empty object', () => {
            render(
                <PullQuote
                    data={{
                        citation: {},
                        content_elements: [{ content: 'Quote text' }]
                    }}
                />
            );

            expect(mockPullQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: 'Quote text',
                    author: ''
                })
            );
        });

        it('passes empty string as author when citation is not provided', () => {
            render(
                <PullQuote
                    data={{
                        content_elements: [{ content: 'Quote text' }]
                    }}
                />
            );

            expect(mockPullQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: 'Quote text',
                    author: ''
                })
            );
        });
    });

    describe('Props forwarding', () => {
        it('forwards className to UI component', () => {
            render(
                <PullQuote
                    data={{
                        content_elements: [{ content: 'Quote text' }]
                    }}
                    className="custom-class"
                />
            );

            expect(mockPullQuoteUI).toHaveBeenCalledWith(
                expect.objectContaining({
                    className: 'custom-class'
                })
            );
        });
    });

    describe('Static properties', () => {
        it('exposes static component properties', () => {
            expect(PullQuote.arcType).toBe('pullquote');
            expect(PullQuote.isStatic).toBe(true);
        });
    });
});
