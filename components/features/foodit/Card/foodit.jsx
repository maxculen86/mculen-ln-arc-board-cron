import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';

import { checkForId } from '../../LN-10/article/common/_helper-WebApi.js';
import {
    getRenderablesData,
    transformArticleFoodit,
    validateArticleFoodit
} from '../../foodit-global/common/utils/notaFooditHelper.js';

import WarningMessage from '../../../private/common/warningMessage/warningMessage';

import filter from '../../../../content/filters/foodit/home/articleFoodit.js';
import { getImagesToLoadWithPicture } from '../../../private/LN/common/utils/mediaHelper';
import StaticContent from '../../../private/common/staticContent';
import fooditRules from '../../foodit-global/common/utils/fooditRules';
import classNames from 'classnames';
import CommonCardFoodit from '../../foodit-global/common/CommonCardFoodit/foodit.jsx';

const CardFoodit = ({ id: featureId, customFields: { noteId: id } }) => {
    const articleId = checkForId(id);

    const { isAdmin, arcSite, renderables } = useAppContext();

    const { isOpening, layout } = getRenderablesData(renderables, featureId);
    const {
        size = 'small',
        classNameChildren = '',
        layoutImgConfig
    } = fooditRules(layout);

    const articleContent = useContent({
        source: articleId ? 'fooditArticleSource' : null,
        query: {
            id: articleId,
            published: true,
            website: arcSite,
            isInApertura: isOpening,
            isAdmin,
            imageConfig: isOpening ? 'recipeDay' : layoutImgConfig,
            checkExclusiveAccess: false
        },
        staticMode: true,
        filter
    });

    const error = validateArticleFoodit({
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

    const staticContentClassName = classNames('hidden', classNameChildren);

    const {
        title,
        author,
        time,
        image,
        tag,
        variant,
        href
    } = transformArticleFoodit(articleContent);

    const { alt_text, url, resized_urls } = image;

    return (
        <StaticContent className={staticContentClassName} key={featureId}>
            {!error && articleContent && (
                <CommonCardFoodit
                    articleId={articleId}
                    showTime={!isOpening}
                    time={!isOpening && time}
                    linksProps={{ href, title }}
                    size={!isOpening && size}
                    variant={isOpening ? 'day-recipe' : variant}
                    src={url}
                    alt={alt_text}
                    sources={getImagesToLoadWithPicture(resized_urls)}
                    loading={isOpening ? 'eager' : 'lazy'}
                    fetchPriority={isOpening ? 'high' : 'low'}
                    tag={!isOpening && tag}
                    title={title}
                    author={author}
                    fill={isOpening} // TODO: boolean cuando la receta está guardada
                />
            )}
        </StaticContent>
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
