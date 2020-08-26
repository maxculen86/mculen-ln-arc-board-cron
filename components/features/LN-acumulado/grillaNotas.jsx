import React from 'react';
import PropTypes from 'fusion:prop-types';

import GrillaNotas from '../../private/LN/acumulado/grillaNotas';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';

function GrillaNotasFeature({ customFields: { cantidadNotas, typeArticle } }) {
    const { acumuladoGeneral, acumuladoColor } = useGlobalProviderAcu();

    return <GrillaNotas size={cantidadNotas} typeArticle={typeArticle} />;
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
