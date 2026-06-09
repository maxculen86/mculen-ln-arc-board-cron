export const getQueryForFilters = (filters = {}) => {
    const categorysGroup = Object.keys(filters).join('|');
    const filtersGroup = Object.keys(filters)
        .map(key => filters[key].map(value => `[${value}]`).join('^'))
        .join('|');
    if (categorysGroup && filtersGroup) {
        return `&facetedkey=${categorysGroup}&facetedvalue=${filtersGroup}`;
    }

    return '';
};

const pubDateLabels = {
    24: 'Últimas 24 horas',
    168: 'Última semana',
    720: 'Último mes',
    8760: 'Último año'
};

export const transformPubDateLabel = key => pubDateLabels[key] || key;

const namesGroups = {
    pubDate: 'FECHA',
    section: 'SECCIONES',
    creator: 'AUTOR'
};

export const transformListGroups = listFiltersGroups => {
    const { pubDate, section, creator } = listFiltersGroups || {};

    const resultGroups = { pubDate, section, creator };

    return Object.entries(resultGroups).reduce((acc, [key, value = []]) => {
        const name = namesGroups[key];
        if (name && value.length > 0) {
            acc.push({
                name,
                group: key,
                childrens: value.map(item => ({
                    ...item,
                    label:
                        key === 'pubDate'
                            ? transformPubDateLabel(item.key)
                            : item.key,
                    checked: false
                }))
            });
        }
        return acc;
    }, []);
};

export const parseInitialFiltersFromUrl = (fkey = '', fval = '') => {
    if (!fkey || !fval) return {};
    const keys = fkey.split('|');
    const values = fval.split('|');
    return keys.reduce((acc, key, i) => {
        const groupValues = values[i]?.split('^').filter(Boolean);
        if (key && groupValues?.length > 0) {
            acc[key] = groupValues;
        }
        return acc;
    }, {});
};

export const buildFilterUrlParams = (filters = {}) => {
    const keys = Object.keys(filters);
    if (keys.length === 0) return { fkey: null, fval: null };
    const fkey = keys.join('|');
    const fval = keys.map(k => filters[k].join('^')).join('|');
    return { fkey, fval };
};

export const checkStateCheckbox = ({
    checkboxes = [],
    group = '',
    filters = {}
}) =>
    checkboxes.map(filter => ({
        ...filter,
        checked: filters[group]?.includes(`${filter.key}`) || false
    }));
