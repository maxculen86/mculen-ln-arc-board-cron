import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TooltipPromotions from '../../../../../../../../../components/features/LN/common/header/components/mainHeader/rightOptions/TooltipPromotions';
import { useHeaderContext } from '../../../../../../../../../components/features/LN/common/header/context';

jest.mock(
    '../../../../../../../../../components/features/LN/common/header/context',
    () => ({
        useHeaderContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../../../../components/features/ui/ln/tooltip/default',
    () => {
        function MockTooltip({ children, placement, open, ...props }) {
            return (
                <div
                    data-testid="tooltip"
                    data-placement={placement}
                    data-open={String(open)}
                    data-strategy={props.strategy}
                    data-close-on-click-outside={String(
                        props.closeOnClickOutside
                    )}
                >
                    {children}
                </div>
            );
        }
        MockTooltip.Trigger = function MockTrigger({ children }) {
            return <div data-testid="trigger">{children}</div>;
        };
        MockTooltip.Content = function MockContent({ children, color }) {
            return (
                <div data-testid="content" data-color={color}>
                    {children}
                </div>
            );
        };
        return { __esModule: true, default: MockTooltip };
    }
);

describe('TooltipPromotions', () => {
    const renderTooltip = props =>
        render(
            <TooltipPromotions content="promo <b>$990</b>" {...props}>
                <a href="/x">trigger</a>
            </TooltipPromotions>
        );

    beforeEach(() => {
        jest.clearAllMocks();
        useHeaderContext.mockReturnValue({
            isSentinelInView: true,
            isHome: true
        });
    });

    describe('when there is no content', () => {
        it('should render only the children without the tooltip wrapper', () => {
            render(
                <TooltipPromotions content="">
                    <a href="/x">trigger</a>
                </TooltipPromotions>
            );

            expect(screen.getByText('trigger')).toBeInTheDocument();
            expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
        });
    });

    describe('when it is not the home page', () => {
        it('should render only the children without the tooltip wrapper', () => {
            useHeaderContext.mockReturnValue({
                isSentinelInView: true,
                isHome: false
            });

            renderTooltip();

            expect(screen.getByText('trigger')).toBeInTheDocument();
            expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
        });
    });

    describe('when there is content', () => {
        it('should place the tooltip below and centered (placement "bottom")', () => {
            renderTooltip();

            expect(screen.getByTestId('tooltip')).toHaveAttribute(
                'data-placement',
                'bottom'
            );
        });

        it('should render the content with the "black" color variant', () => {
            renderTooltip();

            expect(screen.getByTestId('content')).toHaveAttribute(
                'data-color',
                'black'
            );
        });

        it('should render the trigger children', () => {
            renderTooltip();

            expect(screen.getByText('trigger')).toBeInTheDocument();
        });

        it('should keep the tooltip open when defaultOpen is true', () => {
            renderTooltip({ defaultOpen: true });

            expect(screen.getByTestId('tooltip')).toHaveAttribute(
                'data-open',
                'true'
            );
        });

        it('should keep the tooltip closed when defaultOpen is false', () => {
            renderTooltip({ defaultOpen: false });

            expect(screen.getByTestId('tooltip')).toHaveAttribute(
                'data-open',
                'false'
            );
        });

        it('should not close on outside click', () => {
            renderTooltip({ defaultOpen: true });

            expect(screen.getByTestId('tooltip')).toHaveAttribute(
                'data-close-on-click-outside',
                'false'
            );
        });

        it('should use the fixed positioning strategy so it stays glued to a fixed header on scroll', () => {
            renderTooltip();

            expect(screen.getByTestId('tooltip')).toHaveAttribute(
                'data-strategy',
                'fixed'
            );
        });
    });

    describe('when the sentinel leaves the viewport (header changes color)', () => {
        it('should close the tooltip even if it was open by default', () => {
            useHeaderContext.mockReturnValue({
                isSentinelInView: false,
                isHome: true
            });

            renderTooltip({ defaultOpen: true });

            expect(screen.getByTestId('tooltip')).toHaveAttribute(
                'data-open',
                'false'
            );
        });

        it('should stay open on mount while the sentinel is still in view', () => {
            useHeaderContext.mockReturnValue({
                isSentinelInView: true,
                isHome: true
            });

            renderTooltip({ defaultOpen: true });

            expect(screen.getByTestId('tooltip')).toHaveAttribute(
                'data-open',
                'true'
            );
        });
    });

    describe('snapshots', () => {
        it('should match snapshot when open with content', () => {
            const { asFragment } = renderTooltip({ defaultOpen: true });

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
