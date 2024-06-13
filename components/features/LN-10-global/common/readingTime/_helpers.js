import {
    VIDEO,
    FOTOAL100,
    HTMLLIBRE,
    AGENCIA
} from '../../../../private/common/utils/subtypes/subtypeHelper';

const excludedSubtypes = [HTMLLIBRE, VIDEO, FOTOAL100, AGENCIA];

export const isExcludedSubtype = subtype => {
    return excludedSubtypes.includes(subtype);
};

export const calculateReadingTime = wordCountSummary => {
    const wordsPerMinute = 250;
    return Math.ceil(wordCountSummary / wordsPerMinute);
};
