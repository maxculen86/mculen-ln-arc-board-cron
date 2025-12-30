import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { getChainConfig } from '../article/common/_helper-WebApi';
import { getDataAttributesForViewability } from '../article/_helper';
import VideoCommonJw from '../../LN-10-global/common/videoCommon/default';
import useTermica from '../../../private/common/hooks/useTermica';
import useGetVideoData from '../videoPlayerNota/common/hooks/useGetVideoConfig';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import { validateVideoPlayer } from './_helper';

// TODO: Testear todas las implementaciones de video en home. Este componente y el feature del video horizontal

function LN10VideoPlayer({
    id,
    customFields: { video: videoId },
    isAdmin,
    renderables = []
}) {
    const videoData = useGetVideoData({
        videoId,
        imageConfig: 'videoVertical',
        staticMode: true
    });

    const { title, mediaId, videoFile, playlist } = videoData || {};

    const termicaCajaSegmentada = useTermica('caja_segmentada');
    const { boxPosition, layout } = getChainConfig({
        featureId: id,
        renderables,
        termicaCajaSegmentada
    });

    const cardPosition = layout === 'left-focal-video-vertical' ? 5 : 0;

    const extraOpts = getDataAttributesForViewability(
        videoId,
        boxPosition,
        cardPosition,
        true
    );

    const error = validateVideoPlayer({
        video: videoFile,
        videoId
    });

    if (error && isAdmin) {
        return (
            <article data-feature-id={id}>
                <WarningMessage
                    key={id}
                    type={error.type}
                    message={error.message}
                />
            </article>
        );
    }

    if (!mediaId) {
        return null;
    }

    const videoConfig = {
        videoId,
        mediaId: id,
        playerId: 'tMVdYMxO',
        title,
        withAutoplay: true,
        instanceConfig: {
            aspectratio: '9:16',
            playlist,
            fullscreenOrientationLock: 'portrait'
        }
    };

    return (
        !error && (
            <div className="video-container">
                <VideoCommonJw
                    videoId={videoId}
                    mediaId={id}
                    videoConfig={videoConfig}
                    extraOpts={extraOpts}
                    videoData={videoData}
                    ratio="ratio-9-16"
                    isAdmin={isAdmin}
                />
            </div>
        )
    );
}

LN10VideoPlayer.label = 'LN10 VideoPlayer';

LN10VideoPlayer.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        video: PropTypes.string.tag({
            name: 'ID de video JW',
            description: 'Ingrese aquí el ID del video',
            required: true,
            default: ''
        })
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    renderables: PropTypes.array.isRequired
};

export default Consumer(LN10VideoPlayer);
