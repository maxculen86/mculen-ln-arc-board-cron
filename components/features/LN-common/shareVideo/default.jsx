import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import { Icon } from '@ln/common-ui-icon';
import { cx } from '@ln/cva';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { useVideoJwCustomSettings } from '../../../chains/LN10_Caja_Carrusel/components/hooks';
import { useJWPlayer } from './hooks/useJWPlayer';
import VideoShareButton from './components/VideoShareButton';
import VideoShare from './components/VideoShare';
import VideoShareMedia from './components/VideoShareMedia';
import ShareV2 from '../shareV2/default';
import { shareVideoClasses } from './styles';

// TODO cambiar variant por context
function ShareVideo({ videoId, variant = 'vertical' }) {
    const { playerRef } = useJWPlayer(videoId);
    useVideoJwCustomSettings({
        isInView: true,
        loading: false,
        playerRef
    });

    return (
        <VideoShare variant={variant}>
            <div className={shareVideoClasses({ variant })}>
                <VideoShare.Button variant={variant} href={SITE_LANACION}>
                    <Icon size={24}>
                        <IconSprite name="arrowLeft" />
                    </Icon>
                    <span className="text-16 uppercase">Volver</span>
                </VideoShare.Button>
                <ShareV2
                    videoId={videoId}
                    className={cx(
                        variant === 'vertical' && [
                            'absolute',
                            'top-0',
                            'right-0',
                            'right--55_lg'
                        ]
                    )}
                    isHorizontal={variant === 'horizontal'}
                />
            </div>
            <VideoShare.Media id={videoId} variant={variant} />
        </VideoShare>
    );
}

VideoShare.Button = VideoShareButton;
VideoShare.Media = VideoShareMedia;

export default ShareVideo;
