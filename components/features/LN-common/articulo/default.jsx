/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext, useComponentContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import { validateArticleFeature } from '../../../private/LN/common/utils/cajaTemasValidators';
import { isImageEager } from '../../../private/LN/home/components/noteCard/noteCardHelper';
import NoteCard from '../../../private/LN/home/components/noteCard/noteCard';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import filter from '../../../../content/filters/LN/nota/articleAcu';
import filterImage from '../../../../content/filters/LN/home/imageFilter';
import filterVideo from '../../../../content/filters/LN/home/videoFilter';
import featureArticleCustomsFields, {
    getImage
} from '../../../private/LN/common/utils/articuloHelper';
import { productClickFromClient } from '../../../private/common/utils/viewability';
import ErrorBoundary from '../../../private/common/ErrorBoundary';
import isSSR from '../../../private/LN/common/utils/isSSR';
import { getChainConfig } from '../../LN-10/article/common/_helper-WebApi';
import useTermica from '../../../private/common/hooks/useTermica';

function ArticleFeature({
    id: featureId,
    customFields,
    customFields: { noteId: id, imageId, video: videoId, mobileImageId },
    isBomba = false
}) {
    const { isAdmin, arcSite, renderables, outputType } = useAppContext();

    const { cajaTemaConfig } = getProperties(arcSite);
    const { registerSuccessEvent } = useComponentContext();
    const termicaCajaSegmentada = useTermica('caja_segmentada');

    const { config, index, boxPosition, layout, imageConfig } = getChainConfig({
        isBomba,
        featureId,
        renderables,
        cajaTemaConfig,
        termicaCajaSegmentada
    });

    const checkForId = idValue => idValue && idValue.trim();

    const article = useContent({
        source: checkForId(id) ? 'lnHomeBaseArticleSource' : null,
        query: {
            id: checkForId(id),
            published: true,
            imageConfig,
            checkExclusiveAccess: false,
            isAdmin
        },
        staticMode: isSSR(),
        filter
    });

    const isEager = isImageEager(id, renderables);

    const videoBackground =
        useContent({
            source: checkForId(videoId) ? 'videoSource' : null,
            staticMode: isSSR(),
            query: {
                id: checkForId(videoId),
                website: 'la-nacion-ar',
                imageConfig,
                isInApertura: false,
                isAdmin
            },
            filter: filterVideo
        }) || null;

    const image = getImage({
        imageId,
        imageConfig,
        id,
        onlyOneApeturaValidateForWWW: false,
        isAdmin,
        filterImage
    });

    const mobileImage = getImage({
        imageId: mobileImageId,
        imageConfig: 'boxMultimediaMobile',
        id,
        onlyOneApeturaValidateForWWW: false,
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
        !error &&
        article && (
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
                    videoBackground={videoBackground}
                    isPowa={layout === 'grillaVideo1'}
                    handleClick={productClickFromClient}
                    registerSuccessEvent={registerSuccessEvent}
                    mobileImage={mobileImage}
                    isApertura={isEager}
                />
            </ErrorBoundary>
        )
    );
}

ArticleFeature.label = 'LN Articulo';

ArticleFeature.propTypes = {
    id: PropTypes.string.isRequired,
    tree: PropTypes.shape({
        children: PropTypes.array
    }).isRequired,
    customFields: PropTypes.shape({
        ...(featureArticleCustomsFields('articuloGeneral') || {}),
        noteId: PropTypes.string,
        imageId: PropTypes.string,
        video: PropTypes.string,
        mobileImageId: PropTypes.string
    }),
    searchableField: PropTypes.shape({
        imageId: PropTypes.string
    }),
    isBomba: PropTypes.bool
};

export default Consumer(ArticleFeature);
