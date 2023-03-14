/* eslint-disable import/prefer-default-export */

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
    const defaultAccess = [
        {
            icon: 'bookmark',
            text: 'Mis notas',
            href: 'https://www.lanacion.com.ar/mis-notas/'
        },
        {
            icon: 'emailOpen',
            text: 'Newsletters',
            href:
                'https://newsletter.lanacion.com.ar/?_ga=2.113114052.1174706434.1669633950-901996504.1663609274'
        },
        {
            icon: 'clubLnDefault',
            text: 'Club LA NACION',
            href:
                'https://club.lanacion.com.ar/?_ga=2.113114052.1174706434.1669633950-901996504.1663609274'
        }
    ];

    return defaultAccess;
};
