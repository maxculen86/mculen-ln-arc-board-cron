const decorator = (prefix, regex, replace, string) => {
    return regex && replace && string
        ? `${prefix}${string
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(regex, replace)}`
        : '';
};

export const getCategories = sections => {
    return sections && sections.length
        ? sections
              .map(section => decorator('ca_', /\W/g, '_', section.name))
              .join(',')
        : '';
};

export const getTags = tags => {
    return tags && tags.length
        ? tags.map(tag => decorator('te_', /\W/g, '_', tag.text)).join(',')
        : '';
};

export const getCustParamsEnconde = (tags, sections) => {
    const tagsFormated = getTags(tags);
    const categoriesFormated = getCategories(sections);
    const dataConcat = tagsFormated.concat(',', categoriesFormated);
    const dataEncoded =
        dataConcat.charAt(0) === ',' ? dataConcat.substring(1) : dataConcat;

    return dataEncoded.replace(/,/g, '%2C');
};
