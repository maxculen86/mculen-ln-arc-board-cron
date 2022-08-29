import React, { useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import GrillaNotas from '../../private/LN/acumulado/grillaNotas/grillaNotas';
import { GlobalContext } from '../../private/common/context/globalContext';
import sectionsFormated from '../../private/common/utils/sectionsFormated';

const UltimasNoticias = props => {
    const { customFields } = props;
    const { sections, layout, size } = customFields;
    const globalContext = useContext(GlobalContext);
    const { siteProperties, outputType } = useAppContext();

    return (
        <GrillaNotas
            sectionsIds={sectionsFormated(sections)}
            sourceOrigin="composer"
            size={size}
            page={1}
            siteProperties={siteProperties}
            typeArticle={layout}
            outputType={outputType}
            gc={globalContext}
        />
    );
};

UltimasNoticias.label = 'LN Acumulado Ultimas Noticias';

UltimasNoticias.propTypes = {
    customFields: PropTypes.shape({
        sections: PropTypes.list.tag({
            label: 'Secciones'
        }).isRequired,
        layout: PropTypes.oneOf(['Grilla', 'Timeline', 'Listados']).tag({
            label: 'Layout',
            defaultValue: 'Timeline'
        }),
        size: PropTypes.number.isRequired.tag({
            label: 'Cantidad de Notas',
            defaultValue: 30
        })
    }).isRequired
};

export default UltimasNoticias;
