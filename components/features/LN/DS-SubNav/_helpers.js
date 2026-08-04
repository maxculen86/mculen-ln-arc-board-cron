import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';
import capitalizeFirstLetter from '../../../private/common/utils/capitalizeFirstLetter';
import textSelector from '../../../private/common/utils/recetaDictionary';
import get from '../../../private/common/utils/get';
import { replaceUrlResizerToWWW } from '../../../private/common/utils/image/resizer/v2/resizerHelper';
import {
    getSectionClassName,
    revistas
} from '../../../layouts/LN-acumulado/helpers';

export const NAV_TYPES = {
    scroll: 'Scroll horizontal',
    collapsible: 'Colapsable',
    none: 'No mostrar'
};

export const DEFAULT_NAV_TYPE = 'scroll';

// TODO: copiado de components/features/LN-acumulado/titulo/_helpers.js
// (SOCIAL_MEDIA, SOCIAL_SLOTS, buildSocialCustomFields, getSocialsFromCustomFields).
// Este feature reemplaza al viejo LN-acumulado/titulo: cuando la migracion este
// completa en todas las pages, borrar el feature viejo (la duplicacion se va con el).
const SOCIAL_MEDIA = {
    instagram: {
        label: 'Instagram',
        icon: 'instagram'
    },
    tiktok: {
        label: 'TikTok',
        icon: 'tiktok'
    },
    whatsapp: {
        label: 'WhatsApp',
        icon: 'whatsapp'
    }
};
const SOCIAL_SLOTS = 3;

// Mapa valor -> label para el dropdown del admin (PropTypes.oneOf .tag labels).
const SOCIAL_MEDIA_LABELS = Object.fromEntries(
    Object.entries(SOCIAL_MEDIA).map(([key, { label }]) => [key, label])
);

export const buildSocialCustomFields = () =>
    Array.from({ length: SOCIAL_SLOTS }).reduce((acc, _, i) => {
        const n = i + 1;
        const group = `Red Social ${n}`;
        return {
            ...acc,
            [`socialMedia${n}`]: PropTypes.oneOf(Object.keys(SOCIAL_MEDIA)).tag(
                {
                    labels: SOCIAL_MEDIA_LABELS,
                    label: 'Red Social',
                    group
                }
            ),
            [`link${n}`]: PropTypes.string.tag({
                label: 'Enlace',
                group
            })
        };
    }, {});

export const getSocialsFromCustomFields = (customFields = {}) =>
    Array.from({ length: SOCIAL_SLOTS }, (_, i) => ({
        name: customFields[`socialMedia${i + 1}`],
        href: customFields[`link${i + 1}`],
        icon: SOCIAL_MEDIA[customFields[`socialMedia${i + 1}`]]?.icon
    })).filter(({ name, href, icon }) => name && href && icon);

// Titulos de display por seccion cuando el `name` crudo no sirve como titulo.
// Ej: /economia/indices llega como "Indices" (sin tilde); el label correcto es
// "Índices". Solo pisa el branch de seccion (replaceTitle/Payload tienen prioridad).
export const SECTION_TITLE_OVERRIDES = {
    '/economia/indices': 'Índices'
};

export const setTitle = (
    replaceTitle,
    { Payload, node_type: nodeType, name, byline, _id: id } = {}
) => {
    if (replaceTitle) return capitalizeFirstLetter(replaceTitle);
    if (Payload?.items?.[0]?.name) {
        return capitalizeFirstLetter(Payload.items[0].name);
    }
    if (nodeType === 'section') {
        return SECTION_TITLE_OVERRIDES[id] || capitalizeFirstLetter(name);
    }
    if (byline) return capitalizeFirstLetter(byline);
    return '';
};

export const setUrl = ({
    _id: id,
    canonical_url: canonicalUrl,
    node_type: nodeType
} = {}) => {
    if (nodeType === 'tags') return `${SITE_LANACION}${canonicalUrl || ''}`;
    if (nodeType === 'section') return `${SITE_LANACION}${id}/`;
    return SITE_LANACION;
};

export const getPrefixText = (isPrimarySec, title, url, prefixTitle) => {
    if (!prefixTitle || !title) return '';
    if (isPrimarySec || !url?.includes('/recetas')) return '';
    return `${prefixTitle} `;
};

export const buildCategories = navigationList => {
    if (!navigationList?.length) return null;

    return navigationList.filter(Boolean).map(item => {
        const {
            _id: id,
            navigation,
            name = '',
            node_type: nodeType,
            url: categoryUrl,
            display_name: displayName,
            parent
        } = item;

        const navTitle = navigation?.nav_title;
        const isLink = nodeType === 'link';
        const displayText = navTitle || (isLink && displayName) || name;
        const acuName = parent?.default || '';

        return {
            key: id,
            link: (isLink && categoryUrl) || `${id}/`,
            textname: displayText,
            title: acuName.includes('/recetas')
                ? `Ir a notas de ${textSelector(name)}`
                : `Ir a ${displayText}`
        };
    });
};

export const isPrimarySection = sectionId => {
    if (!sectionId) return false;
    return sectionId.split('/').filter(Boolean).length === 1;
};

const BRANDED_SECTIONS = new Set([
    'economia',
    'propiedades',
    'salud',
    'autos',
    'campo',
    'futuria',
    'que-sale',
    'deportes',
    // Revistas (resueltas via section_style_name)
    'living',
    'jardin',
    'hola',
    'lugares'
]);

export const getBrandFromSection = (sectionId = '', sectionStyleName = '') => {
    const section = revistas.includes(sectionStyleName)
        ? sectionStyleName
        : getSectionClassName(sectionId);
    return BRANDED_SECTIONS.has(section) ? section : 'none';
};

export const buildSubNavContentData = ({
    customFields,
    globalContent,
    navigation,
    isPrimary,
    logoImage,
    idLogoImage
}) => {
    const replaceTitle = get(customFields, 'replaceTitle', null);
    const prefixTitle = get(customFields, 'prefixTitle', null);
    const sectionId = get(globalContent, '_id', '');

    const title = setTitle(replaceTitle, globalContent);
    const url = setUrl(globalContent);
    const prefixText = getPrefixText(isPrimary, title, url, prefixTitle);
    const titleText = `${prefixText}${title}`;
    const categories = buildCategories(navigation);

    const wwwImage = replaceUrlResizerToWWW(logoImage || {});
    const {
        width,
        height,
        url: imageUrl,
        resized_urls: [firstResizedUrl] = []
    } = wwwImage || {};

    const resizedUrl = get(firstResizedUrl, 'resizedUrl', '');
    const { width: resizedWidth, height: resizedHeight } = get(
        firstResizedUrl,
        'option',
        {}
    );

    const imageWidth = resizedWidth || width;
    const imageHeight = resizedHeight || height;

    const hasValidDimensions =
        Number(imageWidth) > 0 && Number(imageHeight) > 0;

    return {
        sectionId,
        titleText,
        url,
        categories,
        hasLogo: Boolean(idLogoImage),
        isJuegosSection: sectionId === '/juegos',
        imageProps: {
            ...(hasValidDimensions && {
                width: imageWidth,
                height: imageHeight
            }),
            src: resizedUrl || imageUrl
        }
    };
};
