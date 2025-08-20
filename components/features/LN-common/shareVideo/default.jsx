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
import ShareV2 from '../shareV2/default';

function ShareVideo({ videoId }) {
    const { playerRef } = useJWPlayer(videoId);
    useVideoJwCustomSettings({
        isInView: true,
        loading: false,
        playerRef
    });

    return (
        <VideoShare>
            <div className="w-100 absolute top-0 left-0 z-1 bg-gradient-dark bg-none_lg py-8 mt-16_m">
                <VideoShare.Button href={SITE_LANACION}>
                    <Icon size={24}>
                        <IconSprite name="arrowLeft" />
                    </Icon>
                    <span className="text-16 uppercase">Volver</span>
                </VideoShare.Button>
                <ShareV2
                    videoId={videoId}
                    className="absolute top-0 right-0 right--55_lg"
                />
            </div>
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
