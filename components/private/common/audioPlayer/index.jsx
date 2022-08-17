/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef } from 'react';
import '../../../../resources/dist/css/ln/components/audio-player.css';
import Button from '../com-button';
import Text from '../text';
import calculateTime from './helpers';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
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
        audioPlayer.current.currentTime =
            audioPlayer?.current?.currentTime - 10;
        handleProgressBar();
    };

    const forwardTenSecs = () => {
        if (audioPlayer?.current?.currentTime + 10 < duration) {
            audioPlayer.current.currentTime =
                audioPlayer?.current?.currentTime + 10;
            handleProgressBar();
        }
    };
    const handlePlaybackRate = () => {
        audioPlayer.current.playbackRate = playBackRate + 0.5;
        setPlayBackRate(audioPlayer?.current?.playbackRate);
        if (audioPlayer.current.playbackRate > 2) {
            audioPlayer.current.playbackRate = 1;
            setPlayBackRate(1);
        }
    };
    return (
        <div className="audio-player">
            <audio
                ref={audioPlayer}
                src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3"
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

export default AudioPlayer;
