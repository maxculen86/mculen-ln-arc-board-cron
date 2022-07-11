/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import Article from '../../../private/common/mod-article';
import ComTitle from '../../../private/common/com-title';
import useTimeline from '../../../private/LN/common/hooks/useTimeline';
import { cajaTemasCustomsFields } from '../../../private/LN/common/utils/cajaTemasHelper';
import filter from '../../../../content/filters/LN/acumulado/articleTimeline';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

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

    const articles = useTimeline({
        sections,
        filter,
        size,
        arcSite
    });

    const withRoof = roof && !hideTitle;

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

            {articles.map(article => (
                <Article
                    {...article}
                    // boxPosition="tl"
                    titleSize="--twoxs"
                    titleTag="h3"
                />
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
