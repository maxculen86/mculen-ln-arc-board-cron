import React from 'react';
import PropTypes from 'fusion:prop-types';
import VideoPlayer from '../../../common/videoPlayer';
import VideoPlayerSnippet from '../../../common/scriptManager/snippetVideo';

const video = ({ videoId, mediaData, isAmp }) => {
    const { streams = [], promo_items } = mediaData;
    // const firstVideo = streams.shift();
    console.log('++++++video++++++++' + JSON.stringify(firstVideo));
    return (
        <div className="figure">
            <div className="content-video video">
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
                        poster={promo_items.basic.url}>
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
        </div>
    );
};

video.propTypes = {
    mediaData: PropTypes.shape({
        type: PropTypes.oneOf(['video']),
        url: PropTypes.string,
        caption: PropTypes.string
    }).isRequired,
    videoId: PropTypes.string.isRequired
};

export default video;
