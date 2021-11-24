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

const video = ({
    videoId,
    mediaData,
    screenUtils,
    parrafo,
    tituloNota,
    autoplay,
    isPowa,
    href,
    withPrerolAds
}) => {
    const { streams = [], promo_items: promoItems } = mediaData;
    const tituloVideo = get(mediaData, 'headlines.basic', '');
    if (streams.length === 0) return <div className="mod-video" />;

    const mainStream = getStreams(streams, isPowa ? '<' : '>');

    const adsURL = withPrerolAds ? urlForPrerollAds(screenUtils.device) : '';

    return (
        (isPowa && (
            <div className="mod-video">
                <AmpContainer isForAmp={false}>
                    <VideoPlayer
                        videoId={videoId}
                        adsURL={adsURL}
                        tituloVideo={tituloVideo}
                        autoPlay={autoplay}
                    />
                </AmpContainer>
                <AmpContainer isForAmp>
                    <amp-ima-video
                        width={mainStream.width}
                        height={mainStream.height}
                        layout="responsive"
                        data-poster={promoItems.basic.url}
                        data-tag={adsURL}
                    >
                        <source
                            src={mainStream.url}
                            type={`video/${mainStream.stream_type}`}
                        />
                        <div fallback="fallback">
                            <p>Este navegador no soporta elementos de video.</p>
                        </div>
                    </amp-ima-video>
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
                    <picture className="mod-picture">
                        <ModVideo video={mainStream.url} autoplay muted loop />
                    </picture>
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
