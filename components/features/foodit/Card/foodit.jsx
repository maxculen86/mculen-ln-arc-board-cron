import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';

import classNames from 'classnames';
import { checkForId } from '../../LN-10/article/common/_helper-WebApi';
import {
    getRenderablesData,
    transformArticleFoodit,
    validateArticleFoodit
} from '../../foodit-global/common/utils/notaFooditHelper';
import filter from '../../../../content/filters/foodit/home/articleFoodit';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../private/LN/common/utils/mediaHelper';
import fooditRules from '../../foodit-global/common/utils/fooditRules';
import get from '../../../private/common/utils/get';
import getImageAltText from '../../foodit-global/common/utils/getImageAltText';

import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import CommonCardFoodit from '../../foodit-global/common/CommonCardFoodit/foodit';

function CardFoodit({ id: featureId, customFields }) {
    const { noteId: id, isDayRecipe } = customFields;
    const articleId = checkForId(id);

    const { isAdmin, arcSite, renderables } = useAppContext();

    const { isOpening, layout } = getRenderablesData(renderables, featureId);

    const {
        openingImgConfig,
        layoutImgConfig,
        containerConfig,
        size = 'small',
        classNameChildren = ''
    } = fooditRules(layout);

    const articleContent = useContent({
        source: articleId ? 'fooditBaseArticleSource' : null,
        query: {
            id: articleId,
            published: true,
            website: arcSite,
            isInApertura: isOpening,
            isAdmin,
            imageConfig: isOpening ? openingImgConfig : layoutImgConfig,
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
        href,
        contentCode = '',
        hasVideo
    } = transformArticleFoodit(articleContent);

    const { url = '', resized_urls: resizedUrlImage = [] } = image;

    const { resizedUrl = '' } = getShortestImage(resizedUrlImage);

    return (
        <div className={staticContentClassName} key={featureId}>
            {!error && articleContent && (
                <CommonCardFoodit
                    articleId={articleId}
                    showTime={Boolean(time)}
                    time={time}
                    linksProps={{ href, title }}
                    size={!isOpening && size}
                    container={isOpening && containerConfig}
                    variant={
                        isDayRecipe || layout === 'bn_1_grid'
                            ? 'day-recipe'
                            : variant
                    }
                    src={resizedUrl || url}
                    alt={getImageAltText(image)}
                    sources={getImagesToLoadWithPicture(resizedUrlImage)}
                    loading={isOpening ? 'eager' : 'lazy'}
                    fetchPriority={isOpening ? 'high' : 'low'}
                    tag={tag}
                    title={title}
                    author={author}
                    subtitle={
                        isOpening && get(articleContent, 'subheadlines.basic')
                    }
                    contentCode={contentCode}
                    isOpening={isOpening}
                    hasVideo={hasVideo}
                />
            )}
        </div>
    );
}

CardFoodit.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        noteId: PropTypes.string.tag({
            name: 'ID de la nota',
            description: 'Ingrese aquí el id de la nota',
            default: ''
        }).isRequired,
        isDayRecipe: PropTypes.boolean.tag({
            name: 'Receta del día',
            description: 'Marque para seleccionar la receta del dia',
            defaultValue: false
        })
    }).isRequired
};

export default Consumer(CardFoodit);
