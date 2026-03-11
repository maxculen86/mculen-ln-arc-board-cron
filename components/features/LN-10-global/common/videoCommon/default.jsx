import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { cx } from '@ln/cva';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import get from '../../../../private/common/utils/get';
import { VIDEO_VERTICAL_RATIO } from '../../../LN-10/videoPlayer/share/constants';
import TooltipSSR from './TooltipSSR';

function VideoCommonJw({
    videoId,
    mediaId,
    videoConfig,
    extraOpts = {},
    isAdmin = false,
    ratio = 'ratio-9-16',
    videoData = {}
}) {
    if (!mediaId || !videoId || !videoConfig) return null;
    const { title, videoFile, poster } = videoData || {};

    const baseArticleClasses =
        'content-media cursor-pointer w-100 flex flex-column ai-center bg-black videoCommonJw-wrapper';
    const articleWithLnCardClass = cx('ln-card', baseArticleClasses, ratio);
    const articleWithRelativeClass = cx('relative', baseArticleClasses, ratio);

    if (isAdmin) {
        return (
            <article
                data-feature-id={videoId}
                className={articleWithLnCardClass}
            >
                <video
                    src={videoFile}
                    poster={poster}
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

    const resizeImages = get(
        videoData,
        'resizedImages.promo_items.basic.resized_urls',
        []
    );
    const { resizedUrl } = getShortestImage(resizeImages);
    const isVertical =
        videoConfig.instanceConfig?.aspectratio === VIDEO_VERTICAL_RATIO;

    return (
        <article
            className={articleWithRelativeClass}
            data-has-jwplayer="true"
            data-video-id-jw={videoId}
            data-title={title}
            data-config={JSON.stringify(videoConfig)}
            {...extraOpts}
        >
            <div
                id={`facade-${mediaId}`}
                className="flex flex-column w-100 h-100 ratio-6-19 jc-center ai-center"
            >
                <Adaptableimage
                    sources={getImagesToLoadWithPicture(false, resizeImages)}
                    src={resizedUrl}
                    className="flex w-100 h-100"
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
            {isVertical && (
                <>
                    <div className="videoCommonJw-gradient transition transition-opacity transition-duration-250 transition-ease pointer-events-none absolute w-100 top-0 z-1 bg-gradient-dark h-70 opacity-0" />
                    <div
                        className="absolute z-100"
                        style={{ right: '26px', top: '5px' }}
                    >
                        <TooltipSSR
                            className="none"
                            position="left-center"
                            content="Link copiado"
                        >
                            <Button
                                id={`share-video-button-${mediaId}`}
                                data-video-id={videoId}
                                data-title={videoConfig.title || ''}
                                title="Copiar link del video"
                                iconOnly
                            >
                                <Icon size={24} className="--mobile-none">
                                    <IconSprite
                                        name="fileCopy"
                                        fill="var(--light-neutral-50)"
                                    />
                                </Icon>
                                <Icon size={24} className="--mobile-only">
                                    <IconSprite
                                        name="reply"
                                        fill="var(--light-neutral-50)"
                                    />
                                </Icon>
                            </Button>
                        </TooltipSSR>
                    </div>
                </>
            )}
        </article>
    );
}

export default VideoCommonJw;
