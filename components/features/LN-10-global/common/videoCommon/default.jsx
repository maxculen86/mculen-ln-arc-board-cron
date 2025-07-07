import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Icon } from '@ln/common-ui-icon';
import WarningMessage from '../../../../private/common/warningMessage/warningMessage';
import { validateVideoPlayer } from '../../../LN-10/videoPlayer/_helper';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import get from '../../../../private/common/utils/get';

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
    const { title } = videoData || {};

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

    const resizeImages = get(
        videoData,
        'resizedImages.promo_items.basic.resized_urls',
        []
    );
    const { resizedUrl } = getShortestImage(resizeImages);

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
                <div
                    id={`facade-${mediaId}`}
                    className="flex flex-column w-100 h-100 ratio-6-19 jc-center ai-center"
                >
                    <Adaptableimage
                        sources={getImagesToLoadWithPicture(
                            false,
                            resizeImages
                        )}
                        src={resizedUrl}
                        className="flex w-100 h-100 z-1"
                        alt={title}
                        loading="lazy"
                        fetchPriority="low"
                    />
                    <div className="absolute z-2 opacity-80">
                        <Icon color="light" width={64} height={64}>
                            <IconSprite
                                fill="var(--light-neutral-50)"
                                name="mediaPlay"
                            />
                        </Icon>
                    </div>
                </div>
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
