/* eslint-disable import/prefer-default-export */
import React from 'react';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export const setDollarData = dollarValue => {
    if (!dollarValue) return null;

    const INCLUDED_CURRENCIES = [
        'Dólar oficial',
        'Dólar blue',
        'Dólar turista',
        'Dólar CCL'
    ];

    const filteredCurrencies = dollarValue.filter(dollar =>
        INCLUDED_CURRENCIES.includes(dollar.titleMobile)
    );

    return filteredCurrencies.map(({ titleMobile, venta, link } = {}) => ({
        text: titleMobile,
        title: titleMobile,
        venta,
        link
    }));
};

export const setAccessData = () => {
    return [
        {
            icon: <IconSprite name="bookmark" critical />,
            text: 'Mis notas',
            href: 'https://www.lanacion.com.ar/mis-notas/'
        },
        {
            icon: <IconSprite name="emailOpen" critical />,
            text: 'Newsletters',
            href:
                'https://newsletter.lanacion.com.ar/?_ga=2.113114052.1174706434.1669633950-901996504.1663609274'
        },
        {
            icon: <IconSprite name="clubLnDefault" critical />,
            text: 'Club LA NACION',
            href:
                'https://club.lanacion.com.ar/?_ga=2.113114052.1174706434.1669633950-901996504.1663609274'
        }
    ];
};
