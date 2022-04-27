import addForwardSlash from '../../LN/common/utils/addForwardSlash';
import capitalizeFirstLetter from './capitalizeFirstLetter';

export const getSectionTitle = noteType => {
    if (Number(noteType) === 1) return 'Otras noticias de&nbsp;';
    if (Number(noteType) === 7) return 'Más recetas de&nbsp;';
    return 'Más notas de&nbsp;';
};

export const getTitle = (customFilter, subtype, link = {}) => {
    const { text, path } = link;
    if (customFilter === '1') {
        return `${getSectionTitle(subtype)}<a href='/tema/${addForwardSlash(
            path
        )}' class='com-link'>${capitalizeFirstLetter(text)}</a>`;
    }

    if (customFilter === '0') {
        return subtype === '7' ? 'Últimas Recetas' : 'Últimas Noticias';
    }

    return `Últimas notas de <a href='${addForwardSlash(
        path
    )}' class='com-link'> ${capitalizeFirstLetter(text)}</a>`;
};

export const FILTER_TYPES = {
    0: 'Ultimas Noticias',
    1: 'Por Tags'
};

export const getQuery = (filterType, subtype, customQuerys, tagId) =>
    filterType === '1'
        ? { tagId }
        : customQuerys[subtype] || customQuerys.default;
