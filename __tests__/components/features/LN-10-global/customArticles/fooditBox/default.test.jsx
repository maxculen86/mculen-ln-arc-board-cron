import React from 'react';
import { render, screen } from '@testing-library/react';
import { CustomArticleFooditBox } from '../../../../../../components/features/LN-10-global/customArticles/fooditBox/default';

jest.mock('@ln/contenidos-ui-link', () => ({
    Link: function MockLink({ children, href, className, title, target }) {
        return (
            <a
                data-testid="link"
                href={href}
                className={className}
                title={title}
                target={target}
            >
                {children}
            </a>
        );
    }
}));

jest.mock('@ln/common-ui-text', () => ({
    Text: function MockText({ children, className }) {
        return (
            <span data-testid="text" className={className}>
                {children}
            </span>
        );
    }
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: function MockIcon({ children, height, className }) {
        return (
            <span data-testid="icon" data-height={height} className={className}>
                {children}
            </span>
        );
    }
}));

jest.mock('@ln/contenidos-ui-button', () => ({
    Button: function MockButton({
        href,
        title,
        size,
        id,
        target,
        variant,
        label
    }) {
        return (
            <button
                data-testid="button"
                data-href={href}
                title={title}
                data-size={size}
                id={id}
                data-target={target}
                data-variant={variant}
            >
                {label}
            </button>
        );
    }
}));

describe('CustomArticleFooditBox', () => {
    const defaultProps = {
        targetButton: '_blank',
        titleLink: 'https://example.com/foodit',
        buttonText: 'SUSCRIBITE A FOODIT',
        hrefButtonFoodit: 'https://example.com/suscripcion'
    };

    it('should render without crashing', () => {
        const { container } = render(
            <CustomArticleFooditBox {...defaultProps} />
        );
        expect(container).toBeInTheDocument();
    });

    it('should render main container with correct classes', () => {
        const { container } = render(
            <CustomArticleFooditBox {...defaultProps} />
        );
        const mainContainer = container.firstChild;

        expect(mainContainer).toHaveClass(
            'flex',
            'flex-column',
            'as-article',
            'jc-between',
            'pb-12',
            'w-100',
            'h-100',
            'min-h-190'
        );
    });

    it('should render link with correct props', () => {
        const { getByTestId } = render(
            <CustomArticleFooditBox {...defaultProps} />
        );
        const link = getByTestId('link');

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://example.com/foodit');
        expect(link).toHaveAttribute('title', 'Ir a Foodit');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveClass('flex', 'm-none', 'lowercase');
    });

    it('should render text content correctly', () => {
        const { getByTestId } = render(
            <CustomArticleFooditBox {...defaultProps} />
        );
        const text = getByTestId('text');

        expect(text).toBeInTheDocument();
        expect(text).toHaveClass(
            'foodit-text',
            '--prumo',
            'flex',
            'ai-end',
            'text-neutral-light-800',
            'mt-32',
            'max-w-165'
        );
        expect(text).toHaveTextContent('recetas, menús y tips para cocinar');
    });

    it('should render icon with correct props', () => {
        const { getByTestId } = render(
            <CustomArticleFooditBox {...defaultProps} />
        );
        const icon = getByTestId('icon');

        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('data-height', '16.8');
        expect(icon).toHaveClass('ml-4');
    });

    it('should render button when hrefButtonFoodit is provided', () => {
        const { getByTestId } = render(
            <CustomArticleFooditBox {...defaultProps} />
        );
        const button = getByTestId('button');

        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute(
            'data-href',
            'https://example.com/suscripcion'
        );
        expect(button).toHaveAttribute('title', 'Suscribite a Foodit');
        expect(button).toHaveAttribute('data-size', '32');
        expect(button).toHaveAttribute('id', 'btn-foodit-grid');
        expect(button).toHaveAttribute('data-target', '_blank');
        expect(button).toHaveAttribute('data-variant', 'secondary');
        expect(button).toHaveTextContent('SUSCRIBITE A FOODIT');
    });

    it('should not render button when hrefButtonFoodit is not provided', () => {
        const propsWithoutButton = {
            ...defaultProps,
            hrefButtonFoodit: null
        };

        const { queryByTestId } = render(
            <CustomArticleFooditBox {...propsWithoutButton} />
        );
        const button = queryByTestId('button');

        expect(button).not.toBeInTheDocument();
    });

    it('should use custom button text when provided', () => {
        const customProps = {
            ...defaultProps,
            buttonText: 'TEXTO PERSONALIZADO'
        };

        const { getByTestId } = render(
            <CustomArticleFooditBox {...customProps} />
        );
        const button = getByTestId('button');

        expect(button).toHaveTextContent('TEXTO PERSONALIZADO');
    });

    it('should use default button text when not provided', () => {
        const propsWithoutButtonText = {
            targetButton: '_blank',
            titleLink: 'https://example.com/foodit',
            hrefButtonFoodit: 'https://example.com/suscripcion'
        };

        const { getByTestId } = render(
            <CustomArticleFooditBox {...propsWithoutButtonText} />
        );
        const button = getByTestId('button');

        expect(button).toHaveTextContent('SUSCRIBITE A FOODIT');
    });

    it('should render title content', () => {
        render(<CustomArticleFooditBox {...defaultProps} />);

        expect(
            screen.getByText('recetas, menús y tips para cocinar')
        ).toBeInTheDocument();
    });

    it('matches snapshot with all props', () => {
        const { asFragment } = render(
            <CustomArticleFooditBox {...defaultProps} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot without button', () => {
        const propsWithoutButton = {
            ...defaultProps,
            hrefButtonFoodit: null
        };

        const { asFragment } = render(
            <CustomArticleFooditBox {...propsWithoutButton} />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
