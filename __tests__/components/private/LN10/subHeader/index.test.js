import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SubHeader from '../../../../../components/private/LN10/subHeader/';
import {
    setDollarData,
    setAccessData
} from '../../../../../components/private/LN10/subHeader/_helper';

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

jest.mock('../../../../../components/private/LN10/subHeader/_helper', () => ({
    setDollarData: jest.fn(),
    setAccessData: jest.fn()
}));

describe('Private - LN10 - SubHeader', () => {
    const mock = {
        dollar: [
            {
                text: 'Dólar oficial',
                title: 'Dólar oficial',
                venta: '187,25',
                link: 'https://www.lanacion.com.ar/dolar-hoy/',
                callback: jest.fn()
            },
            {
                text: 'Dólar blue',
                title: 'Dólar blue',
                venta: '355,00',
                link: 'https://www.lanacion.com.ar/tema/dolar-blue-tid67294/',
                callback: jest.fn()
            },
            {
                text: 'Dólar turista',
                title: 'Dólar turista',
                venta: '374,5',
                link:
                    'https://www.lanacion.com.ar/tema/dolar-turista-tid67475/',
                callback: jest.fn()
            },
            {
                text: 'Dólar CCL',
                title: 'Dólar CCL',
                venta: '334,92',
                link: 'https://www.lanacion.com.ar/tema/dolar-ccl/',
                callback: jest.fn()
            }
        ],
        access: [
            {
                icon: 'bookmark',
                text: 'Mis notas',
                href: 'https://www.lanacion.com.ar/mis-notas/',
                callback: jest.fn()
            },
            {
                icon: 'emailOpen',
                text: 'Newsletters',
                href:
                    'https://newsletter.lanacion.com.ar/?_ga=2.113114052.1174706434.1669633950-901996504.1663609274',
                callback: jest.fn()
            },
            {
                icon: 'clubLnDefault',
                text: 'Club LA NACION',
                href:
                    'https://club.lanacion.com.ar/?_ga=2.113114052.1174706434.1669633950-901996504.1663609274',
                callback: jest.fn()
            }
        ]
    };

    test('should renders with dollar mock data', () => {
        setDollarData.mockImplementation(() => mock.dollar);

        const { getByText } = render(<SubHeader />);

        mock.dollar.forEach(dollar => {
            expect(getByText(dollar.title)).toBeInTheDocument();
            expect(getByText(dollar.title).getAttribute('href')).toEqual(
                dollar.link
            );
            expect(getByText(`$${dollar.venta}`)).toBeInTheDocument();
        });
    });

    test('should renders with access mock data', () => {
        setAccessData.mockImplementation(() => mock.access);

        const { getByText } = render(<SubHeader />);

        mock.access.forEach(access => {
            expect(getByText(access.text)).toBeInTheDocument();
            expect(getByText(access.text).getAttribute('href')).toEqual(
                access.href
            );
        });
    });

    test('should works okay with empty state', () => {
        setDollarData.mockImplementation(() => undefined);
        setAccessData.mockImplementation(() => undefined);

        expect(render(<SubHeader />)).toBeTruthy();
    });

    test('should executes callbacks when some elements are clicked', () => {
        setDollarData.mockImplementation(() => mock.dollar);
        setAccessData.mockImplementation(() => mock.access);

        const { getByText } = render(<SubHeader />);

        mock.dollar.forEach(dollar => {
            fireEvent.click(getByText(dollar.title));
            expect(dollar.callback).toHaveBeenCalledTimes(1);
        });

        mock.access.forEach(access => {
            fireEvent.click(getByText(access.text));
            expect(access.callback).toHaveBeenCalledTimes(1);
        });
    });
});
