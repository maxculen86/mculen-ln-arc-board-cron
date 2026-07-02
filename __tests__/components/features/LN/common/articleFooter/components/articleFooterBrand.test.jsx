import React from 'react';
import { render, screen } from '@testing-library/react';
import Brand from '../../../../../../../components/features/LN/common/articleFooter/components/articleFooterBrand';

jest.mock(
    '../../../../../../../components/features/ui/ln/image/default',
    () =>
        function MockImage({ src, alt, objectFit }) {
            return <img src={src} alt={alt} data-object-fit={objectFit} />;
        }
);

describe('Brand', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when src is not provided', () => {
        it('should render null when imageProps are empty', () => {
            const { container } = render(<Brand />);

            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('when src is provided', () => {
        it('should render the image with the given src', () => {
            render(
                <Brand
                    src="https://placehold.co/123x40/"
                    alt="Comunidad de Negocios"
                />
            );

            expect(
                screen.getByAltText('Comunidad de Negocios')
            ).toHaveAttribute('src', 'https://placehold.co/123x40/');
        });

        it('should default objectFit to "contain"', () => {
            render(
                <Brand
                    src="https://placehold.co/123x40/"
                    alt="Comunidad de Negocios"
                />
            );

            expect(
                screen.getByAltText('Comunidad de Negocios')
            ).toHaveAttribute('data-object-fit', 'contain');
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with default props', () => {
            const { asFragment } = render(
                <Brand
                    src="https://placehold.co/123x40/"
                    alt="Comunidad de Negocios"
                />
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
