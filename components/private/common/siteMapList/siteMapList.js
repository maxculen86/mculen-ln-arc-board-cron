import { SITE_LANACION, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import siteMapList from './siteMapList.json';

export const replacePlaceholders = items => {
    return items.map(item => ({
        ...item,
        href: item.href
            .replace('{SITE_LANACION}', SITE_LANACION)
            .replace('{SITIO_SEGURO_REGISTRACION}', SITIO_SEGURO_REGISTRACION)
    }));
};

export const siteMapListSectionLink = siteMapList.map(section => ({
    ...section,
    items: replacePlaceholders(section.items)
}));
