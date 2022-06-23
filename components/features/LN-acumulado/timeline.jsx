/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import Article from '../../private/common/mod-article';
import ComHour from '../../private/common/com-hour';
import ComTitle from '../../private/common/com-title';
import sectionsFormated from '../../private/common/utils/sectionsFormated';
import useGetArticlesFromAcumSource from '../../private/LN/common/hooks/useGetArticlesFromAcumSource';
import { cajaTemasCustomsFields } from '../../private/LN/common/utils/cajaTemasHelper';
import filter from '../../../content/filters/LN/acumulado/articleTimeline';
import { LIVEBLOG } from '../../private/common/utils/subtypes/subtypeHelper';

const {
    layout,
    initialPosition,
    imageId,
    idCollection,
    hideCaja,
    ...cajaTemaCustomFields
} = cajaTemasCustomsFields('cajaManual');

const Timeline = ({ customFields = {} }) => {
    const { sections, title: roof, url, hideTitle } = customFields;
    const { arcSite } = useAppContext();

    const sectionsIds = sectionsFormated(sections);
    const withRoof = roof && !hideTitle;

    const searchArgs = {
        typesOfQuery: { sectionsIds },
        filter,
        imageConfig: 'm',
        size: 6,
        sourceOrigin: 'composer',
        excludeSectionId: false,
        type: 'story',
        shouldNotFilter: false,
        website: arcSite
    };

    const response = useGetArticlesFromAcumSource(...Object.values(searchArgs));
    const articles = response.map(article => {
        const {
            _id,
            headlines = {},
            display_date: displayDate,
            content_restrictions: contentRestrictions,
            subtype
        } = article;

        const isLiveblog = subtype === LIVEBLOG;

        return {
            key: _id,
            titleText: headlines.basic,
            hour: <ComHour display_date={displayDate} size="--fivexs" />,
            link: article.website_url,
            articleData: { content_restrictions: contentRestrictions },
            label: { ...(isLiveblog && { text: 'En Vivo' }) }
        };
    });

    return (
        <>
            {withRoof && (
                <ComTitle
                    tag="h2"
                    content={roof}
                    link={url}
                    classCondition="roof --m --sueca"
                />
            )}

            {articles.map(article => (
                <Article {...article} titleSize="--twoxs" />
            ))}
        </>
    );
};

Timeline.label = 'LN Timeline';

Timeline.propTypes = {
    customFields: PropTypes.shape({
        sections: PropTypes.list.tag({
            label: 'Secciones'
        }).isRequired,
        ...cajaTemaCustomFields
    }).isRequired
};

export default Timeline;
