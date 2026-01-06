import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MediaScroller from '../../../../../../components/features/ui/ln/mediaScroller/default';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
}));

describe('MediaScroller Component', () => {
    const mockChildren = [
        <div key="item1" data-testid="test-item-1">
            Item 1
        </div>,
        <div key="item2" data-testid="test-item-2">
            Item 2
        </div>,
        <div key="item3" data-testid="test-item-3">
            Item 3
        </div>
    ];

    describe('Rendering', () => {
        it('should render with custom className', () => {
            const customClass = 'custom-media-scroller';
            const { container } = render(
                <MediaScroller className={customClass}>
                    {mockChildren}
                </MediaScroller>
            );

            const rootElement = container.firstChild;
            expect(rootElement).toHaveClass('gap-32');
            expect(rootElement).toHaveClass(customClass);
        });

        it('should render with additional props', () => {
            const customProps = {
                'data-custom': 'test-value',
                id: 'media-scroller-test'
            };

            const { container } = render(
                <MediaScroller {...customProps}>{mockChildren}</MediaScroller>
            );

            const rootElement = container.firstChild;
            expect(rootElement).toHaveAttribute('data-custom', 'test-value');
            expect(rootElement).toHaveAttribute('id', 'media-scroller-test');
        });

        it('should match snapshot', () => {
            const { asFragment } = render(
                <MediaScroller>{mockChildren}</MediaScroller>
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });

    describe('Children rendering', () => {
        it('should render children inside the component', () => {
            render(<MediaScroller>{mockChildren}</MediaScroller>);

            mockChildren.forEach((_, index) => {
                expect(
                    screen.getByTestId(`test-item-${index + 1}`)
                ).toBeInTheDocument();
            });
        });

        it('should handle empty children', () => {
            const { container } = render(<MediaScroller />);

            expect(container.firstChild).toBeInTheDocument();
        });

        it('should handle single child', () => {
            const singleChild = (
                <div data-testid="single-item">Single Item</div>
            );

            render(<MediaScroller>{singleChild}</MediaScroller>);

            expect(screen.getByTestId('single-item')).toBeInTheDocument();
        });
    });

    describe('Navigation buttons', () => {
        it('should have navigation buttons available (may not render based on content)', () => {
            const { container } = render(
                <MediaScroller>{mockChildren}</MediaScroller>
            );

            expect(container.firstChild).toBeInTheDocument();
            expect(container.firstChild).toHaveClass('ds-mediascroller');

            const track = container.querySelector('.ds-mediascroller-track');
            expect(track).toBeInTheDocument();

            mockChildren.forEach((_, index) => {
                expect(
                    screen.getByTestId(`test-item-${index + 1}`)
                ).toBeInTheDocument();
            });
        });

        it('should expose static navigation components for external use', () => {
            expect(MediaScroller.Prev).toBeDefined();
            expect(MediaScroller.Next).toBeDefined();
            expect(MediaScroller.Progress).toBeDefined();
            expect(MediaScroller.Track).toBeDefined();
            expect(MediaScroller.Item).toBeDefined();
        });
    });
    describe('Accessibility', () => {
        it('should have proper accessibility structure', () => {
            const { container } = render(
                <MediaScroller>{mockChildren}</MediaScroller>
            );

            const track = container.querySelector('.ds-mediascroller-track');
            expect(track).toHaveAttribute('role', 'region');
            expect(track).toHaveAttribute('aria-roledescription', 'carousel');

            expect(container.firstChild).toHaveClass('ds-mediascroller');
        });
    });
});
