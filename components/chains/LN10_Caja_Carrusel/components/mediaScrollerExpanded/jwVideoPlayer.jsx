import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function JwVideoPlayer({ videoId }) {
    useEffect(() => {
        const playerInstance = window?.jwplayer?.(videoId);

        playerInstance?.setup({
            file: `https://cdn.jwplayer.com/videos/${videoId}.mp4`,
            image: `https://cdn.jwplayer.com/v2/media/${videoId}/poster.jpg`,
            width: '100%'
        });
    }, [videoId]);

    return <div id={videoId} />;
}

JwVideoPlayer.propTypes = {
    videoId: PropTypes.string.isRequired
};

export default JwVideoPlayer;
