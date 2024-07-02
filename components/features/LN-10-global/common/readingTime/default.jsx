import React from 'react';
import { useAppContext } from 'fusion:context';
import { isExcludedSubtype, calcReadingMinutes } from './_helpers';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import get from '../../../../private/common/utils/get';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

const ReadingTime = () => {
    const { globalContent = {} } = useAppContext() || {};

    const wordCount = get(
        globalContent,
        'planning.story_length.word_count_actual',
        ''
    );
    const readingMinutes = calcReadingMinutes(wordCount);
    const formattedReadingTime = readingMinutes.toString().padStart(2, '0');

    const minuteOrMinutes = readingMinutes === 1 ? 'minuto' : 'minutos';
    const subtype = get(globalContent, 'subtype', '');

    const hasReadingTime = readingMinutes !== 0 && !isExcludedSubtype(subtype);

    if (!hasReadingTime) return <></>;
    return (
        <li className="reading-time flex bullet-sm-none ml-auto_max767 flex gap-2 ai-center">
            <Icon height={20}>
                <IconSprite name="timer" color />
            </Icon>
            <Text className="text-neutral-light-700">
                {formattedReadingTime}{' '}
                <span className="sm-none">{minuteOrMinutes} de lectura</span>
                <span className="sm-only">'</span>
            </Text>
        </li>
    );
};

export default ReadingTime;
