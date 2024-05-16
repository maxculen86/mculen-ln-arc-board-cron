/* eslint-disable import/prefer-default-export */

export const setDollarData = dollarValue => {
    if (!dollarValue) return null;

    const INCLUDED_CURRENCIES = [
        'Dólar oficial',
        'Dólar blue',
        'Dólar turista',
        'Dólar CCL',
        'Dólar MEP'
    ];

    const TITLE_TRANSFORMATIONS = {
        'Dólar MEP': 'Dólar mep'
    };

    const filteredCurrencies = dollarValue
        .filter(dollar => INCLUDED_CURRENCIES.includes(dollar.titleMobile))
        .sort(
            (a, b) =>
                INCLUDED_CURRENCIES.indexOf(a.titleMobile) -
                INCLUDED_CURRENCIES.indexOf(b.titleMobile)
        );

    return filteredCurrencies.map(({ titleMobile, venta, link } = {}) => {
        const transformedTitle =
            TITLE_TRANSFORMATIONS[titleMobile] || titleMobile;
        return {
            text: transformedTitle,
            title: transformedTitle,
            venta,
            link
        };
    });
};

export const setAccessData = () => {
    return [
        {
            text: 'LN juegos',
            href: 'https://www.lanacion.com.ar/juegos/'
        },
        {
            text: 'Suscriptores',
            href: 'https://www.lanacion.com.ar/suscriptores/'
        },
        {
            text: 'Newsletters',
            href:
                'https://newsletter.lanacion.com.ar/?_ga=2.115587013.2111665650.1713785519-1414281100.1711030569'
        }
    ];
};
