/* eslint-disable import/prefer-default-export */
export const createDynamicLabel = (text = '') => {
    return text
        .replace(/ /g, '_')
        .replace(/ó/g, 'o')
        .toLowerCase();
};

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
        link,
        callback: e => {
            e.preventDefault();
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'home_ln10',
                dynamic_category: 'header_dolar',
                dynamic_label: createDynamicLabel(titleMobile)
            });
        }
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

    return defaultAccess.map(access => ({
        ...access,
        callback: e => {
            e.prevenDefault();
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'home_ln10',
                dynamic_category: 'header_accesos',
                dynamic_label: createDynamicLabel(access.text)
            });
        }
    }));
};
