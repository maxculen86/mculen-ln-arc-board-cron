import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../../../../../../components/layouts/LN-Buscador/_children/card/default';

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' '),
    cva:
        (base, config) =>
        (props = {}) => {
            const classes = [base];
            if (config?.variants) {
                Object.keys(config.variants).forEach(key => {
                    const value = props[key];
                    if (value && config.variants[key]?.[value]) {
                        classes.push(config.variants[key][value]);
                    }
                });
            }
            return classes.filter(Boolean).join(' ');
        }
}));

jest.mock(
    '../../../../../../components/features/ui/ln/image/default',
    () =>
        function MockImage({ src, alt, loading, fetchPriority, className }) {
            return (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    data-testid="card-image"
                    data-loading={loading}
                    data-fetchpriority={fetchPriority}
                />
            );
        }
);

jest.mock(
    '../../../../../../components/features/ui/ln/icon/default',
    () =>
        function MockIcon({ name, size, ...props }) {
            return (
                <span
                    data-testid="icon"
                    data-name={name}
                    data-size={size}
                    {...props}
                />
            );
        }
);

const defaultProps = {
    title: 'Dólar hoy: cotización del mercado',
    href: '/economia/dolar-hoy',
    imgSrc: 'https://resizer.lanacion.com.ar/img.jpg',
    author: 'Juan Pérez',
    formattedDate: '20 de abril de 2026',
    dateTime: '2026-04-20T10:00:00Z'
};

describe('Card', () => {
    describe('estructura base', () => {
        it('render link with correct href', () => {
            render(<Card {...defaultProps} />);
            const link = screen.getByRole('link');
            expect(link).toHaveAttribute('href', defaultProps.href);
        });

        it('render title', () => {
            render(<Card {...defaultProps} />);
            expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
                defaultProps.title
            );
        });

        it('uses variant "regular" as default', () => {
            render(<Card title="Título" href="/nota" />);
            expect(screen.getByTestId('card-image')).toBeInTheDocument();
        });
    });

    describe('imagen', () => {
        it('shows the image when imgSrc is provided in variant regular', () => {
            render(<Card {...defaultProps} variant="regular" />);
            const img = screen.getByTestId('card-image');
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute('src', defaultProps.imgSrc);
        });

        it('shows the image block without src when variant is regular and no imgSrc is provided', () => {
            render(<Card title="Título" href="/nota" variant="regular" />);
            const img = screen.getByTestId('card-image');
            expect(img).toBeInTheDocument();
            expect(img).not.toHaveAttribute('src');
        });

        it('hides the image when variant is highlights and no imgSrc is provided', () => {
            render(
                <Card
                    title="Título"
                    href="/nota"
                    variant="highlights"
                    description="Descripción"
                />
            );
            expect(screen.queryByTestId('card-image')).not.toBeInTheDocument();
        });

        it('shows the image when variant is highlights and imgSrc is provided', () => {
            render(
                <Card
                    {...defaultProps}
                    variant="highlights"
                    description="Descripción"
                />
            );
            expect(screen.getByTestId('card-image')).toBeInTheDocument();
        });

        it('passes the title as alt of the image', () => {
            render(<Card {...defaultProps} />);
            expect(screen.getByTestId('card-image')).toHaveAttribute(
                'alt',
                defaultProps.title
            );
        });

        it('uses loading=lazy and fetchPriority=low in variant regular by default', () => {
            render(<Card {...defaultProps} variant="regular" />);
            const img = screen.getByTestId('card-image');
            expect(img).toHaveAttribute('data-loading', 'lazy');
            expect(img).toHaveAttribute('data-fetchpriority', 'low');
        });

        it('uses loading=eager and fetchPriority=high in variant highlights by default', () => {
            render(
                <Card
                    {...defaultProps}
                    variant="highlights"
                    description="Desc"
                />
            );
            const img = screen.getByTestId('card-image');
            expect(img).toHaveAttribute('data-loading', 'eager');
            expect(img).toHaveAttribute('data-fetchpriority', 'high');
        });

        it('explicit loading and fetchPriority props override variant defaults', () => {
            render(
                <Card
                    {...defaultProps}
                    variant="regular"
                    loading="eager"
                    fetchPriority="high"
                />
            );
            const img = screen.getByTestId('card-image');
            expect(img).toHaveAttribute('data-loading', 'eager');
            expect(img).toHaveAttribute('data-fetchpriority', 'high');
        });

        it('accepts fetchPriority=auto for mid-viewport cards', () => {
            render(
                <Card
                    {...defaultProps}
                    variant="regular"
                    loading="eager"
                    fetchPriority="auto"
                />
            );
            const img = screen.getByTestId('card-image');
            expect(img).toHaveAttribute('data-loading', 'eager');
            expect(img).toHaveAttribute('data-fetchpriority', 'auto');
        });

        it('the image container has aria-hidden', () => {
            render(<Card {...defaultProps} />);
            const decorativeWrapper = screen
                .getByTestId('card-image')
                .closest('[aria-hidden="true"]');
            expect(decorativeWrapper).toBeInTheDocument();
        });
    });

    describe('description', () => {
        it('does not show the description in variant regular even if provided', () => {
            render(
                <Card {...defaultProps} variant="regular" description="Desc" />
            );
            expect(screen.queryByText('Desc')).not.toBeInTheDocument();
        });

        it('does not show the description in variant highlights if not provided', () => {
            render(<Card {...defaultProps} variant="highlights" />);
            const paragraphs = screen
                .getAllByRole('paragraph')
                .map(el => el.textContent);
            expect(
                paragraphs.every(text => text === 'explorar contenido')
            ).toBe(true);
        });

        it('shows the description in variant highlights when provided', () => {
            const description = 'Texto descriptivo del artículo';
            render(
                <Card
                    {...defaultProps}
                    variant="highlights"
                    description={description}
                />
            );
            expect(screen.getByText(description)).toBeInTheDocument();
        });
    });

    describe('CardFooter — variant regular', () => {
        it('shows the author when provided', () => {
            render(<Card {...defaultProps} variant="regular" />);
            expect(screen.getByText(defaultProps.author)).toBeInTheDocument();
        });

        it('does not show the author when not provided', () => {
            const { author: _omit, ...propsWithoutAuthor } = defaultProps;
            render(<Card {...propsWithoutAuthor} variant="regular" />);
            expect(screen.queryByText('Por')).not.toBeInTheDocument();
        });

        it('shows the date in a <time> element with the correct dateTime', () => {
            render(<Card {...defaultProps} variant="regular" />);
            const timeEl = screen.getByRole('time');
            expect(timeEl).toHaveTextContent(defaultProps.formattedDate);
            expect(timeEl).toHaveAttribute('dateTime', defaultProps.dateTime);
        });

        it('does not show the <time> element when there is no formattedDate', () => {
            const { formattedDate: _omit, ...propsWithoutDate } = defaultProps;
            render(<Card {...propsWithoutDate} variant="regular" />);
            expect(screen.queryByRole('time')).not.toBeInTheDocument();
        });

        it('does not show "explorar contenido" in variant regular', () => {
            render(<Card {...defaultProps} variant="regular" />);
            expect(
                screen.queryByText(/explorar contenido/i)
            ).not.toBeInTheDocument();
        });
    });

    describe('CardFooter — variant highlights', () => {
        it('shows the text "explorar contenido"', () => {
            render(
                <Card
                    {...defaultProps}
                    variant="highlights"
                    description="Desc"
                />
            );
            expect(screen.getByText(/explorar contenido/i)).toBeInTheDocument();
        });

        it('shows the arrow icon', () => {
            render(
                <Card
                    {...defaultProps}
                    variant="highlights"
                    description="Desc"
                />
            );
            expect(screen.getByTestId('icon')).toHaveAttribute(
                'data-name',
                'arrow-right'
            );
        });

        it('does not show author or date in variant highlights', () => {
            render(
                <Card
                    {...defaultProps}
                    variant="highlights"
                    description="Desc"
                />
            );
            expect(
                screen.queryByText(defaultProps.author)
            ).not.toBeInTheDocument();
            expect(screen.queryByRole('time')).not.toBeInTheDocument();
        });
    });

    describe('edge cases', () => {
        it('textContainer does not include h-full when there is an image', () => {
            const { container } = render(
                <Card {...defaultProps} variant="regular" />
            );
            const textContainer = container.querySelector('a > div:last-child');
            expect(textContainer.className).not.toContain('h-full');
        });
    });

    describe('edge cases', () => {
        it('should match snapshot variant highlights', () => {
            const { container } = render(
                <Card title="Título" href="/nota" variant="highlights" />
            );
            expect(container).toMatchSnapshot();
        });
        it('should match snapshot variant regular', () => {
            const { container } = render(
                <Card title="Título" href="/nota" variant="regular" />
            );
            expect(container).toMatchSnapshot();
        });
    });
});
