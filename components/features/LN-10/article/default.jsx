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
    getTypeOfMedia,
    getImageIdValidations,
    getCllBoard,
    shouldHighlightCustomVoice
} from './_helper';
import {
    getChainConfig,
    validateArticleFeature,
    isInApertura,
    checkForId
} from './common/_helper-WebApi';
import filter from '../../../../content/filters/LN/home/LN10/articleHomeBaseFilter';
import filterImage from '../../../../content/filters/LN/home/imageFilter';
import videoFilterLN10 from '../../../../content/filters/LN/home/LN10/videoFilterLN10';
import liveblogFilter from '../../../../content/filters/LN/home/LN10/liveblogFilter';
import { getImage } from '../../../private/LN/common/utils/articuloHelper';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import ErrorBoundary from '../../../private/common/ErrorBoundary';
import get from '../../../private/common/utils/get';
import isSSR from '../../../private/LN/common/utils/isSSR';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import isContentLabAt100 from '../../../chains/utils/isContentLabAt100';
import { LIVEBLOG } from '../../../private/common/utils/subtypes/subtypeHelper';
import { checkVariants } from '../../../chains/utils/_helpers';
import { isEmptyObject } from '../../../private/common/utils/isEmptyObject';
import MarqueeHighlight from '../../LN-10-global/common/marqueeHighlight/default';

function ArticleFeature({ id: featureId, customFields, searchableField }) {
    const {
        noteId: id,
        imageId,
        video: videoId,
        lead,
        html,
        title,
        authors,
        chapita,
        chapitaStyle,
        description,
        hideAuthors,
        variant = 'regular',
        cllBoard = '',
        videoComercial
    } = customFields ?? {};

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
    const isHtml = Boolean(html);

    const isVideo = Boolean(videoId);

    const isLiveblog = variant === 'liveblog';

    const isHome = layoutPageBuilder === layoutsName.HomeLN10;

    const hasVariants = checkVariants({
        renderables,
        featureId
    });

    const articleContent = useContent({
        source: articleId ? 'lnHomeBaseArticleSource' : null,
        query: {
            id: articleId,
            published: true,
            imageConfig,
            checkExclusiveAccess: false,
            isInApertura: onlyOneApeturaValidateForWWW,
            isAdmin,
            variant,
            isLiveblog
        },
        staticMode: isSSR() && !hasVariants,
        filter: isLiveblog ? liveblogFilter : filter
    });

    const resolveImageId = getImageIdValidations(isHtml, isVideo, imageId);

    const image = getImage({
        imageId: resolveImageId,
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
            source: checkForId(videoId) && !isHtml ? 'videosJwSource' : null,
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
        isBomba,
        chapita,
        cllBoard
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
        isHome,
        isLoadWithPicture
    });

    const typeOfMedia = getTypeOfMedia(customFields);

    const widgetOverlay = getCllBoard(cllBoard?.trim());

    const { badgetStyle, badgetText } = getBadgetConfig({
        article,
        style: chapitaStyle,
        text: chapita,
        isLiveblog: isLiveblog || get(article, 'subtype') === LIVEBLOG,
        withMedia,
        typeOfMedia,
        hideBadget: !isEmptyObject(widgetOverlay) || hideBadget
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

    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (!isAdmin && (!article || !articleContent)) return <></>;

    const hasCustomVoice = shouldHighlightCustomVoice(articleContent, config);

    const sectionText = hasCustomVoice ? (
        <MarqueeHighlight />
    ) : (
        showSection({
            withSection,
            article,
            authors,
            authorPhoto: marqueeImg
        })
    );

    return (
        !error && (
            <ErrorBoundary>
                <Card
                    data-testid={
                        videoComercial
                            ? 'vivoYoutube-container-article-disabled'
                            : null
                    }
                    data-feature-id={featureId}
                    lead={lead || get(article, 'label.volanta.text')}
                    title={title || get(article, 'headlines.basic', 'titulo')}
                    titleTag={get(config, 'titleTag')}
                    href={get(article, 'website_url', '')}
                    withMedia={withMedia}
                    subheadTag={get(config, 'subheadTag')}
                    marquee={marquee}
                    marqueeImg={marqueeImg}
                    marqueeAIHighlight={hasCustomVoice}
                    badgeText={badgetText}
                    badgeType={badgetStyle}
                    mediaData={mediaData}
                    widgetOverlay={widgetOverlay}
                    cardSize={
                        isContentLabAt100(chainId, layout, renderables)
                            ? '4xl'
                            : cardSize
                    }
                    imagePosition={imagePosition}
                    section={sectionText}
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
        noteId: articleCustomFields.noteId,
        title: articleCustomFields.title,
        lead: articleCustomFields.lead,
        imageId: articleCustomFields.imageId,
        hideImage: articleCustomFields.hideImage,
        authors: articleCustomFields.authors,
        hideAuthors: articleCustomFields.hideAuthors,
        hideFeature: articleCustomFields.hideFeature,
        description: articleCustomFields.description,
        hideDescription: articleCustomFields.hideDescription,
        chapita: articleCustomFields.chapita,
        chapitaStyle: articleCustomFields.chapitaStyle,
        video: articleCustomFields.video,
        html: articleCustomFields.html,
        videoComercial: articleCustomFields.videoComercial,
        cllBoard: articleCustomFields.cllBoard,
        variant: articleCustomFields.variant
    }).isRequired,
    searchableField: PropTypes.shape({
        imageId: PropTypes.string
    }).isRequired
};

export default Consumer(ArticleFeature);
