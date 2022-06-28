/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import Article from '../../private/common/mod-article';
import ComHour from '../../private/common/com-hour';
import ComTitle from '../../private/common/com-title';
import sectionsFormated from '../../private/common/utils/sectionsFormated';
import useTimeline from '../../private/LN/common/hooks/useTimeline';
import { cajaTemasCustomsFields } from '../../private/LN/common/utils/cajaTemasHelper';
import {
    setTLQuantity,
    setTLArticles
} from '../../private/LN/common/utils/timeline';
import filter from '../../../content/filters/LN/acumulado/articleTimeline';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const {
    layout,
    initialPosition,
    imageId,
    idCollection,
    hideCaja,
    ...cajaTemaCustomFields
} = cajaTemasCustomsFields('cajaManual');

const Timeline = ({ id: featureId, customFields = {} }) => {
    const { sections, title: roof, url, hideTitle, size = 5 } = customFields;
    const { arcSite, isAdmin } = useAppContext();

    const sectionsIds = sectionsFormated(sections);
    const { articlesQuantity, articlesQuantityBackup } = setTLQuantity(size);
    const withRoof = roof && !hideTitle;

    const articlesResponse = useTimeline({
        sectionsIds,
        filter,
        articlesQuantity,
        articlesQuantityBackup,
        arcSite
    });

    const articles = setTLArticles(articlesResponse);

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

            {isAdmin && !articles.length && (
                <PageBuilderMessage
                    key={featureId}
                    type="warning"
                    message="No se encontraron notas"
                />
            )}

            {articles.map((article, index) => (
                <Article {...article} boxPosition="tl" titleSize="--twoxs" />
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
        size: PropTypes.number.tag({
            label: 'Cantidad de notas',
            defaultValue: 5
        }),
        ...cajaTemaCustomFields
    }).isRequired
};

export default Timeline;
