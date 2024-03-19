import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthorBiography from '../../../../../../components/features/foodit-global/common/authorBiography/foodit';

describe('AuthorBiography', () => {
    it('renders author biography with correct data', () => {
        const mockAuthorData = {
            name: 'El pepe',
            description:
                'Descripcion generica para completar test de descripcion de chef',
            imageProps: {
                src: 'https://example.com/image.jpg',
                alt: 'Ir a El pepe'
            },
            socialNetworks: [
                {
                    icon: 'instagram',
                    name: '@pepeEl',
                    href: 'https://www.instagram.com/pepeEl/'
                },
                {
                    icon: 'youtube',
                    name: '@ElpepeYT',
                    href: 'https://www.youtube.com/@ElpepeYT'
                },
                {
                    icon: 'pinterest',
                    name: '@ElpepePint',
                    href: 'https://www.pinterest.com/ElpepePint'
                },
                {
                    icon: 'twitter',
                    name: '@ElpepeX',
                    href: 'https://twitter.com/ElpepeX'
                }
            ]
        };

        const { container } = render(<AuthorBiography {...mockAuthorData} />);

        expect(screen.getByText('El pepe')).toBeInTheDocument();
        expect(screen.getByText('@pepeEl')).toBeInTheDocument();
        expect(screen.getByText('@ElpepeYT')).toBeInTheDocument();
        expect(screen.getByText('@ElpepePint')).toBeInTheDocument();
        expect(screen.getByText('@ElpepeX')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Descripcion generica para completar test de descripcion de chef'
            )
        ).toBeInTheDocument();
        expect(
            container.querySelector('flex jc-center flex-wrap gap-24 gap-16_md')
        ).toBeDefined();

        expect(screen.getByAltText('Ir a El pepe')).toBeInTheDocument();
        expect(screen.getAllByRole('link')).toHaveLength(4);
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            'https://example.com/image.jpg'
        );
    });

    it('renders author biography with correct data and socials', () => {
        const mockAuthorData = {
            name: 'El fulano',
            description:
                'Descripcion generica para completar test de descripcion de chef fulano',
            imageProps: {
                src: 'https://example.com/image2.jpg',
                alt: 'Ir a El fulano'
            },
            socialNetworks: [
                {
                    icon: 'instagram',
                    name: '@fulanoEl',
                    href: 'https://www.instagram.com/fulanoEl/'
                },
                {
                    icon: 'pinterest',
                    name: '@ElfulanoPint',
                    href: 'https://www.pinterest.com/ElpepePint'
                }
            ]
        };

        const { container } = render(<AuthorBiography {...mockAuthorData} />);
        expect(screen.getByText('El fulano')).toBeInTheDocument();
        expect(screen.getByText('@fulanoEl')).toBeInTheDocument();
        expect(screen.getByText('@ElfulanoPint')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Descripcion generica para completar test de descripcion de chef fulano'
            )
        ).toBeInTheDocument();
        expect(
            container.querySelector('flex jc-center flex-wrap gap-24 gap-16_md')
        ).toBeDefined();
        expect(screen.getByAltText('Ir a El fulano')).toBeInTheDocument();
        expect(screen.getAllByRole('link')).toHaveLength(2);
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            'https://example.com/image2.jpg'
        );
    });

    it('renders author biography with correct data without socials', () => {
        const mockAuthorData = {
            name: 'El fulano',
            description:
                'Descripcion generica para completar test de descripcion de chef fulano',
            imageProps: {
                src: 'https://example.com/image2.jpg',
                alt: 'Ir a El fulano'
            }
        };

        const { container } = render(<AuthorBiography {...mockAuthorData} />);
        expect(screen.getByText('El fulano')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Descripcion generica para completar test de descripcion de chef fulano'
            )
        ).toBeInTheDocument();
        expect(screen.getByAltText('Ir a El fulano')).toBeInTheDocument();
        expect(
            container.querySelector('flex jc-center flex-wrap gap-24 gap-16_md')
        ).toBeNull();

        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            'https://example.com/image2.jpg'
        );
    });
});
