import React from 'react';
import { useAppContext } from 'fusion:context';
import { isExcludedSubtype, calculateReadingTime } from './_helpers';
import get from '../../../../private/common/utils/get';

const ReadingTime = () => {
    const { globalContent = {} } = useAppContext() || {};

    const wordCountSummary = get(
        globalContent,
        'planning.story_length.word_count_actual',
        ''
    );

    const subtype = get(globalContent, 'subtype', '');
    const parseCountSummary = parseInt(wordCountSummary);

    if (isExcludedSubtype(subtype)) {
        return null;
    }

    const readingTime = calculateReadingTime(parseCountSummary);
    const formattedReadingTime = readingTime.toString().padStart(2, '0');

    return (
        <div className="reading-time">
            {formattedReadingTime} minutos de lectura
        </div>
    );
};

export default ReadingTime;
