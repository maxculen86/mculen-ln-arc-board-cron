/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import GrillaNotas from '../../private/LN/acumulado/grillaNotas';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';

function GrillaNotasFeature({ customFields: { typeArticle } }) {
    const { acumuladoGeneral, acumuladoColor } = useGlobalProviderAcu();
    const { cantidad_notas = 30 } = acumuladoGeneral;

    return <GrillaNotas size={cantidad_notas} typeArticle={typeArticle} />;
}

GrillaNotasFeature.label = 'LN-Acumulado-Grilla-Notas';
GrillaNotasFeature.propTypes = {
    customFields: PropTypes.shape({
        typeArticle: PropTypes.oneOf(['ArticleMain', 'ArticleTimeLine']).tag({
            defaultValue: 'ArticleMain',
            label: 'Tipo de articulo'
        }),
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' })
    }).isRequired
};

export default GrillaNotasFeature;
