import React from 'react';
import PropTypes from 'fusion:prop-types';
import VideoPlayer from '../../../common/videoPlayer';
import VideoPlayerSnippet from '../../../common/scriptManager/snippetVideo';
import AmpContainer from '../../../common/ampContainer';

const video = ({ videoId, mediaData, parrafo, tituloNota }) => {
    const { streams = [], promo_items } = mediaData;

    if (streams.length === 0) return <div className="mod-video" />;

    const minStream = streams.reduce((prev, curr) =>
        prev.height < curr.height ? prev : curr
    );

    return (
        <div className="mod-video">
            <AmpContainer isForAmp={false}>
                <VideoPlayer videoId={videoId} />
                <VideoPlayerSnippet
                    parrafo={parrafo}
                    tituloNota={tituloNota}
                    mediaData={mediaData}
                    minStream={minStream}
                />
            </AmpContainer>
            <AmpContainer isForAmp>
                <amp-video
                    controls="controls"
                    width={minStream.width}
                    height={minStream.height}
                    layout="responsive"
                    poster={promo_items.basic.url}
                >
                    <source
                        src={minStream.url}
                        type={`video/${minStream.stream_type}`}
                    />
                    <div fallback="fallback">
                        <p>Este navegador no soporta elementos de video.</p>
                    </div>
                </amp-video>
            </AmpContainer>
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
    tituloNota: PropTypes.string.isRequired,
    parrafo: PropTypes.shape({
        content: PropTypes.string
    }).isRequired
};

export default video;
