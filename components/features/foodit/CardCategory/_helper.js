import { SITE_FOODIT } from 'fusion:environment';
import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

const cardRegistry = new Map();

const FILTERS_CONFIG = {
    facil: { slug: 'facil', label: 'fácil' },
    rapida: { slug: 'rapida', label: 'rápida' }
};

export const validateCardCategory = ({
    title = '',
    image = '',
    url = '',
    imageUrl,
    rapida = false,
    facil = false
}) => {
    const rules = [
        {
            validation: !title,
            message: 'Se requiere un titulo'
        },
        {
            validation: !image,
            message: 'Se requiere el id de una imagen'
        },
        {
            validation: !url,
            message: `Se requiere una url`
        },
        {
            validation: !imageUrl,
            message: 'No se encontro imagen'
        },
        {
            validation: rapida && facil,
            message: 'No se pueden aplicar ambos filtros'
        }
    ];

    return pageBuilderValidator(rules);
};

const getActiveFilter = ({ rapida, facil }) => {
    if (facil) return FILTERS_CONFIG.facil;
    if (rapida) return FILTERS_CONFIG.rapida;
    return null;
};

const appendSearchParam = (searchParams, key, value, separator = '|') => {
    const currentRaw = searchParams.get(key) || '';
    const values = currentRaw.split(separator).map(v => v.trim().toLowerCase());

    if (!values.includes(value.toLowerCase())) {
        const newValue = currentRaw
            ? `${currentRaw}${separator}${value}`
            : value;
        searchParams.set(key, newValue);
    }
};

const transformUrl = ({ url, filter }) => {
    if (!url) return url;

    try {
        const baseDomain = SITE_FOODIT || 'https://foodit.lanacion.com.ar';
        const parser = new URL(url, baseDomain);
        const relativePart = `${parser.pathname}${parser.search}${parser.hash}`;
        const urlObj = new URL(relativePart, baseDomain);

        if (!urlObj.pathname.includes('/tema/')) {
            return urlObj.toString();
        }

        if (!filter) {
            return urlObj.toString();
        }

        const { slug, label } = filter;

        let pathname = urlObj.pathname.replace(/\/$/, '');
        const hasTrailingSlash = urlObj.pathname.endsWith('/');

        const slugRegex = new RegExp(`-${slug}$`, 'i');
        if (!slugRegex.test(pathname)) {
            pathname = `${pathname}-${slug}`;
        }

        urlObj.pathname = hasTrailingSlash ? `${pathname}/` : pathname;

        appendSearchParam(urlObj.searchParams, 'groups', 'section');
        appendSearchParam(urlObj.searchParams, 'itemGroups', slug);
        appendSearchParam(urlObj.searchParams, 'title', label, ' ');

        return urlObj.toString();
    } catch (e) {
        console.error('[transformCategoryData] Failed to parse URL:', url, e);
        return url;
    }
};

export const transformCategoryData = ({ title, url, rapida, facil }) => {
    const activeFilter = getActiveFilter({ rapida, facil });

    const modifiedUrl = transformUrl({ url, filter: activeFilter });

    let modifiedTitle = title;

    if (activeFilter?.label) {
        const { label } = activeFilter;
        const labelRegex = new RegExp(`\\b${label}\\b`, 'i');

        if (title && !labelRegex.test(title)) {
            modifiedTitle = `${title} ${label}`;
        }
    }

    return {
        modifiedTitle,
        modifiedUrl
    };
};

export const registerCardIndex = featureId => {
    if (!cardRegistry.has(featureId)) {
        const currentIndex = cardRegistry.size;
        cardRegistry.set(featureId, currentIndex);
    }
    return cardRegistry.get(featureId);
};
