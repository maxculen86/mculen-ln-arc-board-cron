import React from 'react';
import { useAppContext } from 'fusion:context';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { cx } from '@ln/cva';
import { isExcludedSubtype, calcReadingMinutes, countWords } from './_helpers';
import get from '../../../../private/common/utils/get';

function ReadingTime({ isLight = false }) {
    const {
        deployment,
        contextPath,
        globalContent = {}
    } = useAppContext() || {};

    const subheadline = get(globalContent, 'subheadlines.basic', '');
    const headline = get(globalContent, 'headlines.basic', '');

    const subheadlineWordCount = countWords(subheadline);
    const headlineWordCount = countWords(headline);
    const bodyWordCount = get(
        globalContent,
        'planning.story_length.word_count_actual',
        ''
    );
    const totalWordCount =
        subheadlineWordCount + headlineWordCount + bodyWordCount;

    const readingMinutes = calcReadingMinutes(totalWordCount);
    const formattedReadingTime = readingMinutes.toString();

    const minuteOrMinutes = readingMinutes === 1 ? 'minuto' : 'minutos';
    const subtype = get(globalContent, 'subtype', '');

    const hasReadingTime = readingMinutes !== 0 && !isExcludedSubtype(subtype);

    const isLightImage = isLight ? '-white' : '';

    if (!hasReadingTime) return null;
    return (
        <li className="reading-time flex bullet-sm-none ml-auto_max767 flex gap-2 ai-center">
            <Icon height={20}>
                <Adaptableimage
                    src={deployment(
                        `${contextPath}/resources/images/svgDegrade/timer-ia${isLightImage}.webp`
                    )}
                    height={21}
                    alt="icono tiempo de lectura"
                />
            </Icon>
            <Text
                className={cx(
                    isLight ? 'text-neutral-light-1' : 'text-neutral-light-700'
                )}
            >
                {formattedReadingTime}{' '}
                <span className="sm-none">{minuteOrMinutes} de lectura</span>
                <span className="sm-only">&apos;</span>
            </Text>
        </li>
    );
}

export default ReadingTime;
