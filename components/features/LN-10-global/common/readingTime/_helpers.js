import {
    VIDEO,
    FOTOAL100,
    HTMLLIBRE,
    AGENCIA,
} from '../../../../private/common/utils/subtypes/subtypeHelper';

const excludedSubtypes = [HTMLLIBRE, VIDEO, FOTOAL100, AGENCIA];

export const isExcludedSubtype = (subtype) => {
    return excludedSubtypes.includes(subtype);
};

export const calcReadingMinutes = (wordCount) => {
    const wordsPerMinute = 200;
    const parseWordCount = parseInt(wordCount);
    if (isNaN(parseWordCount)) {
        return 0;
    }
    return Math.ceil(parseWordCount / wordsPerMinute);
};
