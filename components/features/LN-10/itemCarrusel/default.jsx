import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import { validateItemCarrusel, pickPreferredMp4 } from './_helper';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import CardCarruselContainer from '../../LN-10-global/cardCarrusel/default';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import {
    checkForId,
    getChainConfig,
    getChainParentOfFeature
} from '../article/common/_helper-WebApi';
import get from '../../../private/common/utils/get';
import { getDataAttributesForViewability } from '../article/_helper';
import useTermica from '../../../private/common/hooks/useTermica';
import { useCajaCarruselContext } from '../../../chains/LN10_Caja_Carrusel/components/cajaCarruselContext';
import useIntersectionObserver from '../../../common/hooks/useIntersectionObserver';

function itemCarrusel({
    isAdmin,
    id: featureId,
    customFields: { video: videoId, title, chapita },
    renderables,
    layout,
    variant = 'vertical'
}) {
    const { setPreferredVideoFile, setVideoMetadata } =
        useCajaCarruselContext();
    const { layoutsName = {} } = siteConfig || {};

    const layoutTypesForEvent = {
        [layoutsName.HomeLN10]: 'home',
        [layoutsName.Acumulado]: 'acu'
    };

    const getLayoutType = layoutName => layoutTypesForEvent[layoutName] || '';

    const sanitizedVideoId = checkForId(videoId) || '';
    const { targetRef: viewportTargetRef, isIntersecting: isPreviewEligible } =
        useIntersectionObserver({
            hide: !sanitizedVideoId,
            threshold: 0.1
        });

    const shouldFetchVideo = Boolean(sanitizedVideoId) && isPreviewEligible;

    const videoData =
        useContent({
            source: shouldFetchVideo ? 'videosJwCarruselSource' : null,
            query: {
                id: sanitizedVideoId,
                website: 'la-nacion-ar',
                isAdmin
            }
        }) || null;

    const duration = videoData?.duration;
    const titleJwPlayer = videoData?.title;

    const shouldUsePreferredMp4 = variant === 'horizontal';
    const preferredMp4 = shouldUsePreferredMp4
        ? pickPreferredMp4(videoData?.sources)
        : '';

    useEffect(() => {
        if (!shouldUsePreferredMp4 || !sanitizedVideoId || !preferredMp4)
            return;
        setPreferredVideoFile(sanitizedVideoId, preferredMp4);
    }, [
        shouldUsePreferredMp4,
        sanitizedVideoId,
        preferredMp4,
        setPreferredVideoFile
    ]);

    useEffect(() => {
        if (!sanitizedVideoId || !videoData) return;
        setVideoMetadata(sanitizedVideoId, {
            duration,
            titleJwPlayer
        });
    }, [sanitizedVideoId, duration, titleJwPlayer]);

    const validationVideo = shouldFetchVideo ? videoData : undefined;
    const error = validateItemCarrusel({
        video: validationVideo,
        videoId: sanitizedVideoId
    });

    const parent = getChainParentOfFeature(featureId, renderables);

    const cardPosition = get(parent, 'children', []).findIndex(
        elem => elem && get(elem, 'props.id') === featureId
    );

    const termicaCajaSegmentada = useTermica('caja_segmentada');
    const { boxPosition } = getChainConfig({
        featureId,
        renderables,
        termicaCajaSegmentada
    });

    const extraOpts = getDataAttributesForViewability(
        sanitizedVideoId,
        boxPosition,
        cardPosition,
        true
    );

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

    if (!isPreviewEligible && sanitizedVideoId) {
        return <div ref={viewportTargetRef} data-feature-id={featureId} />;
    }

    const cardProps = {
        'data-feature-id': featureId,
        title,
        titleJwPlayer,
        badgeText: chapita,
        poster: videoData?.poster,
        src: videoData?.posterVideo,
        duration,
        cardPosition,
        videoId: sanitizedVideoId,
        layoutType: getLayoutType(layout),
        variant,
        shouldLoadPreview: Boolean(isPreviewEligible && videoData?.posterVideo),
        ...extraOpts
    };

    return !error && videoData && <CardCarruselContainer {...cardProps} />;
}

itemCarrusel.label = 'LN10 Item Carrusel';

itemCarrusel.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            name: 'Título',
            description:
                'Ingrese el texto del título. Máx: 100 caracteres incluyendo volanta.',
            default: ''
        }),
        video: PropTypes.string.tag({
            name: 'Video',
            description: 'Ingrese aquí el ID del video de JW',
            default: ''
        }),
        chapita: PropTypes.string.tag({
            name: 'Chapita',
            description: 'Ingrese aquí el texto de la chapita',
            default: ''
        })
    })
};

export default Consumer(itemCarrusel);
