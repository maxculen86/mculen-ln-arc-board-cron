import React from 'react';
import { formatDateHoursAndMint } from '../../../private/common/utils/dateAndTimeUtil';
import get from '../../../private/common/utils/get';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';

const setTimelineProps = ({ articles, roof, url, hideTitle }) => {
    const data = articles.map(article => {
        const {
            artPosition = '',
            cardVariant,
            titleText,
            lead,
            link
        } = article;

        const displayDate = get(article, 'hour.props.display_date', '');
        const articleId = get(article, 'articleData._id', '');

        return {
            dataId: articleId,
            dataNotaId: articleId,
            dataSource: 'editor',
            dataPos: `tl${artPosition}`,
            time: formatDateHoursAndMint(displayDate),
            title: titleText,
            href: link,
            lead,
            cardVariant
        };
    });

    const dataRoof = {
        ...(!hideTitle
            ? {
                  text: roof,
                  title: roof,
                  href: url,
                  icon: <IconSprite name="arrow" fill="#333" />
              }
            : {})
    };

    return {
        data,
        dataRoof
    };
};

export default setTimelineProps;
