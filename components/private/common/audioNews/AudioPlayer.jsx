import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@ln/common-ui-dialog';
import { useWindowSize } from '@ln/hooks';
import BuildAudioPlayer from './BuildAudioPlayer';
import isSSR from '../../LN/common/utils/isSSR';

function AudioPlayer({ noteId = '', audioPlayerProps = {}, showVariantIa }) {
    const { width: viewportWidth } = useWindowSize();
    const isMobile = viewportWidth < 1280;

    const { onCloseAudioPlayer, isOpenAudioPlayer, setEnableButton } =
        audioPlayerProps;

    if (isSSR()) return null;

    const buildAudioPlayer = isOpenAudioPlayer && (
        <BuildAudioPlayer
            setEnableButton={setEnableButton}
            noteId={noteId}
            loaderClass="m-0"
            playbackState="playing"
            onCloseAudioPlayer={onCloseAudioPlayer}
            showVariantIa={showVariantIa}
        />
    );

    return (
        <div id="audio-player-desktop">
            {isMobile ? (
                <Dialog
                    isOpen={isOpenAudioPlayer}
                    onClose={onCloseAudioPlayer}
                    position="bottom"
                    id="audio-player"
                    classnames={{
                        base: 'w-100 p-16 w-640_md shadow-up-md center-x',
                        wrapper: 'flex flex-column gap-12'
                    }}
                    style={{ zIndex: 15000 }}
                >
                    <Dialog.Header
                        className="flex-column"
                        closeButtonProps={{
                            className: 'as-flex-end',
                            title: 'Cerrar'
                        }}
                    />
                    {buildAudioPlayer}
                </Dialog>
            ) : (
                buildAudioPlayer
            )}
        </div>
    );
}

AudioPlayer.propTypes = {
    noteId: PropTypes.string.isRequired,
    audioPlayerProps: PropTypes.shape({
        onCloseAudioPlayer: PropTypes.func.isRequired,
        isOpenAudioPlayer: PropTypes.bool.isRequired,
        setEnableButton: PropTypes.func.isRequired
    }).isRequired,
    showVariantIa: PropTypes.bool.isRequired
};

export default AudioPlayer;
