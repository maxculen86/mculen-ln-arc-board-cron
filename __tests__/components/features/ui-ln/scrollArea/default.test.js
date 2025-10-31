import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollArea from '../../../../../components/features/ui-ln/scrollArea/default';

jest.mock('@ln/ds-common-scrollarea', () => ({
    Scrollarea: Object.assign(
        jest.fn(({ direction, hideScrollbar, children, ...props }) => (
            <div
                data-testid="scrollarea-root"
                data-direction={direction}
                data-hide-scrollbar={hideScrollbar}
                {...props}
            >
                {children}
            </div>
        )),
        {
            Content: jest.fn(({ children, className, ...props }) => (
                <div
                    data-testid="scrollarea-content"
                    className={className}
                    {...props}
                >
                    {children}
                </div>
            )),
            Arrow: jest.fn(({ direction, className, children, ...props }) => (
                <button
                    data-testid={`scrollarea-arrow-${direction}`}
                    className={className}
                    {...props}
                >
                    {children}
                </button>
            )),
            Gradient: jest.fn(({ gradientColor, ...props }) => (
                <div
                    data-testid="scrollarea-gradient"
                    data-gradient-color={gradientColor}
                    {...props}
                />
            ))
        }
    )
}));

jest.mock('../../../../../components/features/ui-ln/icon/default', () => ({
    __esModule: true,
    default: jest.fn(({ name, size, ...props }) => (
        <svg
            data-testid={`icon-${name}`}
            width={size}
            height={size}
            {...props}
        />
    ))
}));

describe('components - features - ui-ln - scrollArea - default', () => {
    const defaultProps = {
        children: <div>Test Content</div>
    };

    it('renders correctly with default props', () => {
        render(<ScrollArea {...defaultProps} />);

        const scrollArea = screen.getByTestId('scrollarea-root');
        expect(scrollArea).toBeInTheDocument();
        expect(scrollArea).toHaveAttribute('data-direction', 'horizontal');
        expect(scrollArea).toHaveAttribute('data-hide-scrollbar', 'true');

        const content = screen.getByTestId('scrollarea-content');
        expect(content).toBeInTheDocument();
        expect(content).toHaveClass('gap-24');
        expect(content).toHaveTextContent('Test Content');
    });

    it('passes position prop as direction to Scrollarea', () => {
        render(
            <ScrollArea position="vertical">{defaultProps.children}</ScrollArea>
        );

        const scrollArea = screen.getByTestId('scrollarea-root');
        expect(scrollArea).toHaveAttribute('data-direction', 'vertical');
    });

    it('renders arrow navigation with correct icons', () => {
        render(<ScrollArea {...defaultProps} />);

        const startArrow = screen.getByTestId('scrollarea-arrow-start');
        const endArrow = screen.getByTestId('scrollarea-arrow-end');

        expect(startArrow).toBeInTheDocument();
        expect(startArrow).toHaveClass('p-8 text-black-default');
        expect(endArrow).toBeInTheDocument();
        expect(endArrow).toHaveClass('p-8 text-black-default');

        const leftIcon = screen.getByTestId('icon-arrowLeft');
        const rightIcon = screen.getByTestId('icon-arrowRight');

        expect(leftIcon).toBeInTheDocument();
        expect(leftIcon).toHaveAttribute('width', '16');
        expect(leftIcon).toHaveAttribute('height', '16');

        expect(rightIcon).toBeInTheDocument();
        expect(rightIcon).toHaveAttribute('width', '16');
        expect(rightIcon).toHaveAttribute('height', '16');
    });

    it('renders gradient with correct color', () => {
        render(<ScrollArea {...defaultProps} />);

        const gradient = screen.getByTestId('scrollarea-gradient');
        expect(gradient).toBeInTheDocument();
        expect(gradient).toHaveAttribute(
            'data-gradient-color',
            'var(--color-white-default)'
        );
    });

    it('passes through additional props to Scrollarea', () => {
        const customProps = {
            className: 'custom-scrollarea',
            'data-custom': 'test-value'
        };

        render(<ScrollArea {...customProps} {...defaultProps} />);

        const scrollArea = screen.getByTestId('scrollarea-root');
        expect(scrollArea).toHaveClass('custom-scrollarea');
        expect(scrollArea).toHaveAttribute('data-custom', 'test-value');
    });

    it('renders arrows wrapper with desktop-only visibility', () => {
        render(<ScrollArea {...defaultProps} />);

        const arrowsContainer = screen.getByTestId(
            'scrollarea-arrow-start'
        ).parentElement;
        expect(arrowsContainer).toHaveClass('hidden xl:block');
    });

    it('works with different content types', () => {
        const { rerender } = render(
            <ScrollArea>
                <span>Simple text</span>
            </ScrollArea>
        );

        expect(screen.getByText('Simple text')).toBeInTheDocument();

        rerender(
            <ScrollArea>
                <div>Complex content</div>
                <div>Multiple elements</div>
            </ScrollArea>
        );

        expect(screen.getByText('Complex content')).toBeInTheDocument();
        expect(screen.getByText('Multiple elements')).toBeInTheDocument();
    });

    it('should match snapshot with default props', () => {
        const { asFragment } = render(<ScrollArea {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with vertical position', () => {
        const { asFragment } = render(
            <ScrollArea position="vertical">
                <div>Vertical content</div>
            </ScrollArea>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with custom props', () => {
        const { asFragment } = render(
            <ScrollArea
                position="horizontal"
                className="custom-scroll"
                data-testid="custom-scrollarea"
            >
                <div>Custom content</div>
                <div>More content</div>
            </ScrollArea>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
