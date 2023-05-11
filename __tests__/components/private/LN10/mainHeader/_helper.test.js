import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {
    setDesplegableData,
    RightOptions
} from '../../../../../components/private/LN10/mainHeader/_helper';

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

        test('should return menu user and avatar when userType is suscribed', () => {
            const { container, getByText } = render(
                <RightOptions
                    userType="suscribed"
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

        test('should return menu user, suscribe button and avatar when userType is logged', () => {
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
            expect(getByText('SUSCRIBITE')).toBeInTheDocument();
            expect(desplegable).toBeInTheDocument();
            expect(getByText(mock.userName)).toBeInTheDocument();
        });

        test('should return menu user, login button and suscribe buton when userType is unlogged', () => {
            const { container, getByText } = render(
                <RightOptions userType="unlogged" loggedIn={false} />
            );
            const desplegable = container.querySelector('.desplegable');

            expect(getByText('SUSCRIBITE')).toBeInTheDocument();
            expect(getByText('INICIAR SESIÓN')).toBeInTheDocument();

            expect(desplegable).not.toBeInTheDocument();
        });

        test('should execute callbacks when some elements are moused down', () => {
            const { getByText } = render(
                <RightOptions
                    userType="suscribed"
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
            expect(subscribeButton.getAttribute('class')).toContain('--none');
        });
    });
});
