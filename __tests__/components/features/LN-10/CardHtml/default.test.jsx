import React from 'react';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import HtmlFeature from '../../../../../components/features/LN-10/CardHtml/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('Tests - Feature - CardHtml', () => {
    const mockWebComponent = `<div><script type="module" src="https://unpkg.com/bootstrap-grid-webcomponents@0.1.3/dist/bootstrap-grid-webcomponents/bootstrap-grid-webcomponents.esm.js"></script><bs-row><bs-col><img src="https://placekitten.com/g/400/200" width="100%" height="100%"></bs-col><bs-col><img src="https://placekitten.com/g/300/200" width="100%" height="100%"></bs-col></bs-row></div>`;

    const getProps = ({
        title = 'Prueba Html',
        html = mockWebComponent,
        heightMobile = 100,
        heightTablet = 100,
        heightDesktop = 100,
        hideAppMobile = false
    } = {}) => {
        return {
            id: 'featureId',
            customFields: {
                title,
                html,
                heightMobile,
                heightTablet,
                heightDesktop,
                hideAppMobile
            }
        };
    };

    describe('Tests variant HTML', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: true,
            renderables: [],
            layout: 'LN10-Home_Main',
            arcSite: 'la-nacion-ar'
        }));

        test('should return a pageBuilder error when the custom field "html" is empty', () => {
            render(<HtmlFeature {...getProps({ html: '' })} />);

            expect(
                screen.getByText('El campo "Tablero / HTML" es obligatorio')
            ).toBeDefined();
        });

        test('should return a pageBuilder Error when the note title is not defined', () => {
            render(<HtmlFeature {...getProps({ title: '' })} />);

            expect(
                screen.getByText(
                    'Debe proporcionar un título para el artículo.'
                )
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
                render(<HtmlFeature {...getProps(props)} />);

                expect(
                    screen.getByText(
                        'Debe definir altos para todos los dispositivos.'
                    )
                ).toBeDefined();
            }
        );

        test('should return a pageBuilder Error when the note title is not defined', () => {
            render(<HtmlFeature {...getProps({ title: '' })} />);

            expect(
                screen.getByText(
                    'Debe proporcionar un título para el artículo.'
                )
            ).toBeDefined();
        });

        test('should return a iframe with attributes loading, title and the web component defined in custom field "Tablero / html" ', () => {
            const baseStyles =
                '<style> html, body { width: 100%; height: 100%; overflow: hidden; }</style>';

            const { container } = render(
                <HtmlFeature
                    {...getProps({
                        html: mockWebComponent,
                        title: 'Title html'
                    })}
                />
            );

            const iframe = document.querySelector('iframe');
            const srcdoc = iframe.getAttribute('srcdoc');

            expect(iframe).toBeDefined();
            expect(iframe.getAttribute('title')).toStrictEqual('Title html');
            expect(iframe.getAttribute('loading')).toStrictEqual('lazy');
            expect(
                srcdoc.includes(
                    '<style> html, body { width: 100%; height: 100%; overflow: hidden; }</style>'
                )
            ).toBeTruthy();
            expect(srcdoc.includes(mockWebComponent)).toBeTruthy();

            expect(container).toMatchSnapshot();
        });

        test('should return component even if "hideAppMobile" is set to true.', () => {
            const baseStyles =
                '<style> html, body { width: 100%; height: 100%; overflow: hidden; }</style>';

            const { container } = render(
                <HtmlFeature
                    {...getProps({
                        html: mockWebComponent,
                        title: 'Title html',
                        hideAppMobile: true
                    })}
                />
            );

            const iframe = document.querySelector('iframe');
            const srcdoc = iframe.getAttribute('srcdoc');

            expect(iframe).toBeDefined();
            expect(iframe.getAttribute('title')).toStrictEqual('Title html');
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
