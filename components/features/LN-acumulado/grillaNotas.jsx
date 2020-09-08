/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
// import GrillaNotas from '../../private/LN/acumulado/grillaNotas';
import GrillaNotas from '../../private/LN/acumulado/grillaNotas/grillaNotas';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';

function GrillaNotasFeature({ customFields: { typeArticle } }) {
    const {
        acumuladoGeneral = {},
        articlesInCollection = {}
    } = useGlobalProviderAcu();
    const { cantidad_notas = 30, tipo_acumulado = 'Grilla' } = acumuladoGeneral;
    const {
        globalContent: { author_type: authorType, _id, Payload },
        siteProperties
    } = useAppContext();

    const tagId =
        Payload && Payload.items && Payload.items.length
            ? Payload.items[0].slug
            : undefined;

    const sectionId = !authorType && !Payload ? _id : null;
    const authorId = authorType ? _id : null;

    return (
        <GrillaNotas
            authorId={authorId}
            tagId={tagId}
            sectionId={sectionId}
            size={cantidad_notas}
            page={1}
            siteProperties={siteProperties}
            typeArticle={tipo_acumulado}
            articlesInCollection={articlesInCollection}
        />
    );
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
