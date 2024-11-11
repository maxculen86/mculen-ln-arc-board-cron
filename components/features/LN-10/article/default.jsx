/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { useAppContext, useComponentContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import { Card } from '@ln/contenidos-ui-card';
import { transform } from '../../../private/LN/home/components/noteCard/noteCardHelper';
import {
    getDataAuthor,
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
    isInApertura,
    checkForId
} from './common/_helper-WebApi';
import filter from '../../../../content/filters/LN/nota/articleAcu';
import filterImage from '../../../../content/filters/LN/home/imageFilter';
import videoFilterLN10 from '../../../../content/filters/LN/home/LN10/videoFilterLN10';
import liveblogFilter from '../../../../content/filters/LN/home/LN10/liveblogFilter';
import { GetImage } from '../../../private/LN/common/utils/articuloHelper';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import ErrorBoundary from '../../../private/common/ErrorBoundary';
import get from '../../../private/common/utils/get';
import isSSR from '../../../private/LN/common/utils/isSSR';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import isContentLabAt100 from '../../../chains/utils/isContentLabAt100';
import { LIVEBLOG } from '../../../private/common/utils/subtypes/subtypeHelper';
import { checkVariants } from '../../../chains/utils/_helpers';

function ArticleFeature({
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
}) {
    const { registerSuccessEvent } = useComponentContext();
    const articleId = checkForId(id);
    const {
        isAdmin,
        arcSite,
        renderables,
        layout: layoutPageBuilder
    } = useAppContext();

    const { layoutsName = {} } = siteConfig || {};

    const {
        config: initialConfig = {},
        index,
        layout,
        imageConfig,
        boxPosition,
        isBomba,
        chainId
    } = getChainConfig({ featureId, renderables });

    const extraOpts = getDataAttributesForViewability(
        articleId,
        boxPosition,
        index
    );
    const [config, setConfig] = useState(initialConfig);
    const onlyOneApeturaValidateForWWW = isInApertura({
        layoutPageBuilder,
        renderables,
        featureId,
        config,
        articlePosition: index
    });

    const isLiveblog = variant === 'liveblog';

    const hasVariants = checkVariants({
        renderables,
        featureId
    });

    const articleContent = useContent({
        source: articleId ? 'articleSourceNota' : null,
        query: {
            id: articleId,
            published: true,
            imageConfig,
            checkExclusiveAccess: false,
            isInApertura: onlyOneApeturaValidateForWWW,
            isAdmin,
            variant,
            isLiveblog,
            isHome: layoutPageBuilder === layoutsName.HomeLN10
        },
        staticMode: isSSR() && !hasVariants,
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

    const promoItems = image && image.promo_items;

    const article = transform(articleContent, customFields, promoItems);

    const withMedia = validateMedia(customFields, config, article);

    const withSubhead = validateSubhead(
        config,
        withMedia,
        customFields,
        variant
    );

    // TODO agregar test cuando se muestra video en article ln 10
    const videoBackground =
        useContent({
            source: checkForId(videoId) ? 'videosJwSource' : null,
            staticMode: isSSR(),
            query: {
                id: checkForId(videoId),
                website: 'la-nacion-ar',
                imageConfig,
                isInApertura: onlyOneApeturaValidateForWWW,
                isAdmin,
                arcSite
            },
            filter: videoFilterLN10
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
        hideBadget,
        isLoadWithPicture
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
        config,
        isAdmin,
        isLoadWithPicture
    });

    const typeOfMedia = getTypeOfMedia(customFields);

    const { badgetStyle, badgetText } = getBadgetConfig({
        article,
        style: chapitaStyle,
        text: chapita,
        isLiveblog: isLiveblog || get(article, 'subtype') === LIVEBLOG,
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
        !error &&
        article && (
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
                    cardSize={
                        isContentLabAt100(chainId, layout, renderables)
                            ? '4xl'
                            : cardSize
                    }
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
                    aspectRatio={get(config, 'aspectRatio', 'ratio-3-2')}
                    className={showExtraClass(
                        typeOfMedia,
                        className,
                        withMedia,
                        extraClass
                    )}
                    onClick={() => hasVariants && registerSuccessEvent()}
                />
            </ErrorBoundary>
        )
    );
}

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
