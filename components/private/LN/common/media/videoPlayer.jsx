/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-eval */
import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../../../common/videoPlayer';
import VideoPlayerSnippet from '../../../common/scriptManager/snippetVideo';
import AmpContainer from '../../../common/ampContainer';
import WithScreenUtils from '../../../common/hocs/withScreenUtils';
import urlForPrerollAds from '../utils/urlForPrerollAds';
import get from '../../../common/utils/get';
import ModVideo from '../../../common/mod-video';
import getStreams from '../utils/getStreams';
import getBiggestImage from '../utils/getBiggestImage';

const video = ({
    videoId,
    mediaData,
    screenUtils,
    parrafo,
    tituloNota,
    autoplay,
    isPowa,
    href,
    isApertura
}) => {
    const {
        streams = [],
        promo_items: promoItems,
        resizedUrl: urlsRezized
    } = mediaData;
    const tituloVideo = get(mediaData, 'headlines.basic', '');
    if (streams.length === 0) return <div className="mod-video" />;

    const { resizedUrl } = getBiggestImage({
        resized_urls: urlsRezized
    });

    const mainStream = getStreams(streams, isPowa ? '<' : '>');

    const { url, stream_type: streamType, width, height } = mainStream;

    const adsURL = urlForPrerollAds(screenUtils.device);

    const videoSource = (
        <>
            <source src={url} type={`video/${streamType}`} />
            <div fallback="fallback">
                <p>Este navegador no soporta elementos de video.</p>
            </div>
        </>
    );

    const videoProps = {
        width,
        height,
        layout: 'responsive'
    };

    return (
        (isPowa && (
            <div className="mod-video">
                <AmpContainer isForAmp={false}>
                    <VideoPlayer
                        videoId={videoId}
                        adsURL={adsURL}
                        tituloVideo={tituloVideo}
                        autoPlay={autoplay}
                        device={screenUtils.device}
                        isApertura={isApertura}
                    />
                </AmpContainer>
                <AmpContainer isForAmp>
                    {adsURL === '' ? (
                        <amp-video
                            controls="controls"
                            poster={promoItems.basic.url}
                            {...videoProps}
                        >
                            {videoSource}
                        </amp-video>
                    ) : (
                        <amp-ima-video
                            data-poster={promoItems.basic.url}
                            data-tag={adsURL}
                            {...videoProps}
                        >
                            {videoSource}
                        </amp-ima-video>
                    )}
                </AmpContainer>
                <VideoPlayerSnippet
                    parrafo={parrafo}
                    tituloNota={tituloNota}
                    mediaData={mediaData}
                    minStream={mainStream}
                />
            </div>
        )) || (
            <figure className="mod-figure">
                <a href={href}>
                    <div className="placeholder">
                        <ModVideo
                            video={url}
                            image={resizedUrl}
                            autoplay
                            muted
                            loop
                        />
                    </div>
                </a>
            </figure>
        )
    );
};

video.propTypes = {
    mediaData: PropTypes.shape({
        type: PropTypes.oneOf(['video']),
        url: PropTypes.string,
        caption: PropTypes.string,
        streams: PropTypes.array.isRequired,
        promo_items: PropTypes.shape({
            basic: PropTypes.object
        }).isRequired
    }).isRequired,
    videoId: PropTypes.string.isRequired,
    screenUtils: PropTypes.shape({
        device: PropTypes.string
    }).isRequired,
    tituloNota: PropTypes.string.isRequired,
    parrafo: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()])
        .isRequired,
    autoplay: PropTypes.bool,
    isPowa: PropTypes.bool
};

video.defaultProps = {
    autoplay: false,
    isPowa: true
};

export default WithScreenUtils(video);
