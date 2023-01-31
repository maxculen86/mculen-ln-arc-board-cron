/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import { Card } from '@ln/contenidos-ui-card';
import { validateArticleFeature } from '../../../private/LN/common/utils/cajaTemasValidators';
import {
    getWithMedia,
    isInApertura,
    transform
} from '../../../private/LN/home/components/noteCard/noteCardHelper';
import getChainConfig, {
    getDataAuthor,
    checkForId,
    isBombaHidden,
    getMediaData,
    getDataAttributesForViewability,
    validateVariant,
    articleCustomFields,
    validateSubhead,
    showSubheadText
} from './_helper';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import filter from '../../../../content/filters/LN/nota/articleAcu';
import filterImage from '../../../../content/filters/LN/home/imageFilter';
import filterVideo from '../../../../content/filters/LN/home/videoFilter';
import { GetImage } from '../../../private/LN/common/utils/articuloHelper';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import { getPlaceholder } from '../../../private/LN/common/utils/cajaTemasPlaceholder';
import ErrorBoundary from '../../../private/common/ErrorBoundary';
import get from '../../../private/common/utils/get';
import isSSR from '../../../private/LN/common/utils/isSSR';
import '../../../../resources/packages/css/@ln/contenidos-ui-card/index.css';
import '../../../../resources/packages/css/@ln/common-ui-media/index.css';
import '../../../../resources/packages/css/@ln/common-ui-video/index.css';
import '../../../../resources/packages/css/@ln/common-ui-image/index.css';

const ArticleFeature = ({
    id: featureId,
    customFields,
    searchableField,
    customFields: {
        noteId: id,
        imageId,
        video: videoId,
        mobileImageId,
        lead,
        title,
        authors,
        hideImage,
        chapita,
        chapitaStyle,
        description,
        hideAuthors,
        variant = 'regular'
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

    const {
        config = {},
        index,
        layout,
        imageConfig,
        boxPosition
    } = getChainConfig(featureId, renderables, cajaTemaConfig);

    const extraOpts = getDataAttributesForViewability(id, boxPosition, index);

    const onlyOneApeturaValidateForWWW =
        isBombaHidden(renderables) &&
        isInApertura({
            renderables,
            featureId,
            layoutsName,
            layoutPageBuilder,
            config
        });

    const articleContent = useContent({
        source: checkForId(id) ? 'articleSourceNota' : null,
        query: {
            id: checkForId(id),
            published: true,
            imageConfig,
            checkExclusiveAccess: false,
            isInApertura: onlyOneApeturaValidateForWWW,
            isAdmin
        },
        staticMode: isSSR(),
        filter
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
    const withSubhead = validateSubhead(config, withMedia, customFields);
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

    const mobileImage = GetImage({
        imageId: mobileImageId,
        imageConfig: 'boxMultimediaMobile',
        id,
        onlyOneApeturaValidateForWWW,
        isAdmin,
        filterImage
    });

    const error = validateArticleFeature(
        id,
        article,
        image,
        videoBackground,
        layout,
        imageId,
        videoId,
        mobileImage,
        mobileImageId
    );

    const mediaData = getMediaData({
        article,
        video: videoBackground,
        customFields,
        image,
        layout
    });

    const { url, marquesina } = getDataAuthor(article);
    const { imagePosition, withSection, withMarquee, withMarqueeImg } = config;
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
                    lead={lead || get(article, 'label.volanta.text')}
                    title={title || get(article, 'headlines.basic', 'titulo')}
                    titleTag={get(config, 'titleTag')}
                    href={get(article, 'website_url', '')}
                    withMedia={!hideImage}
                    subheadTag={get(config, 'subheadTag')}
                    marquee={
                        withMarquee && !hideAuthors && (authors || marquesina)
                    }
                    marqueeImg={withMarqueeImg && authorsQuantity === 1 && url}
                    mediaData={mediaData}
                    cardSize={get(config, 'cardSize', '')}
                    imagePosition={imagePosition}
                    section={
                        withSection &&
                        get(article, 'taxonomy.primary_section.name')
                    }
                    searchableField={
                        layoutPageBuilder === layoutsName.HomeLN10 &&
                        searchableField({
                            imageId: '_id'
                        })
                    }
                    {...extraOpts}
                    subhead={showSubheadText({
                        description,
                        withSubhead,
                        article
                    })}
                    badgeText={chapita}
                    badgeType={chapitaStyle}
                    variant={validateVariant(variant, authorsQuantity)}
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
