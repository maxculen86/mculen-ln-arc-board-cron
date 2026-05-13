import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import {
    getWordsAndReadingTime,
    countWords
} from '../../../LN-10-global/common/readingTime/_helpers';
import dateAndTimeUtil from '../../../../private/common/utils/dateAndTimeUtil';
import get from '../../../../private/common/utils/get';
import Icon from '../../../ui/ln/icon/default';

function DateAndReadingTime({ globalContent }) {
    const subheadline = get(globalContent, 'subheadlines.basic', '');
    const headline = get(globalContent, 'headlines.basic', '');
    const displayDate = get(globalContent, 'display_date', '');

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
    const { date, time } = dateAndTimeUtil(displayDate);

    return (
        <Static id="LN-fecha-nota" htmlOnly>
            <div className="flex items-center gap-8 justify-center text-body-sm text-base-light flex-wrap">
                <time
                    dateTime={displayDate}
                    className="flex items-center gap-8"
                >
                    <span>{date}</span>
                    <Icon name="bullet-filled" size={12} />
                    <span>{time}</span>
                </time>
                {readingTime && (
                    <>
                        <Icon
                            name="bullet-filled"
                            size={12}
                            className="hidden md:block"
                        />
                        <span className="flex items-center gap-4">
                            <Icon name="time" size={16} />
                            {readingTime}&apos;
                            <span className="hidden md:inline">
                                {readingTime === '1' ? 'minuto' : 'minutos'} de
                                lectura
                            </span>
                        </span>
                    </>
                )}
            </div>
        </Static>
    );
}

export default Consumer(DateAndReadingTime);
