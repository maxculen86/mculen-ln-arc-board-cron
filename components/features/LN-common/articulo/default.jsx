/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext, useComponentContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { validateArticleFeature } from '../../../private/LN/common/utils/cajaTemasValidators';
import {
    isInHomeAperturaOrBomba,
    isInApertura
} from '../../../private/LN/home/components/noteCard/noteCardHelper';
import getCajaTemaConfig from '../../../private/LN/home/components/noteCard/noteCardImageHelper';
import NoteCard from '../../../private/LN/home/components/noteCard/noteCard';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import filter from '../../../../content/filters/LN/nota/articleAcu';
import filterImage from '../../../../content/filters/LN/home/imageFilter';
import filterVideo from '../../../../content/filters/LN/home/videoFilter';
import featureArticleCustomsFields, {
    GetImage
} from '../../../private/LN/common/utils/articuloHelper';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import { getPlaceholder } from '../../../private/LN/common/utils/cajaTemasPlaceholder';
import { productClickFromClient } from '../../../private/common/utils/viewability';
import ErrorBoundary from '../../../private/common/ErrorBoundary';
import { getChildrenFromSectionHome } from '../../../private/LN/common/utils/cajaTemasHelper';
import get from '../../../private/common/utils/get';
import isSSR from '../../../private/LN/common/utils/isSSR';

const ArticleFeature = ({
    id: featureId,
    customFields,
    searchableField,
    customFields: { noteId: id, imageId, video: videoId, mobileImageId },
    isBomba = false
}) => {
    const {
        isAdmin,
        arcSite,
        renderables,
        outputType,
        layout: layoutPageBuilder
    } = useAppContext();

    const { layoutsName = {} } = siteConfig || {};
    const { cajaTemaConfig } = getProperties(arcSite);
    const { registerSuccessEvent } = useComponentContext();

    const {
        config,
        index,
        boxPosition,
        layout,
        imageConfig
    } = getCajaTemaConfig(featureId, renderables, cajaTemaConfig, isBomba);

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

    const article = useContent({
        source: (id && id.trim() && 'articleSourceNota') || null,
        query: {
            id: id && id.trim(),
            published: true,
            imageConfig,
            checkExclusiveAccess: false,
            isInApertura: onlyOneApeturaValidateForWWW,
            isAdmin
        },
        filter
    });

    const videoBackground =
        useContent({
            source: (videoId && videoId.trim() && 'videoSource') || null,
            staticMode: isSSR(),
            query: {
                id: videoId && videoId.trim(),
                website: 'la-nacion-ar',
                imageConfig,
                isInApertura: onlyOneApeturaValidateForWWW,
                isAdmin
            },
            filter: filterVideo
        }) || null;

    const image = GetImage({
        imageId,
        imageConfig,
        id,
        onlyOneApeturaValidateForWWW,
        isAdmin,
        filterImage
    });

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
                <NoteCard
                    id={featureId}
                    article={article}
                    promoItems={image && image.promo_items}
                    articleProps={config}
                    customFields={customFields}
                    outputType={outputType}
                    index={index}
                    boxPosition={boxPosition}
                    layout={layout}
                    isAdmin={isAdmin}
                    isInHomeAperturaOrBomba={isInHomeAperturaOrBomba(
                        renderables,
                        featureId,
                        layoutsName,
                        layoutPageBuilder
                    )}
                    videoBackground={videoBackground}
                    isPowa={layout === 'grillaVideo1'}
                    handleClick={productClickFromClient}
                    registerSuccessEvent={registerSuccessEvent}
                    mobileImage={mobileImage}
                />
            </ErrorBoundary>
        )) ||
        getPlaceholder(layout, index)
    );
};

ArticleFeature.label = 'LN Articulo';

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

export default ArticleFeature;
