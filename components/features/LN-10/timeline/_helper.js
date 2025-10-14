import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import get from '../../../private/common/utils/get';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { isExternalUrl } from '../../../private/common/utils/isExternalUrl';
import { formatTimelineTime } from '../../common/timezone/utils/timezoneConversion';

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
