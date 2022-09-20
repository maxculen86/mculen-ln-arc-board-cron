/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { handleProgressBar, handleEnded } from '../helpers';
import getBrowser from '../../utils/getBrowser';
import ControlsPlayer from './ControlsPlayer';
import '../../../../../resources/dist/css/ln/components/audio-player.css';

const AudioPlayer = ({ audio = '' }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioPlayer = useRef();
    const progressBar = useRef();

    useEffect(() => {
        if (getBrowser() === 'Safari') setIsPlaying(false);
    }, []);

    return (
        <div className="audio-player">
            <audio
                ref={audioPlayer}
                src={audio}
                onLoadedMetadata={({ target }) => setDuration(target.duration)}
                onTimeUpdate={({ target }) => {
                    setCurrentTime(target.currentTime);
                    handleProgressBar(progressBar, duration, audioPlayer);
                }}
                onEnded={() => {
                    handleEnded(
                        isPlaying,
                        setIsPlaying,
                        setCurrentTime,
                        progressBar
                    );
                }}
                autoPlay={isPlaying}
            />

            <ControlsPlayer
                audioPlayer={audioPlayer}
                progressBar={progressBar}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentTime={currentTime}
                duration={duration}
            />
        </div>
    );
};

AudioPlayer.propTypes = {
    audio: PropTypes.string.isRequired
};

export default AudioPlayer;
