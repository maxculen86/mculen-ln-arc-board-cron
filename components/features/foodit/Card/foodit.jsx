import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';

import { checkForId } from '../../LN-10/article/_helper';
import isSSR from '../../../private/LN/common/utils/isSSR';
import {
    isAperturaReceta,
    transformArticleReceta,
    validateArticleReceta
} from '../../foodit-global/common/utils/fooditArticleHelper.js';

import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import StaticValidation from '../../../private/common/staticValidation';
import { Card } from '@ln/recetas-ui-card';
import { Badge } from '@ln/recetas-ui-badge';

import filter from '../../../../content/filters/foodit/home/articleFoodit.js';
import { getImagesToLoadWithPicture } from '../../../private/LN/common/utils/mediaHelper';

const CardFoodit = ({ id: featureId, customFields: { noteId: id } }) => {
    const articleId = checkForId(id);

    const {
        isAdmin,
        arcSite,
        renderables
        // layout: layoutPageBuilder
    } = useAppContext();

    const isOpening = isAperturaReceta(renderables, featureId);

    // TODO: configurar imageConfig && size
    const imageConfig = 'm';
    const size = 'small';

    const articleContent = useContent({
        source: articleId ? 'articleSourceNota' : null,
        query: {
            id: articleId,
            published: true,
            website: arcSite,
            isInApertura: isOpening,
            isAdmin,
            imageConfig,
            checkExclusiveAccess: false,
            shouldUseV2: false,
            shouldUseV1: true
        },
        staticMode: isSSR(),
        filter
    });

    const error = validateArticleReceta({
        id,
        content: articleContent
    });

    if (isAdmin && !!error) {
        return (
            <article data-feature-id={featureId}>
                <WarningMessage
                    featureId={featureId}
                    type={error.type}
                    message={error.message}
                />
            </article>
        );
    }

    const {
        title,
        author,
        time,
        image,
        tag,
        variant,
        href
    } = transformArticleReceta(articleContent);

    const { alt_text, url, resized_urls } = image;

    return (
        (!error && articleContent && (
            <Card
                linkProps={{ href, title }}
                variant={isOpening ? 'day-recipe' : variant}
                {...(!isOpening ? { size } : {})}
            >
                <Card.Top>
                    <Card.Image
                        src={url}
                        alt={alt_text}
                        sources={getImagesToLoadWithPicture(resized_urls)}
                        loading={isOpening ? 'eager' : 'lazy'}
                        fetchPriority={isOpening ? 'high' : 'low'}
                    />
                    {!isOpening && tag && (
                        <Badge className="absolute bottom-0 right-0 m-8">
                            {tag}
                        </Badge>
                    )}
                </Card.Top>
                <Card.Main title={title}>
                    <Card.Footer
                        author={author}
                        buttonProps={{
                            title: 'Guardar receta',
                            fill: isOpening, // TODO: boolean cuando la receta está guardada
                            onClick: e => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('click button');
                            }
                        }}
                        {...(!isOpening ? { showTime: true, time: time } : {})}
                    />
                </Card.Main>
            </Card>
        )) || <></>
    );
};

CardFoodit.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        noteId: PropTypes.string.tag({
            name: 'ID de la nota',
            description: 'Ingrese aquí el id de la nota',
            default: ''
        }).isRequired
    })
};

export default Consumer(CardFoodit);
