import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MainHeader from '../../../../../components/private/LN10/mainHeader/';
import {
    setDesplegableData,
    logoCallback,
    RightOptions
} from '../../../../../components/private/LN10/mainHeader/_helper';

jest.mock('../../../../../components/private/LN10/mainHeader/_helper', () => ({
    ...jest.requireActual(
        '../../../../../components/private/LN10/mainHeader/_helper'
    ),
    setDesplegableData: jest.fn(),
    logoCallback: jest.fn()
}));

jest.mock(
    '../../../../../components/private/LN/common/utils/contextHelper',
    () => ({
        getLoginData: jest.fn()
    })
);

describe('Private - LN10 - MainHeader', () => {
    const mock = {
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

    test('should renders with empty state', () => {
        expect(render(<MainHeader />)).toBeTruthy();
    });

    test('should renders with LN logo', () => {
        const { container } = render(<MainHeader userType="logged" />);
        const logo = container.querySelector('.logo-header');

        fireEvent.click(logo);

        expect(logo).toBeInTheDocument();
        expect(logoCallback).toHaveBeenCalledTimes(1);
    });
});
