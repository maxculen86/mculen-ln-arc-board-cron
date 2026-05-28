import { cx } from '@ln/ds-cva';
import get from '../../../../../components/private/common/utils/get';

export const VALID_SERVICE_ITEMS = [
    'bonos',
    'merval',
    'adrs',
    'riesgo-pais',
    'cedears',
    'etf'
];

export const HOME_SCHEMA_ITEMS = [
    { name: 'Índice Merval', isFirst: true },
    { name: 'Dólar MEP' },
    { name: 'Dow Jones' }
];

export const getAssetName = item => {
    const ticket = get(item, 'ticket', '');
    return ticket === 'RIESGO PAIS'
        ? 'Riesgo País Argentina'
        : get(item, 'ticket_name', '') || ticket;
};

export const formatDateISO = (fecha, hora) => {
    if (
        !fecha ||
        !hora ||
        typeof fecha !== 'string' ||
        typeof hora !== 'string'
    ) {
        return null;
    }
    const [hours, minutes] = hora.split(':');
    if (fecha.includes('-')) {
        return `${fecha}T${hours}:${minutes}:00-03:00`;
    }
    const [day, month, year] = fecha.split('/');
    return `${year}-${month}-${day}T${hours}:${minutes}:00-03:00`;
};

export const buildOrganizationSchema = (siteUrl, logoUrl, isHome = false) => ({
    '@type': ['NewsMediaOrganization', 'FinancialService'],
    '@id': `${siteUrl}#organization`,
    name: 'LA NACION',
    url: siteUrl,
    alternateName: 'LN',
    ...(isHome && {
        description: 'Últimas noticias de Argentina y el mundo – LA NACION',
        foundingDate: '1870-01-04'
    }),
    diversityPolicy: `${siteUrl}sociedad/diversidad-redaccion-nid2413327/`,
    ethicsPolicy: `${siteUrl}sociedad/la-nacion-mision-estructura-empresarial-principios-eticos-nid2393569/`,
    masthead: `${siteUrl}sociedad/equipo-editorial-la-nacion-nid2390490/`,
    publishingPrinciples: `${siteUrl}sociedad/los-veinte-20-principios-del-periodismo-la-nid2390521/`,
    verificationFactCheckingPolicy: `${siteUrl}sociedad/verificacion-chequeo-datos-nid2406825/`,
    logo: {
        '@type': 'ImageObject',
        url: logoUrl,
        ...(isHome && { height: 1280, width: 1280 })
    },
    sameAs: [
        'https://www.facebook.com/lanacion/',
        'https://www.instagram.com/lanacioncom/',
        'https://x.com/LANACION/'
    ]
});

export const buildBreadcrumbSchema = (siteUrl, pageUrl, breadcrumbName) => ({
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'LA NACION', item: siteUrl },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Economía',
            item: `${siteUrl}economia/`
        },
        {
            '@type': 'ListItem',
            position: 3,
            name: breadcrumbName,
            item: pageUrl
        }
    ]
});

const buildFinancialProduct = (name, isFirst = false) => ({
    '@type': 'FinancialProduct',
    name,
    ...(isFirst && { brand: { '@type': 'Brand', name: 'LA NACION' } })
});

export const buildItemListElement = (cotizaciones = []) =>
    [...cotizaciones]
        .sort((a, b) => getAssetName(a).localeCompare(getAssetName(b)))
        .map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: buildFinancialProduct(getAssetName(item), index === 0)
        }));

export const buildRiesgoPaisMainEntity = dataService => {
    const cotizaciones = get(dataService, 'cotizaciones', []);
    const riesgoPaisItem = cotizaciones.find(
        item => get(item, 'ticket', '') === 'RIESGO PAIS'
    );
    const cotizacionActual = riesgoPaisItem
        ? get(riesgoPaisItem, 'cotizacion_actual', '')
        : '';
    const varDiaria = riesgoPaisItem
        ? get(riesgoPaisItem, 'var_diaria', '')
        : '';
    const dateModified = formatDateISO(
        get(dataService, 'fecha_actualizacion', ''),
        get(dataService, 'hora_actualizacion', '')
    );

    const additionalProps = [
        varDiaria !== '' &&
            varDiaria !== null && {
                '@type': 'PropertyValue',
                name: 'Variación Diaria',
                value: `${varDiaria}%`
            },
        dateModified && {
            '@type': 'PropertyValue',
            name: 'Fecha de actualización',
            value: dateModified
        }
    ].filter(Boolean);

    return {
        '@type': 'FinancialProduct',
        name: 'Riesgo País Argentina',
        brand: { '@type': 'Brand', name: 'LA NACION' },
        ...(cotizacionActual !== '' &&
            cotizacionActual !== null && {
                offers: {
                    '@type': 'Offer',
                    price: cotizacionActual,
                    priceCurrency: 'puntos'
                }
            }),
        ...(additionalProps.length > 0 && {
            additionalProperty: additionalProps
        })
    };
};

export const buildWebPageSchema = (
    siteUrl,
    pageUrl,
    serviceItem,
    metaData,
    dataService
) => {
    const title = get(metaData, 'title', '');
    const description = get(metaData, 'description', '');
    const cotizaciones = get(dataService, 'cotizaciones', []);

    return {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        publisher: { '@id': `${siteUrl}#organization` },
        mainEntity:
            serviceItem === 'riesgo-pais'
                ? buildRiesgoPaisMainEntity(dataService)
                : {
                      '@type': 'ItemList',
                      name: title,
                      description,
                      itemListElement: buildItemListElement(cotizaciones)
                  }
    };
};

const metaDataByIndex = {
    bonos: {
        title: 'Cotización de Bonos Argentinos – LA NACION',
        description:
            'Seguí el valor de AE38, AL30, GD30 y los principales bonos soberanos. Variación diaria, mensual y anual.',
        breadcrumbName: 'Bonos'
    },
    merval: {
        title: 'Cotización del Merval hoy: Acciones y Panel Líder – LA NACION',
        description:
            'Seguí en tiempo real el índice Merval. Cotizaciones de las acciones del panel.',
        breadcrumbName: 'Merval'
    },
    adrs: {
        title: 'ADRs Argentinos en Nueva York: Cotizaciones y Precios – LA NACION',
        description:
            'Consultá el valor de las acciones argentinas que cotizan en Wall Street y otros mercados internacionales (NYSE y NASDAQ). Precios de GGAL, YPF, MELI y más en dólares.',
        breadcrumbName: 'ADRs'
    },
    'riesgo-pais': {
        title: 'Riesgo País hoy en Argentina: Valor y Evolución – LA NACION',
        description: 'Seguí el índice de Riesgo País y su variación diaria.',
        breadcrumbName: 'Riesgo País'
    },
    cedears: {
        title: 'CEDEARs: Cotizaciones de Acciones Extranjeras – LA NACION',
        description:
            'Precios de los Certificados de Depósito Argentinos (CEDEARs). Seguí a Apple, Tesla, Amazon y las principales empresas globales desde el mercado local.',
        breadcrumbName: 'CEDEARs'
    },
    default: {
        title: 'Índices Económicos – LA NACION',
        description:
            'Últimos valores de Merval, Dow Jones, Nasdaq, riesgo país y dólar.',
        breadcrumbName: 'Índices'
    }
};

export const getEconomicIndicesMetaData = serviceItem =>
    serviceItem
        ? get(metaDataByIndex, serviceItem, get(metaDataByIndex, 'default'))
        : get(metaDataByIndex, 'default');

export const sanitize = value => {
    if (value == null || value === '') return '-';

    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

export const formatNumber = value => {
    if (value === null || value === undefined || value === '') return '-';
    const num = parseFloat(value);
    if (Number.isNaN(num)) return '-';
    return num.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export const wrapStrong = value =>
    value === null || value === undefined || value === ''
        ? '-'
        : `<strong>${formatNumber(value)}</strong>`;

const INVERTED_VARIATION_TYPES = ['riesgo-pais'];

const getVariationClass = (value, tableType) => {
    if (!value) {
        return 'index-neutral';
    }
    const isColorInverted = INVERTED_VARIATION_TYPES.includes(tableType);
    const isPositive = isColorInverted ? value < 0 : value > 0;
    const arrowClass = value > 0 ? 'index-arrow-up' : 'index-arrow-down';
    const colorClass = isPositive ? 'index-positive' : 'index-negative';

    return cx(arrowClass, colorClass);
};
export const formatVariation = (value, tableType = '') => {
    const num = parseFloat(value);

    const isInvalid =
        value === null ||
        value === undefined ||
        value === '' ||
        Number.isNaN(num);

    const variantClass = getVariationClass(num, tableType);
    const text = isInvalid ? '-' : `${Math.abs(num).toFixed(1)} %`;

    return `<span class="${variantClass}">${text}</span>`;
};

export const HOME_FILTERS = {
    merval: cotizaciones =>
        [...cotizaciones]
            .sort(
                (a, b) =>
                    Math.abs(get(b, 'var_diaria', 0)) -
                    Math.abs(get(a, 'var_diaria', 0))
            )
            .slice(0, 5)
};

export const filterForHome = (cotizaciones, tableType) => {
    if (!Array.isArray(cotizaciones)) return [];
    const filterFn = get(HOME_FILTERS, tableType);
    return filterFn ? filterFn(cotizaciones) : cotizaciones;
};

export const transformInternals = (data, isHome) => {
    const tableType = get(data, 'tableType', '');
    const fechaActualizacion = get(data, 'fecha_actualizacion', '');
    const horaActualizacion = get(data, 'hora_actualizacion', '');
    const cotizaciones = get(data, 'cotizaciones', []);

    let items = cotizaciones.filter(
        item => get(item, 'habilitado', false) === true
    );
    if (isHome) {
        items = filterForHome(items, tableType);
    }

    const getTicketLabel = item =>
        get(item, 'ticket_name', '') || get(item, 'ticket', '');

    const itemsSortedByTicket = [...items].sort((itemA, itemB) =>
        getTicketLabel(itemA).localeCompare(getTicketLabel(itemB))
    );

    const rows = itemsSortedByTicket.map(item => [
        { _id: '', content: sanitize(getTicketLabel(item)), type: 'text' },
        {
            _id: '',
            content: wrapStrong(get(item, 'cotizacion_actual', '')),
            type: 'text'
        },
        {
            _id: '',
            content: formatNumber(get(item, 'cotizacion_cierre', '')),
            type: 'text'
        },
        {
            _id: '',
            content: formatVariation(get(item, 'var_diaria', ''), tableType),
            type: 'text'
        },
        {
            _id: '',
            content: formatVariation(get(item, 'var_semanal', ''), tableType),
            type: 'text'
        },
        {
            _id: '',
            content: formatVariation(get(item, 'var_mensual', ''), tableType),
            type: 'text'
        }
    ]);

    return {
        type: 'table',
        _id: '',
        tableType,
        fecha_actualizacion: fechaActualizacion,
        hora_actualizacion: horaActualizacion,
        header: [
            { _id: '', content: 'Descripción', type: 'text' },
            { _id: '', content: 'Última', type: 'text' },
            { _id: '', content: 'Anterior', type: 'text' },
            { _id: '', content: '% Día', type: 'text' },
            { _id: '', content: '% Semanal', type: 'text' },
            { _id: '', content: '% Mensual', type: 'text' }
        ],
        rows
    };
};
