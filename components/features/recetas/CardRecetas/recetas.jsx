import React, { useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';

import WarningMessage from '../../../private/common/warningMessage/warningMessage';

import { checkForId } from '../../LN-10/article/_helper';
import isSSR from '../../../private/LN/common/utils/isSSR';
import {
    isAperturaReceta,
    transformArticleReceta,
    validateArticleReceta
} from '../../../private/recetas/common/utils/notaRecetaHelper';
import { getImagesToLoadWithPicture } from '../../../private/LN/common/utils/mediaHelper';

import filter from '../../../../content/filters/receta/home/articleReceta.js';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';

const CardRecetas = ({ id: featureId, customFields: { noteId: id } }) => {
    const articleId = checkForId(id);

    const [article, setArticle] = useState({});

    const {
        isAdmin,
        arcSite,
        renderables
        // layout: layoutPageBuilder
    } = useAppContext();

    const isApertura = isAperturaReceta(renderables, featureId);

    // TODO: configurar imageConfig
    const imageConfig = 'm';

    const articleContent = useContent({
        source: articleId ? 'articleSourceNota' : null,
        query: {
            id: articleId,
            published: true,
            website: arcSite,
            isInApertura: isApertura,
            isAdmin,
            imageConfig,
            checkExclusiveAccess: false,
            shouldUseV2: true,
            shouldUseV1: false
        },
        staticMode: isSSR(),
        filter
    });

    // error handling

    const error = validateArticleReceta({
        id,
        content: articleContent
    });

    // useEffect(() => {
    //     if (isAdmin && !error) {
    //         console.log(' ES ADMIN Y NO HAY ERROR');
    //         setArticle(articleContent);
    //     }
    // }, [isAdmin, error, articleContent]);

    if (isAdmin && !!error) {
        return (
            <article data-feature-id={featureId}>
                <WarningMessage
                    key={featureId}
                    type={error.type}
                    message={error.message}
                />
            </article>
        );
    }

    const { title, author, time, image, tag } = transformArticleReceta(
        articleContent
    );
    const { width, alt_text, height, url, resized_urls } = image;

    return (
        (!error && articleContent && (
            <div>
                <div>
                    {tag && <p>{tag}</p>}
                    <Adaptableimage
                        width={width}
                        alt={alt_text}
                        height={height}
                        src={url}
                        className="com-image"
                        // searchableField={searchableField}
                        fetchPriority={isApertura ? 'high' : 'low'}
                        loading={isApertura ? 'eager' : 'lazy'}
                        sources={getImagesToLoadWithPicture(resized_urls)}
                    />
                </div>
                <div>
                    <h2>{title}</h2>
                    <div>
                        <h3>Por {author || 'Foodit'}</h3>
                        {time && <p>Tiempo de duracion: {time} min</p>}
                    </div>
                </div>
            </div>
        )) || <></>
    );
};

CardRecetas.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        noteId: PropTypes.string.tag({
            name: 'ID de la nota',
            description: 'Ingrese aquí el id de la nota',
            default: ''
        }).isRequired
    })
};

export default Consumer(CardRecetas);
