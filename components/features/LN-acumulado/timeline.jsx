import React, { useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import GrillaNotas from '../../private/LN/acumulado/grillaNotas/grillaNotas';
import { GlobalContext } from '../../private/common/context/globalContext';

export const sectionsFormated = sections =>
    sections
        ? JSON.stringify(sections)
              .replace('/,/g', '+OR+')
              .replace('[', '(')
              .replace(']', ')')
        : '';

const Timeline = props => {
    const { customFields } = props;
    const { sections, size } = customFields;
    const { siteProperties, outputType } = useAppContext();
    const globalContext = useContext(GlobalContext);
    const sectionsIds = sectionsFormated(sections);

    return (
        <GrillaNotas
            sectionsIds={sectionsIds}
            sourceOrigin="composer"
            size={size}
            page={1}
            siteProperties={siteProperties}
            typeArticle="Grilla"
            outputType={outputType}
            gc={globalContext}
        />
    );
};

Timeline.label = 'LN Acumulado Timeline';

Timeline.propTypes = {
    customFields: PropTypes.shape({
        sections: PropTypes.list.tag({
            label: 'Secciones'
        }).isRequired,
        size: PropTypes.number.isRequired.tag({
            label: 'Cantidad de Notas',
            defaultValue: 30
        })
    }).isRequired
};

export default Timeline;
