import BuildRoof from '../../../../../components/chains/utils/_BuildRoof/default';
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import useGetLinks from '../../../../../components/chains/utils/_BuildRoof/_helper/useGetLinks';
import useGetLogoImage from '../../../../../components/private/common/hooks/useGetLogoImage';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../../components/chains/utils/_BuildRoof/_helper/useGetLinks',
    () => jest.fn()
);

jest.mock(
    '../../../../../components/private/common/hooks/useGetLogoImage',
    () => jest.fn()
);

describe('Tests component BuildRoof', () => {
    const props = {
        title: 'Titulo del Techo',
        titleLink: 'https://lanacion.com.ar',
        logoId: '',
        buttonText: '',
        linkButton: '',
        buttonStyle: '',
        hideRoof: false,
        navigationId: '',
        isAdmin: true
    };

    describe('tests for validations and return warning', () => {
        test('should return a warning that the image id is incorrect', () => {
            useGetLinks.mockImplementation(() => undefined);
            useGetLogoImage.mockImplementation(() => undefined);

            const properties = {
                ...props,
                logoId: 'incorrect-id'
            };

            render(<BuildRoof {...properties} />);

            expect(
                screen.getByText('El ID de la imagen del logo es incorrecto.')
            ).toBeVisible();
            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeVisible();
        });

        test('should return a warning showing that you must define a title', () => {
            const properties = {
                ...props,
                title: ''
            };

            render(<BuildRoof {...properties} />);

            expect(
                screen.getByText('Debe definir un titulo para el techo.')
            ).toBeVisible();
            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeVisible();
        });

        test('should return a warning showing that you must define a title', () => {
            useGetLinks.mockImplementation(() => undefined);

            const properties = {
                ...props,
                navigationId: 'incorrect-navigation-id'
            };

            render(<BuildRoof {...properties} />);

            expect(
                screen.getByText(
                    'El ID de navegacion de site services es incorrecto.'
                )
            ).toBeVisible();
            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeVisible();
        });

        test('Should return a warning when there is text for the button but no url for the button', () => {
            useGetLinks.mockImplementation(() => undefined);
            const properties = {
                ...props,
                buttonText: 'Texto del boton'
            };

            render(<BuildRoof {...properties} />);

            expect(
                screen.getByText('Debe definir una url para el boton')
            ).toBeVisible();
            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeVisible();
        });
    });

    describe('Return tests outside page Builder', () => {
        useGetLinks.mockImplementation(() => undefined);
        useGetLogoImage.mockImplementation(() => undefined);

        const properties = {
            ...props,
            isAdmin: false
        };

        test('should return the roof with the title and the title link', () => {
            render(<BuildRoof {...properties} />);

            expect(screen.getByText('Titulo del Techo')).toBeVisible();
            expect(screen.getByTitle('Ir a Titulo del Techo')).toBeVisible();
            expect(screen.getByRole('link').getAttribute('href')).toStrictEqual(
                props.titleLink
            );
        });

        // TODO: Quitar el skip cuando front haga el fix de la imagen del logo.
        test.skip('should return aN image logo', () => {
            useGetLogoImage.mockImplementation(() => ({
                caption: '',
                height: 181,
                url:
                    'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/D5BZF3XZ7JDUNJZWGSNJWHIHJQ.png',
                width: 920,
                _id: 'D5BZF3XZ7JDUNJZWGSNJWHIHJQ'
            }));
            const props = {
                ...properties,
                logoId: 'D5BZF3XZ7JDUNJZWGSNJWHIHJQ',
                title: 'Titulo con logo',
                titleLink: ''
            };

            render(<BuildRoof {...props} />);

            expect(screen.getByAltText('Titulo con logo')).toBeVisible();
            expect(screen.getByRole('img').getAttribute('src')).toStrictEqual(
                'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/D5BZF3XZ7JDUNJZWGSNJWHIHJQ.png'
            );
        });

        test('should return nav links when the navigationId is defined', () => {
            useGetLinks.mockImplementation(() => [
                {
                    text: 'Dólar hoy',
                    href: 'https://www.lanacion.com.ar/dolar-hoy/',
                    target: '_blank'
                },
                {
                    text: 'Índices',
                    href: 'https://www.lanacion.com.ar/economia/indices/',
                    target: '_blank'
                },
                {
                    text: 'Campo',
                    href: '/economia/campo/',
                    target: '_blank'
                },
                {
                    text: 'Negocios',
                    href: '/economia/negocios/',
                    target: '_blank'
                },
                {
                    text: 'Emprendedores',
                    href:
                        'https://www.lanacion.com.ar/tema/emprendedores-tid53673/',
                    target: '_blank'
                },
                {
                    text: 'Propiedades',
                    href: '/propiedades/',
                    target: '_blank'
                }
            ]);

            const props = {
                ...properties,
                navigationId: 'Economy',
                titleLink: ''
            };

            render(<BuildRoof {...props} />);

            expect(screen.getAllByRole('link')).toHaveLength(6);
            expect(screen.getByText('Dólar hoy')).toBeVisible();
            expect(screen.getByText('Índices')).toBeVisible();
            expect(screen.getByText('Campo')).toBeVisible();
            expect(screen.getByText('Negocios')).toBeVisible();
            expect(screen.getByText('Emprendedores')).toBeVisible();
            expect(screen.getByText('Propiedades')).toBeVisible();
        });

        test('should return a button when the buttonText is defined', () => {
            useGetLinks.mockImplementation(() => undefined);
            const props = {
                ...properties,
                buttonText: 'Texto del boton',
                linkButton: 'https://linkDelBoton.com.ar'
            };

            render(<BuildRoof {...props} />);

            expect(screen.getByText('Texto del boton')).toBeVisible();
            expect(screen.getByTitle('Texto del boton')).toBeVisible();
            expect(
                screen
                    .getByRole('link', { name: 'Texto del boton' })
                    .getAttribute('href')
            ).toStrictEqual(props.linkButton);
        });
    });
});
