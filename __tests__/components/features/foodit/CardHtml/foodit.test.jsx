import React from 'react';
import Context from 'fusion:context';
import HtmlBanner from '../../../../../components/features/foodit/HtmlBanner/foodit';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Tests - Feature - Foodit HtmlBanner', () => {
    const mockWebComponent = `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <title>Contenido del Iframe</title>
                            </head>
                            <body>
                                <h1>Contenido del Iframe</h1>
                                <p>Este es un contenido simple dentro del iframe.</p>
                                
                                <a href="https://www.lanacion.com.ar" target="_top">
                                    <button>Haz clic para ir a La Nación</button>
                                </a>
                            </body>
                            </html>`;

    const getProps = ({
        title = 'Prueba Html',
        html = mockWebComponent,
        heightMobile = 100,
        heightTablet = 100,
        heightDesktop = 100
    } = {}) => {
        return {
            id: 'featureId',
            customFields: {
                title,
                html,
                heightMobile,
                heightTablet,
                heightDesktop
            }
        };
    };

    describe('Tests banners HTML', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: true
        }));

        test('should return a pageBuilder error when the custom field "html" is empty', () => {
            render(<HtmlBanner {...getProps({ html: '' })} />);

            expect(
                screen.getByText('El campo "HTML" es obligatorio.')
            ).toBeDefined();
        });

        test('should return a pageBuilder Error when the note title is not defined', () => {
            render(<HtmlBanner {...getProps({ title: '' })} />);

            expect(
                screen.getByText('Debe proporcionar un título.')
            ).toBeDefined();
        });

        const casesFixedHeight = [
            [{ heightMobile: null }],
            [{ heightTablet: null }],
            [{ heightDesktop: null }]
        ];

        test.each(casesFixedHeight)(
            'should show an error when any of the heights is not defined',
            props => {
                render(<HtmlBanner {...getProps(props)} />);

                expect(
                    screen.getByText(
                        'Debe definir altos para todos los dispositivos.'
                    )
                ).toBeDefined();
            }
        );

        test('should return a iframe with attributes loading, title and the web component defined in custom field "Tablero / html" ', () => {
            const { container } = render(
                <HtmlBanner
                    {...getProps({
                        html: mockWebComponent,
                        title: 'Button Iframe'
                    })}
                />
            );

            const iframe = document.querySelector('iframe');
            const srcdoc = iframe.getAttribute('srcdoc');

            expect(iframe).toBeDefined();
            expect(iframe.getAttribute('title')).toStrictEqual('Button Iframe');
            expect(iframe.getAttribute('loading')).toStrictEqual('lazy');
            expect(
                srcdoc.includes(
                    '<style> html, body { width: 100%; height: 100%; overflow: hidden; }</style>'
                )
            ).toBeTruthy();
            expect(srcdoc.includes(mockWebComponent)).toBeTruthy();

            expect(container).toMatchSnapshot();
        });
    });
});
