/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import {
    validateArticleFeature,
    getCajaTemaConfig
} from '../../../private/LN/common/utils/cajaTemasHelper';
import NoteCard from '../../../private/LN/home/components/noteCard/noteCard';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const ArticleFeature2 = ({
    id: featureId,
    customFields,
    searchableField,
    customFields: { noteId: id, imageId }
}) => {
    const { isAdmin, arcSite, renderables, outputType } = useAppContext();
    const { cajaTemaConfig } = getProperties(arcSite);
    const articleProps = getCajaTemaConfig(
        featureId,
        renderables,
        cajaTemaConfig
    );
    const article = useContent({
        source: 'articleSourceNota',
        query: { id, published: true }
    });

    const image = useContent({
        source: 'relatedImageSource',
        query: { id: imageId, published: true }
    });

    const error = validateArticleFeature(id, article);
    // console.log(renderables);
    return (
        (isAdmin && !!error && (
            <div
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '100%'
                }}
            >
                <PageBuilderMessage
                    key={featureId}
                    type={error.type}
                    message={error.message}
                />
            </div>
        )) ||
        (!error && article && (
            <NoteCard
                id={featureId}
                article={article}
                promoItems={image && image.promo_items}
                articleProps={articleProps}
                customFields={customFields}
                outputType={outputType}
            />
        )) || <></>
    );
};

ArticleFeature2.label = 'LN Articulo2';

ArticleFeature2.propTypes = {
    id: PropTypes.string.isRequired,
    tree: PropTypes.shape({
        children: PropTypes.array
    }).isRequired,
    customFields: PropTypes.shape({
        noteId: PropTypes.string.tag({
            name: 'ID de la nota',
            description: 'Ingrese aquí el id de la nota',
            default: undefined,
            group: 'Ajustes Básicos'
        }).isRequired,
        title: PropTypes.string.tag({
            name: 'Título',
            description: 'Ingrese aquí el texto del título',
            default: undefined,
            group: 'Ajustes Básicos'
        }),
        lead: PropTypes.string.tag({
            name: 'Volanta',
            description: 'Ingrese aquí el texto de la volanta',
            group: 'Ajustes Básicos'
        }),
        imageId: PropTypes.string.tag({
            name: 'Foto',
            description: 'Ingrese aquí el id de la imagen en PhotoCenter',
            default: undefined,
            group: 'Ajustes Básicos'
        }),
        hideImage: PropTypes.bool.tag({
            name: 'Ocultar foto',
            description: 'Seleccione si no debe mostrarse la foto en la nota ',
            default: false,
            group: 'Ajustes Básicos'
        }),
        authors: PropTypes.string.tag({
            name: 'Firma',
            description: 'Ingrese aquí el texto de la marquesina',
            default: undefined,
            group: 'Ajustes Básicos'
        }),
        opinion: PropTypes.bool.tag({
            name: 'Nota Opinión',
            description: 'Seleccione si la nota debe mostrarse de tipo opinión',
            default: false,
            group: 'Ajustes Básicos'
        }),
        description: PropTypes.string.tag({
            name: 'Bajada',
            description: 'Ingrese aquí el texto de la bajada',
            default: undefined,
            group: 'Ajustes Extra'
        }),
        chapita: PropTypes.string.tag({
            name: 'Chapita',
            description: 'Ingrese aquí el texto de la chapita',
            default: undefined,
            group: 'Ajustes Extra'
        }),
        html: PropTypes.string.tag({
            name: 'Tablero / HTML',
            description: 'Ingrese aquí el html del tablero',
            default: undefined,
            group: 'Ajustes Extra'
        })
    }),
    searchableField: PropTypes.shape({
        imageId: PropTypes.string
    })
};

export default ArticleFeature2;
