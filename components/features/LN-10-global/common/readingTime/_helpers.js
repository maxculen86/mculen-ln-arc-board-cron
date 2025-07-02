import {
    VIDEO,
    FOTOAL100,
    HTMLLIBRE,
    AGENCIA
} from '../../../../private/common/utils/subtypes/subtypeHelper';

const excludedSubtypes = [HTMLLIBRE, VIDEO, FOTOAL100, AGENCIA];

export const isExcludedSubtype = subtype => excludedSubtypes.includes(subtype);

export const calcReadingMinutes = wordCount => {
    const wordsPerMinute = 200;
    const parseWordCount = parseInt(wordCount, 10);
    if (Number.isNaN(parseWordCount)) {
        return 0;
    }
    return Math.ceil(parseWordCount / wordsPerMinute);
};

export const countWords = (text = '') => {
    if (typeof text !== 'string') return 0;

    const matches = text.match(/\b[\w'-]+(?<![-'])\b/g);

    return matches ? matches.length : 0;
};

export const getRoundedWords = wordCount => {
    const parsed = parseInt(wordCount, 10);

    if (Number.isNaN(parsed)) return 0;

    if (parsed <= 100) return 100;

    const remainder = parsed % 100;
    const base = Math.floor(parsed / 100) * 100;

    return remainder <= 50 ? base : base + 100;
};

export const getWordsAndReadingTime = wordCount => ({
    words: getRoundedWords(wordCount),
    readingTime: calcReadingMinutes(wordCount).toString()
});
