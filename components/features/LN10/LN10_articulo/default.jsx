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
    getIsRenderAutor,
    getWithMedia,
    getWithSubhead,
    isInApertura,
    transform
} from '../../../private/LN/home/components/noteCard/noteCardHelper';
import getCajaTemaConfig from '../../../private/LN/home/components/noteCard/noteCardImageHelper';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import filter from '../../../../content/filters/LN/nota/articleAcu';
import filterImage from '../../../../content/filters/LN/home/imageFilter';
import filterVideo from '../../../../content/filters/LN/home/videoFilter';
import featureArticleCustomsFields, {
    GetImage
} from '../../../private/LN/common/utils/articuloHelper';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import { getPlaceholder } from '../../../private/LN/common/utils/cajaTemasPlaceholder';
import ErrorBoundary from '../../../private/common/ErrorBoundary';
import { getChildrenFromSectionHome } from '../../../private/LN/common/utils/cajaTemasHelper';
import get from '../../../private/common/utils/get';
import isSSR from '../../../private/LN/common/utils/isSSR';
import { getViewport } from '../../../private/LN/common/utils/homeHelper';
import getMediaData from '../../../private/LN/common/utils/modArticleHelper';
import '../../../../resources/packages/css/@ln/contenidos-ui-card/index.css';
import '../../../../resources/packages/css/@ln/common-ui-media/index.css';
import '../../../../resources/packages/css/@ln/common-ui-image/index.css';

const ArticleFeature = ({
    id: featureId,
    customFields,
    customFields: {
        noteId: id,
        imageId,
        video: videoId,
        mobileImageId,
        lead,
        title,
        authors
    },
    isBomba = false
}) => {
    const {
        isAdmin,
        arcSite,
        renderables,
        layout: layoutPageBuilder
    } = useAppContext();

    const { layoutsName = {} } = siteConfig || {};
    const { cajaTemaConfig } = getProperties(arcSite);

    const { config, index, layout, imageConfig } = getCajaTemaConfig(
        featureId,
        renderables,
        cajaTemaConfig,
        isBomba
    );

    const isBombaHidden = () => {
        const bomba = getChildrenFromSectionHome(renderables, 'Bomba', 2) || [];
        return get(bomba[0], 'props.customFields.hideFeature', false);
    };

    const onlyOneApeturaValidateForWWW =
        isBomba ||
        (isBombaHidden() &&
            isInApertura({
                renderables,
                featureId,
                layoutsName,
                layoutPageBuilder,
                config
            }));

    const checkForId = idValue => {
        return idValue && idValue.trim();
    };

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
    const withSubhead = getWithSubhead(config, withMedia, customFields);
    const isRenderAutor = getIsRenderAutor(customFields, layout);
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
    const { device } = getViewport();

    const { mediaData } = getMediaData(
        videoBackground,
        device,
        mobileImage,
        layout,
        isRenderAutor,
        layout && layout.includes('author'),
        article
    );
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
                    href={get(article, 'website_url', '')}
                    src={get(article, 'promo_items.basic.url', '')}
                    subhead={
                        get(config, 'skipSubhead', false)
                            ? false
                            : withSubhead && get(article, 'subheadlines.basic')
                    }
                    marquee={authors}
                    mediaData={mediaData}
                    srcset={get(article, 'promo_items.basic.resized_urls', [])}
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
        ...(featureArticleCustomsFields('articuloGeneral') || {})
    }),
    searchableField: PropTypes.shape({
        imageId: PropTypes.string
    })
};

export default Consumer(ArticleFeature);
