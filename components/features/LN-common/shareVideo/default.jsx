import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { useVideoJwCustomSettings } from '../../../chains/LN10_Caja_Carrusel/components/hooks';
import { useJWPlayer } from './hooks/useJWPlayer';
import VideoShareButton from './components/VideoShareButton';
import VideoShare from './components/VideoShare';
import VideoShareMedia from './components/VideoShareMedia';

function ShareVideo({ videoId }) {
    const { playerRef } = useJWPlayer(videoId);
    useVideoJwCustomSettings({
        isInView: true,
        loading: false,
        playerRef,
        handleNextCallback: null
    });

    return (
        <VideoShare>
            <VideoShare.Button href={SITE_LANACION}>
                <Icon size={24}>
                    <IconSprite name="arrowLeft" />
                </Icon>
                <span className="text-16 uppercase">Volver</span>
            </VideoShare.Button>
            <VideoShare.Media id={videoId} />
        </VideoShare>
    );
}

VideoShare.Button = VideoShareButton;
VideoShare.Media = VideoShareMedia;

ShareVideo.propTypes = {
    videoId: PropTypes.string.isRequired
};

export default ShareVideo;
