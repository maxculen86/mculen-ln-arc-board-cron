import React from 'react';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { checkForId, getChainConfig } from '../article/common/_helper-WebApi';
import videoFilterLN10 from '../../../../content/filters/LN/home/LN10/videoFilterLN10';
import { validateVideoPlayer } from './_helper';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import { getDataAttributesForViewability } from '../article/_helper';

function LN10VideoPlayer({
    id,
    customFields: { video: videoId },
    isAdmin,
    renderables = []
}) {
    const videoData = useContent({
        source: checkForId(videoId) ? 'videosJwSource' : null,
        query: {
            id: checkForId(videoId),
            website: 'la-nacion-ar',
            filter: videoFilterLN10
        }
    });

    const { title } = videoData || {};

    const mediaId = videoData?.mediaid || '';
    const playlist = videoData ? [videoData] : [];
    const playListWithoutTitle = playlist.map(video => ({
        ...video,
        title: ''
    }));

    const cardPosition = 0;

    const { boxPosition } = getChainConfig({ featureId: id, renderables });

    const extraOpts = getDataAttributesForViewability(
        videoId,
        boxPosition,
        cardPosition,
        true
    );

    const error = validateVideoPlayer({
        video: videoData,
        videoId
    });

    if (isAdmin) {
        return (
            <article data-feature-id={id}>
                <video
                    src={videoData?.sources[0]?.file}
                    poster={videoData?.poster}
                    controls
                    style={{ width: '100%', maxWidth: '500px' }}
                >
                    <track
                        kind="captions"
                        srcLang="es"
                        label="Español"
                        src=""
                    />
                </video>
            </article>
        );
    }

    if (!mediaId) {
        return null;
    }

    if (error) {
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

    const videoConfig = {
        videoId,
        mediaId,
        title,
        instanceConfig: {
            mute: true,
            aspectRatio: '9:16',
            fullscreenOrientationLock: 'portrait',
            playlist: playListWithoutTitle,
            preload: 'none',
            displaytitle: false
        }
    };

    return (
        !error && (
            <article
                className="content-media cursor-pointer w-100 flex flex-column ai-center bg-black ratio-9-16"
                data-has-jwplayer="true"
                data-video-id-jw={videoId}
                data-config={JSON.stringify(videoConfig)}
                {...extraOpts}
            >
                {mediaId && <div id={mediaId} />}
            </article>
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
