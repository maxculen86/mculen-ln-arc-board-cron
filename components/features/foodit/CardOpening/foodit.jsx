import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import { checkForId } from '../../LN-10/article/common/_helper-WebApi';
import {
    transformArticleFoodit,
    validateArticleFoodit
} from '../../foodit-global/common/utils/notaFooditHelper';
import imageFilter from '../../../../content/filters/foodit/home/articleFoodit';
import videoFilter from '../../../../content/filters/foodit/home/videoArticleFoodit';
import videoJwFilter from '../../../../content/filters/foodit/videoJwFilter';

import get from '../../../private/common/utils/get';

import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import CommonCardFoodit from '../../foodit-global/common/CommonCardFoodit/foodit';
import getFooditMediaContent from '../../foodit-global/common/utils/mediaHelper';

function CardOpeningFoodit({ id: featureId, customFields }) {
    const {
        noteId: id,
        isDayRecipe,
        videoId,
        customTitle,
        hideCaja
    } = customFields;

    const articleId = checkForId(id);
    const validVideoId = checkForId(videoId);

    const { isAdmin, arcSite } = useAppContext();

    const containerConfig = 'opening-alone';
    const imageConfig = 'recipeDay';

    const articleContent = useContent({
        source: articleId ? 'fooditBaseArticleSource' : null,
        query: {
            id: articleId,
            published: true,
            website: arcSite,
            imageConfig,
            isInApertura: true,
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
            imageConfig
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

    if (hideCaja) return React.Fragment;

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
        href,
        contentCode = '',
        hasVideo
    } = transformArticleFoodit(articleContent);

    const media = getFooditMediaContent({
        image,
        video: validVideoId && videoBackground,
        isOpening: true,
        isAdmin
    });

    return (
        <Static id={featureId}>
            {!error && articleContent && (
                <CommonCardFoodit
                    articleId={articleId}
                    showTime={Boolean(time)}
                    time={time}
                    linksProps={{ href, title }}
                    size={false}
                    container={containerConfig}
                    variant={isDayRecipe ? 'day-recipe' : variant}
                    loading="eager"
                    fetchPriority="high"
                    tag={tag}
                    title={title}
                    customTitle={customTitle}
                    author={author}
                    subtitle={get(articleContent, 'subheadlines.basic')}
                    contentCode={contentCode}
                    isOpening
                    hasVideo={hasVideo}
                    {...media}
                />
            )}
        </Static>
    );
}

CardOpeningFoodit.propTypes = {
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
        }),
        videoId: PropTypes.string.tag({
            name: 'VideoJW',
            description: 'Ingrese aquí el ID del video',
            default: ''
        }),
        hideCaja: PropTypes.boolean.tag({
            name: 'Ocultar caja de apertura',
            description: 'Marque para ocultar la caja de apertura',
            defaultValue: false
        }),
        customTitle: PropTypes.string.tag({
            name: 'Título personalizado',
            description: 'Ingrese aquí el titulo personalizado',
            default: ''
        })
    }).isRequired
};

export default Consumer(CardOpeningFoodit);
