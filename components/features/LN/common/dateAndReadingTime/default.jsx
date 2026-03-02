import React from 'react';
import Consumer from 'fusion:consumer';
import {
    getWordsAndReadingTime,
    countWords
} from '../../../LN-10-global/common/readingTime/_helpers';
import dateAndTimeUtil, {
    getUpdateDateMoreYears,
    getFormattedStringDate
} from '../../../../private/common/utils/dateAndTimeUtil';
import get from '../../../../private/common/utils/get';

function DateAndReadingTime({ globalContent }) {
    const subheadline = get(globalContent, 'subheadlines.basic', '');
    const headline = get(globalContent, 'headlines.basic', '');
    const displayDate = get(globalContent, 'display_date', '');
    const firtsPublishDate = get(globalContent, 'first_publish_date', '');
    const lastUpdatedDate = get(globalContent, 'last_updated_date', '');

    const subheadlineWordCount = countWords(subheadline);
    const headlineWordCount = countWords(headline);
    const bodyWordCount = get(
        globalContent,
        'planning.story_length.word_count_actual',
        ''
    );
    const totalWordCount =
        subheadlineWordCount + headlineWordCount + bodyWordCount;

    const { readingTime } = getWordsAndReadingTime(totalWordCount);

    const lastUpdatedResult = getUpdateDateMoreYears(
        firtsPublishDate,
        lastUpdatedDate
    );
    const { date, time } = dateAndTimeUtil(displayDate);
    const dateFormattedUpdate = getFormattedStringDate(lastUpdatedResult);

    return (
        <>
            <span>
                {date} * {time}
            </span>
            {readingTime && <span>{readingTime} minutos de lectura</span>}
            {dateFormattedUpdate && (
                <span>Actualizado el {dateFormattedUpdate}</span>
            )}
        </>
    );
}

export default Consumer(DateAndReadingTime);
