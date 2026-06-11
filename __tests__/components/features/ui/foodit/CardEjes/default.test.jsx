import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardEjes } from '../../../../../../components/features/ui/foodit/CardEjes/default';

jest.mock(
    '../../../../../../components/features/ui/foodit/image/default',
    () =>
        function MockImage({ src, alt, fetchPriority, loading }) {
            return (
                <img
                    src={src}
                    alt={alt}
                    data-fetch-priority={fetchPriority}
                    data-loading={loading}
                />
            );
        }
);

const defaultProps = {
    title: 'Recetas saludables',
    image: 'https://example.com/image.jpg',
    classNames: 'card-ejes',
    href: '/recetas',
    fetchPriority: 'low',
    loading: 'lazy',
    trackingProps: {}
};

describe('CardEjes', () => {
    it('renders the article with given classNames', () => {
        const { container } = render(<CardEjes {...defaultProps} />);
        const article = container.querySelector('article');
        expect(article).toHaveClass('card-ejes');
    });

    it('renders the link with given href', () => {
        render(<CardEjes {...defaultProps} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/recetas');
    });

    it('renders with default href when not provided', () => {
        const { title, image } = defaultProps;
        render(<CardEjes title={title} image={image} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/');
    });

    it('renders the title text', () => {
        render(<CardEjes {...defaultProps} />);
        expect(screen.getByText('Recetas saludables')).toBeInTheDocument();
    });

    it('renders the image with correct src and alt', () => {
        render(<CardEjes {...defaultProps} />);
        const img = screen.getByAltText('Imagen de Recetas saludables');
        expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('renders correctly with snapshot', () => {
        const { container } = render(<CardEjes {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });
});
