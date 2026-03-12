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
import imageFilter from '../../../../content/filters/foodit/home/articleFoodit';
import videoFilter from '../../../../content/filters/foodit/home/videoArticleFoodit';
import videoJwFilter from '../../../../content/filters/foodit/videoJwFilter';

import fooditRules from '../../foodit-global/common/utils/fooditRules';
import get from '../../../private/common/utils/get';

import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import CommonCardFoodit from '../../foodit-global/common/CommonCardFoodit/foodit';
import getFooditMediaContent from '../../foodit-global/common/utils/mediaHelper';

const DEFAULT_LABEL = 'RECETA DEL DÍA';

function CardFoodit({ id: featureId, customFields }) {
    const { noteId: id, videoId, customTitle, label } = customFields;

    const articleId = checkForId(id);
    const validVideoId = checkForId(videoId);

    const { isAdmin, arcSite, renderables } = useAppContext();

    const { isOpening, layout } = getRenderablesData(renderables, featureId);

    const {
        openingImgConfig,
        layoutImgConfig,
        containerConfig,
        size = 'small',
        classNameChildren = ''
    } = fooditRules(layout);

    const imageConfig = isOpening ? openingImgConfig : layoutImgConfig;

    const articleContent = useContent({
        source: articleId ? 'fooditBaseArticleSource' : null,
        query: {
            id: articleId,
            published: true,
            website: arcSite,
            imageConfig,
            isInApertura: isOpening,
            isAdmin,
            checkExclusiveAccess: false
        },
        staticMode: true,
        filter: validVideoId ? videoFilter : imageFilter
    });

    const videoBackground = useContent({
        source: validVideoId ? 'fooditVideoSource' : null,
        query: {
            id: validVideoId,
            imageConfig,
            isInApertura: isOpening
        },
        staticMode: true,
        filter: videoJwFilter
    });

    const error = validateArticleFoodit({
        id,
        content: articleContent,
        videoId: validVideoId,
        imageConfig,
        video: videoBackground
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

    const media = getFooditMediaContent({
        image,
        video: validVideoId && videoBackground,
        isOpening,
        isAdmin
    });

    const finalLabel =
        isOpening && (!label || label.trim() === '') ? DEFAULT_LABEL : label;
    const isDayRecipeVariant =
        finalLabel === DEFAULT_LABEL || layout === 'bn_1_grid';

    return (
        <div className={staticContentClassName} key={featureId}>
            {!error && articleContent && (
                <CommonCardFoodit
                    articleId={articleId}
                    showTime={Boolean(time)}
                    time={time}
                    linksProps={{ href, title }}
                    size={!isOpening ? size : undefined}
                    container={isOpening ? containerConfig : 'grid'}
                    variant={isDayRecipeVariant ? 'day-recipe' : variant}
                    loading={isOpening ? 'eager' : 'lazy'}
                    fetchPriority={isOpening ? 'high' : 'low'}
                    tag={tag}
                    title={title}
                    label={finalLabel}
                    customTitle={customTitle}
                    author={author}
                    subtitle={
                        isOpening && get(articleContent, 'subheadlines.basic')
                    }
                    contentCode={contentCode}
                    isOpening={isOpening}
                    hasVideo={hasVideo}
                    {...media}
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
        videoId: PropTypes.string.tag({
            name: 'VideoJW',
            description: 'Ingrese aquí el ID del video',
            default: ''
        }),
        customTitle: PropTypes.string.tag({
            name: 'Título personalizado',
            description: 'Ingrese aquí el titulo personalizado',
            default: ''
        }),
        label: PropTypes.string.tag({
            name: 'Etiqueta portada',
            description:
                "El valor por defecto es 'Receta del día'. Máximo 32 caracteres.",
            default: DEFAULT_LABEL
        })
    }).isRequired
};

export default Consumer(CardFoodit);
