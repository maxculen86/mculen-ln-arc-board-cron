import get from './get';
import {
    calcReadingMinutes,
    countWords,
    isExcludedSubtype
} from '../../../features/LN-10-global/common/readingTime/_helpers';

const getReadingTimeData = (globalContent = {}) => {
    const subtitleText = get(globalContent, 'subheadlines.basic', '');
    const headlineText = get(globalContent, 'headlines.basic', '');
    const bodyWordCount = Number(
        get(globalContent, 'planning.story_length.word_count_actual', 0)
    );
    const subtype = get(globalContent, 'subtype', '');

    const totalWordCount =
        countWords(subtitleText) +
        countWords(headlineText) +
        (Number.isFinite(bodyWordCount) ? bodyWordCount : 0);

    const minutes = calcReadingMinutes(totalWordCount);
    const shouldShowReadingTime = minutes !== 0 && !isExcludedSubtype(subtype);

    if (!shouldShowReadingTime) return null;

    return {
        minutes: minutes.toString(),
        label: minutes === 1 ? 'minuto' : 'minutos'
    };
};

export default getReadingTimeData;
