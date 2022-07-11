/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import Article from '../../../private/common/mod-article';
import ComTitle from '../../../private/common/com-title';
import useTimeline from '../../../private/LN/common/hooks/useTimeline';
import { cajaTemasCustomsFields } from '../../../private/LN/common/utils/cajaTemasHelper';
import {
    validateTL,
    tlSources
} from '../../../private/LN/common/utils/timeline';
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

const Timeline = ({ id: featureId, customFields = {}, ...restProps }) => {
    const {
        title: roof,
        url,
        hideTitle,
        source,
        sections,
        sectionTagValue,
        collectionId,
        ...restCustomFields
    } = customFields;

    const commonProps = {
        source,
        sections,
        sectionTagValue,
        collectionId
    };

    const { arcSite, isAdmin } = useAppContext();

    const articles = useTimeline({
        arcSite,
        filter,
        ...commonProps,
        ...restCustomFields
    });

    const withRoof = roof && !hideTitle;
    const error = validateTL({ articles, ...commonProps });

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

            {isAdmin && error && (
                <PageBuilderMessage
                    key={featureId}
                    type={error.type}
                    message={error.message}
                />
            )}

            {source &&
                articles.map(article => (
                    <Article
                        {...article}
                        boxPosition="tl"
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
        size: PropTypes.number.tag({
            label: 'Cantidad de notas',
            defaultValue: 5
        }),
        source: PropTypes.oneOf(Object.keys(tlSources)).tag({
            label: 'Fuente',
            description: 'Origen de datos para obtención de notas',
            labels: tlSources
        }).isRequired,
        sections: PropTypes.list.tag({
            label: 'Secciones',
            group: 'Últimas Noticias'
        }).isRequired,
        sectionTagType: PropTypes.oneOf(
            Object.keys({ tag: 'Tag', section: 'Sección' })
        ).tag({
            label: 'Tipo',
            defaultValue: 'Tag',
            group: 'Sección o Tag',
            labels: { tag: 'Tag', section: 'Sección' },
            description: 'Origen de datos para obtención de notas'
        }).isRequired,
        sectionTagValue: PropTypes.string.tag({
            name: 'Tag o Sección',
            description: 'Tag o sección para obtención de notas',
            defaultValue: '',
            group: 'Sección o Tag'
        }),
        collectionId: PropTypes.string.tag({
            name: 'ID collection',
            description: 'Id de la collection para obtención de notas',
            defaultValue: '',
            group: 'Collection'
        }),
        ...cajaTemaCustomFields
    }).isRequired
};

export default Timeline;
