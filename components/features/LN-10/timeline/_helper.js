import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import get from '../../../private/common/utils/get';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { isExternalUrl } from '../../../private/common/utils/isExternalUrl';

const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 24 * MINUTES_PER_HOUR;

const isIsoUtc = iso => typeof iso === 'string' && iso.endsWith('Z');
const getOffsetTail = iso => (typeof iso === 'string' ? iso.slice(-6) : '');
const getSignedOffsetMinutes = tail => {
    if (!/^[+-]\d{2}:\d{2}$/.test(tail)) return null;
    const sign = tail[0] === '-' ? -1 : 1;
    const hours = Number(tail.slice(1, 3));
    const minutes = Number(tail.slice(4, 6));
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
    return sign * (hours * MINUTES_PER_HOUR + minutes);
};

const wrapDayMinutes = total =>
    ((total % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;

const toUtcMinutes = iso => {
    if (typeof iso !== 'string') return null;
    const hours = Number(iso.slice(11, 13));
    const minutes = Number(iso.slice(14, 16));
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

    const local = hours * MINUTES_PER_HOUR + minutes;
    if (isIsoUtc(iso)) return local;

    const offset = getSignedOffsetMinutes(getOffsetTail(iso));
    if (offset == null) return local;

    return wrapDayMinutes(local - offset);
};

const utcToGmt3Minutes = utc => wrapDayMinutes(utc - 180);

const minutesToHHMM = total => {
    const hours = Math.floor(total / MINUTES_PER_HOUR);
    const minutes = total % MINUTES_PER_HOUR;
    const HH = `00${hours}`.slice(-2);
    const MM = `00${minutes}`.slice(-2);
    return `${HH}:${MM}`;
};

const formatTimelineTime = dateInput => {
    if (!dateInput) return '';

    const utcMinutes = toUtcMinutes(dateInput);
    if (utcMinutes == null) return '';

    const adjusted = utcToGmt3Minutes(utcMinutes);
    return minutesToHHMM(adjusted);
};

const setTimelineProps = ({ articles, roof, url, hideTitle }) => {
    const data = articles.map(article => {
        const {
            artPosition = '',
            cardVariant,
            titleText,
            lead,
            link
        } = article;

        const displayDate =
            get(article, 'originalDisplayDate', '') ||
            get(article, 'hour.props.display_date', '');
        const articleId = get(article, 'articleData._id', '');

        return {
            dataId: articleId,
            dataNotaId: articleId,
            dataSource: 'editor',
            dataPos: `tl${artPosition}`,
            time: formatTimelineTime(displayDate),
            title: titleText,
            href: link,
            lead,
            cardVariant
        };
    });

    const isExternal = isExternalUrl(url, SITE_LANACION);

    const dataRoof = {
        ...(!hideTitle
            ? {
                  text: roof,
                  title: roof,
                  href: url,
                  icon: url ? <IconSprite name="arrow" fill="#333" /> : null,
                  target: isExternal ? '_blank' : '_self',
                  rel: isExternal ? 'noopener noreferrer nofollow' : undefined
              }
            : {})
    };

    return {
        data,
        dataRoof
    };
};

export default setTimelineProps;
