/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import sectionsFormated from '../../private/common/utils/sectionsFormated';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import useGridPagination from '../../private/LN/common/hooks/useGridPagination';
import GrillaNotas from '../../private/LN/acumulado/grillaNotas/grillaNotas';
import checkHydrateOnly from '../../private/LN/common/utils/checkHydrateOnly';

const UltimasNoticias = props => {
    const { customFields } = props;
    const { sections, layout, size } = customFields;
    const globalProviderAcu = useGlobalProviderAcu();

    const {
        globalContent: { type, name, node_type: nodeType } = {},
        outputType,
        renderables
    } = useAppContext();

    const hasHydrateOnly = checkHydrateOnly({ nodeType });

    const grillaNotasProps = useGridPagination({
        sectionsIds: sectionsFormated(sections),
        sourceOrigin: 'composer',
        size,
        layout,
        type,
        outputType,
        renderables,
        ...globalProviderAcu
    });

    return (
        <GrillaNotas
            {...grillaNotasProps}
            name={name}
            hasHydrateOnly={hasHydrateOnly}
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
