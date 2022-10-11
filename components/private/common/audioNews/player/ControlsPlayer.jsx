import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../com-button';
import Text from '../../text';
import {
    togglePlayPause,
    backTenSecs,
    forwardTenSecs,
    handlePlaybackRate,
    getTime,
    getTitleAndIcon
} from '../helpers';

export default function ControlsPlayer({
    audioPlayer,
    progressBar,
    isPlaying,
    setIsPlaying,
    currentTime,
    duration
}) {
    const [playBackRate, setPlayBackRate] = useState(1);

    const { title, icon } = getTitleAndIcon(isPlaying);

    return (
        <>
            <Button
                onClick={() => {
                    togglePlayPause(isPlaying, setIsPlaying, audioPlayer);
                }}
                iconName={icon}
                title={title}
                classCondition="--tertiary action-player"
            />
            <div className="progress-bar">
                <div className="percentage" ref={progressBar} />
            </div>
            <Text extraClass="counter" size="4xs">
                {getTime(duration, currentTime)}
            </Text>
            <Button
                onClick={() => backTenSecs(audioPlayer)}
                iconName="ten-back-secs"
                classCondition="ten-back-secs"
                title="Retroceder 10 segundos"
            />
            <Button
                onClick={() => forwardTenSecs(duration, audioPlayer)}
                iconName="ten-forward-secs"
                classCondition="ten-forward-secs"
                title="Adelantar 10 segundos"
            />
            <Button
                onClick={() => {
                    handlePlaybackRate(
                        playBackRate,
                        setPlayBackRate,
                        audioPlayer
                    );
                }}
                textname={`${playBackRate}x`}
                title="Aumentar velocidad de reproducción"
                classCondition="--tertiary playback-speed"
            />
        </>
    );
}

ControlsPlayer.propTypes = {
    audioPlayer: PropTypes.shape(PropTypes.node).isRequired,
    progressBar: PropTypes.shape(PropTypes.node).isRequired,
    isPlaying: PropTypes.bool.isRequired,
    setIsPlaying: PropTypes.func.isRequired,
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired
};
