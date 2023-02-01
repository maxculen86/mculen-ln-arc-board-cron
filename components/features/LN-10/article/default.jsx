/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import { Card } from '@ln/contenidos-ui-card';
import {
    getWithMedia,
    getWithSubhead,
    isInApertura,
    transform
} from '../../../private/LN/home/components/noteCard/noteCardHelper';
import getChainConfig, {
    getDataAuthor,
    checkForId,
    isBombaHidden,
    getMediaData,
    validateVariant,
    articleCustomFields,
    validateSubhead,
    validateArticleFeature,
    getBadgetConfig,
    getLiveblogTitles,
    validateMarqueeImg
} from './_helper';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import filter from '../../../../content/filters/LN/nota/articleAcu';
import filterImage from '../../../../content/filters/LN/home/imageFilter';
import filterVideo from '../../../../content/filters/LN/home/videoFilter';
import liveblogFilter from '../../../../content/filters/LN/home/LN10/liveblogFilter';
import { GetImage } from '../../../private/LN/common/utils/articuloHelper';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import { getPlaceholder } from '../../../private/LN/common/utils/cajaTemasPlaceholder';
import ErrorBoundary from '../../../private/common/ErrorBoundary';
import get from '../../../private/common/utils/get';
import isSSR from '../../../private/LN/common/utils/isSSR';
import '../../../../resources/packages/css/@ln/contenidos-ui-card/index.css';
import '../../../../resources/packages/css/@ln/common-ui-media/index.css';
import '../../../../resources/packages/css/@ln/common-ui-image/index.css';
import '../../../../resources/packages/css/@ln/common-ui-video/index.css';
import '../../../../resources/packages/css/@ln/common-ui-badge/index.css';

const ArticleFeature = ({
    id: featureId,
    customFields,
    customFields: {
        noteId: id,
        imageId,
        video: videoId,
        lead,
        title,
        authors,
        variant = 'regular',
        chapita,
        chapitaStyle
    }
}) => {
    const {
        isAdmin,
        arcSite,
        renderables,
        layout: layoutPageBuilder
    } = useAppContext();

    const { layoutsName = {} } = siteConfig || {};
    const { cajaTemaConfig } = getProperties(arcSite);

    const { config, index, layout, imageConfig } = getChainConfig(
        featureId,
        renderables,
        cajaTemaConfig
    );

    const onlyOneApeturaValidateForWWW =
        isBombaHidden(renderables) &&
        isInApertura({
            renderables,
            featureId,
            layoutsName,
            layoutPageBuilder,
            config
        });

    const isLiveblog = variant === 'liveblog';

    const articleContent = useContent({
        source: checkForId(id) ? 'articleSourceNota' : null,
        query: {
            id: checkForId(id),
            published: true,
            imageConfig,
            checkExclusiveAccess: false,
            isInApertura: onlyOneApeturaValidateForWWW,
            isAdmin,
            variant
        },
        staticMode: isSSR(),
        filter: isLiveblog ? liveblogFilter : filter
    });

    const image = GetImage({
        imageId,
        imageConfig,
        id,
        onlyOneApeturaValidateForWWW,
        isAdmin,
        filterImage
    });

    const article = transform(
        articleContent,
        customFields,
        image && image.promo_items
    );

    const withMedia = getWithMedia(customFields, config, article);
    const withSubhead = getWithSubhead(config, withMedia, customFields);
    // const isRenderAutor = getIsRenderAutor(customFields, layout);
    // const label = getLabel(article, customFields, withMedia, layout);
    // const layoutGrillaVideo = layout === 'grillaVideo1' && '--l';
    // const titleSizeNoMedia = !withMedia && get(config, 'titleSizeNoMedia');

    const videoBackground =
        useContent({
            source: checkForId(videoId) ? 'videoSource' : null,
            staticMode: isSSR(),
            query: {
                id: checkForId(videoId),
                website: 'la-nacion-ar',
                imageConfig,
                isInApertura: onlyOneApeturaValidateForWWW,
                isAdmin
            },
            filter: filterVideo
        }) || null;

    const error = validateArticleFeature({
        id,
        content: article,
        image,
        video: videoBackground,
        layout,
        imageId,
        videoId
    });

    const mediaData = getMediaData({
        article,
        video: videoBackground,
        customFields,
        image,
        layout
    });

    const { badgetStyle, badgetText } = getBadgetConfig(
        chapitaStyle,
        chapita,
        isLiveblog
    );

    const { url, marquesina } = getDataAuthor(article);
    const authorsQuantity = get(article, 'credits.by', []).length;

    if (isAdmin && !!error) {
        return (
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
        );
    }

    return (
        (!error && article && (
            <ErrorBoundary>
                <Card
                    withMedia={withMedia}
                    lead={lead || get(article, 'label.volanta.text')}
                    title={title || get(article, 'headlines.basic', 'titulo')}
                    titleTag={get(config, 'titleTag')}
                    href={get(article, 'website_url', '')}
                    subhead={validateSubhead(
                        config,
                        withSubhead,
                        variant,
                        article
                    )}
                    subheadTag={get(config, 'subheadTag')}
                    badgeText={badgetText}
                    badgeType={badgetStyle}
                    marquee={authors || marquesina}
                    marqueeImg={validateMarqueeImg({
                        config,
                        authorsQuantity,
                        imagAuthor: url
                    })}
                    mediaData={mediaData}
                    cardSize={get(config, 'cardSize', '')}
                    variant={validateVariant(variant, authorsQuantity)}
                    liveblogList={getLiveblogTitles(articleContent)}
                />
            </ErrorBoundary>
        )) ||
        getPlaceholder(layout, index)
    );
};

ArticleFeature.label = 'LN10 Articulo';

ArticleFeature.propTypes = {
    id: PropTypes.string.isRequired,
    tree: PropTypes.shape({
        children: PropTypes.array
    }).isRequired,
    customFields: PropTypes.shape({
        ...(articleCustomFields || {})
    }),
    searchableField: PropTypes.shape({
        imageId: PropTypes.string
    })
};

export default Consumer(ArticleFeature);
