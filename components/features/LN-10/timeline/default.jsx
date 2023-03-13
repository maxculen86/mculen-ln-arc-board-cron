/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Timeline } from '@ln/contenidos-ui-timeline';
import useTimeline from '../../../private/LN/common/hooks/useTimeline';
import { cajaTemasCustomsFields } from '../../../private/LN/common/utils/cajaTemasHelper';
import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import {
    tlSources,
    setTLValidationRules
} from '../../../private/LN/common/utils/timeline';
import filter from '../../../../content/filters/LN/acumulado/articleTimeline';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import setTimelineProps from './_helper';
import '../../../../resources/dist/css/ln/components/timeline.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-timeline/index.css';

const {
    layout,
    initialPosition,
    imageId,
    idCollection,
    hideCaja,
    ...cajaTemaCustomFields
} = cajaTemasCustomsFields('cajaManual');

const TimelineFeature = ({
    id: featureId,
    customFields = {},
    ...restProps
}) => {
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

    const rules = setTLValidationRules({ articles, ...commonProps });
    const error = pageBuilderValidator(rules);

    return (
        <>
            {isAdmin && error && (
                <PageBuilderMessage
                    key={featureId}
                    type={error.type}
                    message={error.message}
                />
            )}

            {source && (
                <Timeline
                    {...setTimelineProps({ articles, roof, url, hideTitle })}
                />
            )}
        </>
    );
};

TimelineFeature.label = 'LN10 Timeline';

TimelineFeature.propTypes = {
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

export default TimelineFeature;
