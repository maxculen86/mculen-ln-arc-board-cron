import React from 'react';
import PropTypes from 'fusion:prop-types';
import WarningMessage from '../../../../private/common/warningMessage/warningMessage';
import { validateVideoPlayer } from '../../../LN-10/videoPlayer/_helper';

function VideoCommonJw({
    videoId,
    mediaId,
    videoConfig,
    extraOpts,
    ratio = 'ratio-9-16',
    isAdmin = false,
    videoData = {}
}) {
    if (!mediaId || !videoId || !videoConfig) return null;

    const error = validateVideoPlayer({
        video: videoData,
        videoId
    });

    if (isAdmin) {
        return (
            <article
                data-feature-id={videoId}
                className={`ln-card content-media cursor-pointer w-100 flex flex-column ai-center bg-black ${ratio}`}
            >
                <video
                    src={videoData.sources[0].file}
                    poster={videoData.poster}
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

    if (error) {
        return (
            <article data-feature-id={videoId}>
                <WarningMessage
                    key={videoId}
                    type={error.type}
                    message={error.message}
                />
            </article>
        );
    }

    return (
        !error && (
            <article
                className={`content-media cursor-pointer w-100 flex flex-column ai-center bg-black ${ratio}`}
                data-has-jwplayer="true"
                data-video-id-jw={videoId}
                data-title={videoConfig.title}
                data-config={JSON.stringify(videoConfig)}
                {...extraOpts}
            >
                <div id={mediaId} />
            </article>
        )
    );
}

VideoCommonJw.defaultProps = {
    extraOpts: {},
    ratio: 'ratio-9-16',
    isAdmin: false,
    videoData: {}
};

VideoCommonJw.propTypes = {
    videoId: PropTypes.string.isRequired,
    mediaId: PropTypes.string.isRequired,
    videoConfig: PropTypes.object.isRequired,
    extraOpts: PropTypes.object,
    ratio: PropTypes.string,
    isAdmin: PropTypes.bool,
    videoData: PropTypes.object
};

export default VideoCommonJw;
