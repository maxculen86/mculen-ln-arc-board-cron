import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../../../common/videoPlayer';
import VideoPlayerSnippet from '../../../common/scriptManager/snippetVideo';
import AmpContainer from '../../../common/ampContainer';
import WithScreenUtils from '../../../common/hocs/withScreenUtils';
import urlForPrerollAds from '../utils/urlForPrerollAds';
import get from '../../../common/utils/get';

const video = ({
    videoId,
    mediaData,
    screenUtils,
    parrafo,
    tituloNota,
    scriptForAutoplay
}) => {
    const { streams = [], promo_items: promoItems } = mediaData;
    const tituloVideo = get(mediaData, 'headlines.basic', '');
    if (streams.length === 0) return <div className="mod-video" />;

    const minStream = streams.reduce((prev, curr) =>
        prev.height < curr.height ? prev : curr
    );

    const adsURL = urlForPrerollAds(screenUtils.device);

    return (
        <div className="mod-video">
            <AmpContainer isForAmp={false}>
                <VideoPlayer
                    videoId={videoId}
                    adsURL={adsURL}
                    tituloVideo={tituloVideo}
                />
                {scriptForAutoplay}
            </AmpContainer>
            <AmpContainer isForAmp>
                <amp-ima-video
                    width={minStream.width}
                    height={minStream.height}
                    layout="responsive"
                    data-poster={promoItems.basic.url}
                    data-tag={adsURL}
                >
                    <source
                        src={minStream.url}
                        type={`video/${minStream.stream_type}`}
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
                minStream={minStream}
            />
        </div>
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
    parrafo: PropTypes.shape({
        content: PropTypes.string
    }).isRequired,
    scriptForAutoplay: PropTypes.string
};

video.defaultProps = {
    scriptForAutoplay: undefined
};

export default WithScreenUtils(video);
