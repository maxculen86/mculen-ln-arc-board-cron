/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Button from '../com-button';
import Text from '../text';
import { calculateTime } from './helpers';
import get from '../utils/get';
import '../../../../resources/dist/css/ln/components/audio-player.css';

const AudioPlayer = ({ audio = '' }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [playBackRate, setPlayBackRate] = useState(1);
    const audioPlayer = useRef();
    const progressBar = useRef();

    const handleEnded = () => {
        setIsPlaying(!isPlaying);
        setCurrentTime(0);
        progressBar.current.style.setProperty('width', '0');
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        !isPlaying ? audioPlayer.current.play() : audioPlayer.current.pause();
    };

    const handleProgressBar = () => {
        progressBar.current.style.setProperty(
            'width',
            `${(audioPlayer.current.currentTime / duration) * 100}%`
        );
    };

    const backTenSecs = () => {
        audioPlayer.current.currentTime -= 10;
        handleProgressBar();
    };

    const forwardTenSecs = () => {
        if (audioPlayer && audioPlayer.current.currentTime + 10 < duration) {
            audioPlayer.current.currentTime += 10;
            handleProgressBar();
        }
    };

    const handlePlaybackRate = () => {
        audioPlayer.current.playbackRate = playBackRate + 0.25;
        const playBack = get(audioPlayer, 'current.playbackRate', 0);
        setPlayBackRate(playBack);

        if (audioPlayer.current.playbackRate > 2) {
            audioPlayer.current.playbackRate = 1;
            setPlayBackRate(1);
        }
    };

    const startAudio = () =>
        audioPlayer && audioPlayer.current && audioPlayer.current.play();

    useEffect(() => {
        startAudio();
    }, []);

    return (
        <div className="audio-player">
            <audio
                ref={audioPlayer}
                src={audio}
                onLoadedMetadata={({ target }) => setDuration(target.duration)}
                onTimeUpdate={({ target }) => {
                    setCurrentTime(target.currentTime);
                    handleProgressBar();
                }}
                onEnded={handleEnded}
            />
            <Button
                onClick={togglePlayPause}
                iconName={isPlaying ? 'pause' : 'play'}
                classCondition="--tertiary action-player"
            />
            <div className="progress-bar">
                <div className="percentage" ref={progressBar} />
            </div>
            <Text extraClass="counter" size="4xs">
                {!isNaN(duration)
                    ? calculateTime(duration - currentTime)
                    : '00:00'}
            </Text>
            <Button
                onClick={backTenSecs}
                iconName="ten-back-secs"
                classCondition="ten-back-secs"
            />
            <Button
                onClick={forwardTenSecs}
                iconName="ten-forward-secs"
                classCondition="ten-forward-secs"
            />
            <Button
                onClick={handlePlaybackRate}
                textname={`${playBackRate}x`}
                classCondition="--tertiary playback-speed"
            />
        </div>
    );
};

AudioPlayer.propTypes = {
    audio: PropTypes.string.isRequired
};

export default AudioPlayer;
