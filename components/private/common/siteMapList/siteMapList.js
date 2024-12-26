import { SITE_LANACION, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import siteMapList from './siteMapList.json';

export const replacePlaceholders = items => {
    if (!items) return [];
    return items.map(item => ({
        ...item,
        href: item.href
            ? item.href
                  ?.replace('SITE_LANACION', SITE_LANACION)
                  ?.replace(
                      'SITIO_SEGURO_REGISTRACION',
                      SITIO_SEGURO_REGISTRACION
                  )
            : undefined
    }));
};

export const siteMapListSectionLink = siteMapList.map(section => ({
    ...section,
    sections: section.sections.map(sec => ({
        ...sec,
        list: replacePlaceholders(sec.list)
    }))
}));
