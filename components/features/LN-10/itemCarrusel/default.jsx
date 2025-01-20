import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import { validateItemCarrusel } from './_helper';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import CardVertical from '../../LN-10-global/cardVerticalCarrusel/default';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import {
    checkForId,
    getChainParentOfFeature
} from '../article/common/_helper-WebApi';
import { useCajaCarruselContext } from '../../../chains/LN10_Caja_Carrusel/components/cajaCarruselContext';
import get from '../../../private/common/utils/get';

function itemCarrusel({
    isAdmin,
    id: featureId,
    customFields: { video: videoId, title, chapita },
    renderables,
    layout
}) {
    const { setVideosData } = useCajaCarruselContext();

    const { layoutsName = {} } = siteConfig || {};

    const layoutTypesForEvent = {
        [layoutsName.HomeLN10]: 'home',
        [layoutsName.Acumulado]: 'acu'
    };

    const getLayoutType = layoutName => layoutTypesForEvent[layoutName] || '';

    const videoData =
        useContent({
            source: checkForId(videoId) ? 'videosJwCarruselSource' : null,
            query: {
                id: checkForId(videoId),
                website: 'la-nacion-ar',
                isAdmin
            }
        }) || null;

    useEffect(() => {
        setVideosData({
            id: videoId,
            title: videoData?.title
        });
    }, []);

    const error = validateItemCarrusel({
        video: videoData,
        videoId
    });

    const parent = getChainParentOfFeature(featureId, renderables);

    const cardPosition = get(parent, 'children', []).findIndex(
        elem => elem && get(elem, 'props.id') === featureId
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

    return (
        !error &&
        videoData && (
            <CardVertical
                title={title}
                titleJwPlayer={videoData?.title}
                badgeText={chapita}
                poster={videoData?.poster}
                src={videoData?.posterVideo}
                duration={videoData?.duration}
                cardPosition={cardPosition}
                videoId={videoId}
                layoutType={getLayoutType(layout)}
            />
        )
    );
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
