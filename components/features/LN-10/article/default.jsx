/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import { Card } from '@ln/contenidos-ui-card';
import { transform } from '../../../private/LN/home/components/noteCard/noteCardHelper';
import {
    getDataAuthor,
    checkForId,
    getMediaData,
    getDataAttributesForViewability,
    validateVariant,
    articleCustomFields,
    validateSubhead,
    showSubheadText,
    changeConfigForPB,
    getBadgetConfig,
    getLiveblogTitles,
    validateMedia,
    showSection,
    showExtraClass,
    getTypeOfMedia
} from './_helper';
import {
    getChainConfig,
    validateArticleFeature,
    isInApertura
} from './common/_helper-WebApi';
import filter from '../../../../content/filters/LN/nota/articleAcu';
import filterImage from '../../../../content/filters/LN/home/imageFilter';
import videoFilterLN10 from '../../../../content/filters/LN/home/LN10/videoFilterLN10';
import filterVideo from '../../../../content/filters/LN/home/videoFilter';
import liveblogFilter from '../../../../content/filters/LN/home/LN10/liveblogFilter';
import { GetImage } from '../../../private/LN/common/utils/articuloHelper';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import { getPlaceholder } from '../../../private/LN/common/utils/cajaTemasPlaceholder';
import ErrorBoundary from '../../../private/common/ErrorBoundary';
import get from '../../../private/common/utils/get';
import isSSR from '../../../private/LN/common/utils/isSSR';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import withResizerV2 from '../../../private/common/utils/image/enableResizerV2';
import '../../../../resources/packages/css/@ln/contenidos-ui-card/index.css';
import '../../../../resources/packages/css/@ln/common-ui-media/index.css';
import '../../../../resources/packages/css/@ln/common-ui-video/index.css';
import '../../../../resources/packages/css/@ln/common-ui-image/index.css';
import '../../../../resources/packages/css/@ln/common-ui-badge/index.css';

const ArticleFeature = ({
    id: featureId,
    customFields,
    searchableField,
    customFields: {
        noteId: id,
        imageId,
        video: videoId,
        lead,
        title,
        authors,
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
    const shouldUseV2 =
        withResizerV2 && layoutPageBuilder === layoutsName.HomeLN10;
    const {
        config: initialConfig = {},
        index,
        layout,
        imageConfig,
        boxPosition,
        isBomba
    } = getChainConfig(featureId, renderables, cajaTemaConfig);

    const extraOpts = getDataAttributesForViewability(id, boxPosition, index);
    const [config, setConfig] = useState(initialConfig);
    const onlyOneApeturaValidateForWWW = isInApertura({
        layoutPageBuilder,
        renderables,
        featureId,
        config,
        articlePosition: index
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
            variant,
            shouldUseV2,
            shouldUseV1: !shouldUseV2
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
        filterImage,
        shouldUseV2
    });

    const article = transform(
        articleContent,
        customFields,
        image && image.promo_items
    );

    const withMedia = validateMedia(customFields, config, article);

    const withSubhead = validateSubhead(
        config,
        withMedia,
        customFields,
        variant
    );

    const videoBackground =
        useContent({
            source: checkForId(videoId) ? 'videoSource' : null,
            staticMode: isSSR(),
            query: {
                id: checkForId(videoId),
                website: 'la-nacion-ar',
                imageConfig,
                isInApertura: onlyOneApeturaValidateForWWW,
                isAdmin,
                arcSite,
                shouldUseV2
            },
            filter: shouldUseV2 ? videoFilterLN10 : filterVideo
        }) || null;

    const {
        imagePosition,
        withSection,
        withMarquee,
        withMarqueeImg,
        extraClass,
        variantsDisabled,
        cardSize,
        className,
        hideBadget
    } = config || {};

    const error = validateArticleFeature({
        id,
        content: article,
        image,
        video: videoBackground,
        layout,
        imageId,
        videoId,
        config,
        variant,
        variantsDisabled,
        isBomba
    });

    useEffect(() => {
        if (isAdmin && !error) {
            changeConfigForPB({ setConfig, featureId, renderables });
        }
    }, [featureId, isAdmin, layout, renderables, error]);

    const mediaData = getMediaData({
        article,
        video: videoBackground,
        customFields,
        image,
        layout,
        renderables,
        shouldUseV2: withResizerV2
    });

    const typeOfMedia = getTypeOfMedia(customFields);

    const { badgetStyle, badgetText } = getBadgetConfig({
        style: chapitaStyle,
        text: chapita,
        isLiveblog,
        withMedia,
        typeOfMedia,
        hideBadget
    });

    const { marqueeImg, marquee, authorsQuantity } = getDataAuthor({
        article,
        variant,
        authors,
        hideAuthors,
        withMarquee,
        withMarqueeImg
    });

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
    return (
        (!error && article && (
            <ErrorBoundary>
                <Card
                    data-feature-id={featureId}
                    lead={lead || get(article, 'label.volanta.text')}
                    title={title || get(article, 'headlines.basic', 'titulo')}
                    titleTag={get(config, 'titleTag')}
                    href={get(article, 'website_url', '')}
                    withMedia={withMedia}
                    subheadTag={get(config, 'subheadTag')}
                    marquee={marquee}
                    marqueeImg={marqueeImg}
                    badgeText={badgetText}
                    badgeType={badgetStyle}
                    mediaData={mediaData}
                    cardSize={cardSize}
                    imagePosition={imagePosition}
                    section={showSection({
                        withSection,
                        article,
                        authors,
                        authorPhoto: marqueeImg
                    })}
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
                    variant={validateVariant(variant, authorsQuantity)}
                    liveblogList={getLiveblogTitles(articleContent)}
                    aspectRatio={get(config, 'aspectRatio', 'ar-picture')}
                    className={showExtraClass(
                        typeOfMedia,
                        className,
                        withMedia,
                        extraClass
                    )}
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
