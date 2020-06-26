import React from 'react';
import PropTypes from 'fusion:prop-types';
import VideoPlayer from '../../../common/videoPlayer';
import VideoPlayerSnippet from '../../../common/scriptManager/snippetVideo';

const video = ({ videoId, mediaData, isAmp }) => {
    const { streams = [], promo_items } = mediaData;

    if (streams.length === 0) {
        return <div className="mod-video" />;
    }

    return (
        <div className="mod-video">
            {!isAmp ? (
                <>
                    <VideoPlayer videoId={videoId} />
                    <VideoPlayerSnippet mediaData={mediaData} />
                </>
            ) : (
                <amp-video
                    controls="controls"
                    width={streams[0].width}
                    height={streams[0].height}
                    layout="responsive"
                    poster={promo_items.basic.url}
                >
                    <source
                        src={streams[0].url}
                        type={`video/${streams[0].stream_type}`}
                    />
                    <div fallback>
                        <p>Este navegador no soporta elementos de video.</p>
                    </div>
                </amp-video>
            )}
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
    isAmp: PropTypes.bool.isRequired
};

export default video;
