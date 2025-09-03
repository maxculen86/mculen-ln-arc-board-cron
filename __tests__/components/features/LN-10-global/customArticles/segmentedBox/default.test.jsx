import React from 'react';
import { render } from '@testing-library/react';
import { CustomArticleSegmentedBox } from '../../../../../../components/features/LN-10-global/customArticles/segmentedBox/default';
import { linksSegmentedBox } from '../../../../../../components/features/LN-10-global/customArticles/segmentedBox/config';

jest.mock('@ln/common-ui-image', () => ({
    Image: function MockImage(props) {
        return <img data-testid="image" {...props} />;
    }
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: function MockIcon({ children, size }) {
        return (
            <span data-testid="icon" data-size={size}>
                {children}
            </span>
        );
    }
}));

jest.mock('@ln/contenidos-ui-link', () => ({
    Link: function MockLink({
        children,
        href,
        className,
        unstyled,
        title,
        ...props
    }) {
        return (
            <a
                data-testid="link"
                href={href}
                className={className}
                title={title}
                data-unstyled={unstyled}
                {...props}
            >
                {children}
            </a>
        );
    }
}));

jest.mock('@ln/contenidos-ui-text', () => ({
    Text: function MockText({ children, className }) {
        return (
            <span data-testid="text" className={className}>
                {children}
            </span>
        );
    }
}));

jest.mock(
    '../../../../../../components/features/LN-10-global/customArticles/segmentedBox/config',
    () => ({
        linksSegmentedBox: [
            {
                text: 'de Ganancias',
                href: 'https://example.com/ganancias',
                title: 'Ir a calculadora de ganancias',
                ariaLabel: 'Ir a calculadora de ganancias'
            },
            {
                text: 'De créditos hipotecarios',
                href: 'https://example.com/creditos',
                title: 'Ir a calculadora de créditos hipotecarios',
                ariaLabel: 'Ir a calculadora de créditos hipotecarios'
            },
            {
                text: 'De inflación',
                href: 'https://example.com/inflacion',
                title: 'Ir a calculadora de inflación',
                ariaLabel: 'Ir a calculadora de inflación'
            }
        ]
    })
);

describe('CustomArticleSegmentedBox', () => {
    const mockButtonLogo = {
        src: 'https://example.com/logo.png',
        alt: 'Logo test'
    };

    it('should render without crashing', () => {
        const { container } = render(
            <CustomArticleSegmentedBox buttonLogo={mockButtonLogo} />
        );
        expect(container).toBeInTheDocument();
    });

    it('should render main container with correct classes', () => {
        const { container } = render(
            <CustomArticleSegmentedBox buttonLogo={mockButtonLogo} />
        );
        const mainContainer = container.firstChild;

        expect(mainContainer).toHaveClass(
            'as-article',
            'flex',
            'flex-column',
            'gap-8',
            'uppercase',
            'text-neutral-light-800'
        );
    });

    it('should render CALCULADORAS section', () => {
        const { getByTestId } = render(
            <CustomArticleSegmentedBox buttonLogo={mockButtonLogo} />
        );
        const calculadorasText = getByTestId('text');

        expect(calculadorasText).toBeInTheDocument();
        expect(calculadorasText).toHaveTextContent('CALCULADORAS');
        expect(calculadorasText).toHaveClass(
            'inline-flex',
            'ai-center',
            'gap-4',
            'font-bold',
            'text-12'
        );
    });

    it('should render all calculator links', () => {
        const { getAllByTestId } = render(
            <CustomArticleSegmentedBox buttonLogo={mockButtonLogo} />
        );
        const links = getAllByTestId('link');

        expect(links).toHaveLength(5);

        expect(links[0]).toHaveAttribute(
            'href',
            'https://example.com/ganancias'
        );
        expect(links[0]).toHaveTextContent('de Ganancias');

        expect(links[1]).toHaveAttribute(
            'href',
            'https://example.com/creditos'
        );
        expect(links[1]).toHaveTextContent('De créditos hipotecarios');

        expect(links[2]).toHaveAttribute(
            'href',
            'https://example.com/inflacion'
        );
        expect(links[2]).toHaveTextContent('De inflación');
    });

    it('should render COTIZACIONES link', () => {
        const { getAllByTestId } = render(
            <CustomArticleSegmentedBox buttonLogo={mockButtonLogo} />
        );
        const links = getAllByTestId('link');
        const cotizacionesLink = links[3];

        expect(cotizacionesLink).toHaveAttribute(
            'href',
            'https://www.lanacion.com.ar/dolar-hoy'
        );
        expect(cotizacionesLink).toHaveAttribute('title', 'Ir a cotizaciones');
        expect(cotizacionesLink).toHaveAttribute(
            'aria-label',
            'Ir a cotizaciones'
        );
        expect(cotizacionesLink).toHaveTextContent('COTIZACIONES');
    });

    it('should render economia link with image', () => {
        const { getAllByTestId, getByTestId } = render(
            <CustomArticleSegmentedBox buttonLogo={mockButtonLogo} />
        );
        const links = getAllByTestId('link');
        const economiaLink = links[4];
        const image = getByTestId('image');

        expect(economiaLink).toHaveAttribute(
            'href',
            'https://www.lanacion.com.ar/economia/'
        );
        expect(economiaLink).toHaveAttribute('title', 'Ir a economía');
        expect(economiaLink).toHaveAttribute('aria-label', 'Ir a economía');

        expect(image).toHaveAttribute('src', 'https://example.com/logo.png');
        expect(image).toHaveAttribute('alt', 'Logo test');
        expect(image).toHaveClass('h-36', 'w-auto');
    });

    it('should render icons correctly', () => {
        const { getAllByTestId } = render(
            <CustomArticleSegmentedBox buttonLogo={mockButtonLogo} />
        );
        const icons = getAllByTestId('icon');

        expect(icons).toHaveLength(2);

        icons.forEach(icon => {
            expect(icon).toHaveAttribute('data-size', '16');
        });
    });

    it('should render hr separator', () => {
        const { container } = render(
            <CustomArticleSegmentedBox buttonLogo={mockButtonLogo} />
        );
        const hr = container.querySelector('hr');

        expect(hr).toBeInTheDocument();
        expect(hr).toHaveClass('mb-8');
    });

    it('should render list with correct structure', () => {
        const { container } = render(
            <CustomArticleSegmentedBox buttonLogo={mockButtonLogo} />
        );
        const ul = container.querySelector('ul');
        const listItems = container.querySelectorAll('li');

        expect(ul).toBeInTheDocument();
        expect(ul).toHaveClass(
            'flex',
            'flex-column',
            'gap-4',
            'pl-20',
            'mb-8',
            'text-12_130'
        );
        expect(listItems).toHaveLength(3);
    });

    it('should have proper accessibility attributes', () => {
        const { getAllByTestId } = render(
            <CustomArticleSegmentedBox buttonLogo={mockButtonLogo} />
        );
        const links = getAllByTestId('link');

        links.forEach(link => {
            expect(link).toHaveAttribute('title');
            expect(link).toHaveAttribute('aria-label');
            expect(link).toHaveAttribute('data-unstyled', 'true');
        });
    });

    it('matches snapshot', () => {
        const { asFragment } = render(
            <CustomArticleSegmentedBox buttonLogo={mockButtonLogo} />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
