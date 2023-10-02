import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {
    setDesplegableData,
    RightOptions,
    getTermicaValues
} from '../../../../../components/private/LN10/mainHeader/_helper';
import useTermica from '../../../../../components/private/common/hooks/useTermica';

jest.mock('../../../../../components/private/common/hooks/useTermica.js', () =>
    jest.fn()
);

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(() => ({
        state: {
            siteService: {
                termicas: [
                    { key: 'class_tooltip', value: 'TooltipClass' },
                    { key: 'tooltip_text', value: 'TooltipText' },
                    { key: 'button_text', value: 'ButtonText' },
                    { key: 'sticky_button_text', value: 'StickyButtonText' }
                ]
            }
        }
    }))
}));

describe('Private - LN10 - MainHeader - Helper =>', () => {
    describe('Helper - setDesplegableData', () => {
        test('should return a collection with specific data', () => {
            const desplegableData = setDesplegableData();

            expect(desplegableData).toHaveLength(5);

            desplegableData.forEach(option => {
                expect(Object.keys(option)).toEqual([
                    'url',
                    'text',
                    'title',
                    'target',
                    'callback'
                ]);
            });
        });
    });

    describe('Helper - RightOptions', () => {
        const mock = {
            userName: 'testuser@lanacion.com.ar',
            desplegable: [
                {
                    url: 'https://www.lanacion.com.ar/mis-notas/',
                    text: 'Mis notas mock',
                    title: 'Ir a mis notas',
                    target: '_self',
                    callback: jest.fn()
                },
                {
                    url: 'https://myaccount.lanacion.com.ar/mi-usuario/',
                    text: 'Mi cuenta',
                    title: 'Ir a mi cuenta',
                    target: '_self',
                    callback: jest.fn()
                },
                {
                    url: 'https://myaccount.lanacion.com.ar/datos-personales/',
                    text: 'Mis datos',
                    title: 'Ir a mis datos',
                    target: '_self',
                    callback: jest.fn()
                },
                {
                    url: 'https://micuenta.lanacion.com.ar/mis-suscripciones/',
                    text: 'Mis suscripciones',
                    title: 'Ir a mis suscripciones',
                    target: '_self',
                    callback: jest.fn()
                },
                {
                    url: '#',
                    text: 'Cerrar sesión',
                    title: 'Cerrar sesión',
                    target: '_self',
                    callback: jest.fn()
                }
            ]
        };

        test('should return menu user and avatar when userType is subscribed', () => {
            const { container, getByText } = render(
                <RightOptions
                    userType="subscribed"
                    userName={mock.userName}
                    initials={mock.userName.substring(0, 2)}
                    desplegableData={mock.desplegable}
                    loggedIn
                />
            );

            const initials = container.querySelector('.avatar > .ln-text');
            const desplegable = container.querySelector('.desplegable');

            expect(getByText('Suscriptor digital')).toBeInTheDocument();
            expect(desplegable).toBeInTheDocument();
            expect(getByText(mock.userName)).toBeInTheDocument();
            expect(initials.textContent).toEqual(mock.userName.substring(0, 2));
        });

        test('should return menu user, subscribe button and avatar when userType is logged', () => {
            const { container, getByText } = render(
                <RightOptions
                    userType="logged"
                    userName={mock.userName}
                    desplegableData={mock.desplegable}
                    loggedIn
                />
            );

            const desplegable = container.querySelector('.desplegable');

            expect(getByText('Sin suscripción digital')).toBeInTheDocument();
            expect(desplegable).toBeInTheDocument();
            expect(getByText(mock.userName)).toBeInTheDocument();
        });

        test('should return menu user, login button and subscribe buton when userType is unlogged', () => {
            useTermica.mockImplementation(() => false);
            const { container, getByText } = render(
                <RightOptions userType="unlogged" loggedIn={false} />
            );

            const subscribeButtons = screen.getAllByText('SUSCRIBITE');

            expect(subscribeButtons.length).toBeGreaterThan(0);

            subscribeButtons.forEach(button => {
                expect(button).toBeInTheDocument();
            });

            const stickySubscribeButton = container.querySelector(
                '#sticky-button-text'
            );
            expect(stickySubscribeButton.textContent).toBe('SUSCRIBITE');

            const loginButton = screen.getByText('INICIAR SESIÓN');
            expect(loginButton).toBeInTheDocument();

            const desplegable = container.querySelector('.desplegable');
            expect(desplegable).not.toBeInTheDocument();
        });

        test('should execute callbacks when some elements are moused down', () => {
            const { getByText } = render(
                <RightOptions
                    userType="subscribed"
                    userName={mock.userName}
                    desplegableData={mock.desplegable}
                />
            );

            mock.desplegable.forEach(option => {
                fireEvent.mouseDown(getByText(option.text));
                expect(option.callback).toHaveBeenCalledTimes(1);
            });
        });

        test('should hide subscribe button is hasSubscribeButton prop is falsy', () => {
            const { container } = render(
                <RightOptions
                    userType="logged"
                    userName={mock.userName}
                    desplegableData={mock.desplegable}
                    hasSubscribeButton={false}
                />
            );

            const subscribeButton = container.querySelector('#btnsuscribite');
            expect(subscribeButton.getAttribute('class')).toContain('none');
        });

        test('should return  button_text,sticky_button_text with dynamic text based on buttonSuscribe', () => {
            useTermica.mockImplementation(() => true);
            render(<RightOptions userType="unlogged" loggedIn={false} />);

            const buttonElement = document.querySelector('#btnsuscribite');
            const stickyButtonElement = document.querySelector(
                '#sticky-button-text'
            );

            // Verifica que los elementos estén presentes en el DOM
            expect(buttonElement).toBeInTheDocument();
            expect(stickyButtonElement).toBeInTheDocument();
        });
    });
});

describe('getTermicaValues function', () => {
    it('should never return undefined for specified property names', () => {
        const propertyNames = [
            'class_tooltip',
            'tooltip_text',
            'button_text',
            'sticky_button_text'
        ];

        // Call the getTermicaValues function
        const termicaValues = getTermicaValues(propertyNames);

        // Iterate through the extracted values and ensure none of them are undefined
        propertyNames.map(propertyName => {
            expect(termicaValues[propertyName]).not.toBeUndefined();
        });
    });
});
