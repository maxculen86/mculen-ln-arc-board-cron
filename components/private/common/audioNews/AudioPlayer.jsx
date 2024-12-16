import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@ln/common-ui-dialog';
import { useDisclosure, useWindowSize } from '@ln/hooks';
import { Button } from '@ln/common-ui-button';
import { Icon } from '@ln/common-ui-icon';
import BuildAudioPlayer from './BuildAudioPlayer';
import isSSR from '../../LN/common/utils/isSSR';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import ShowToast from '../toast/showToast';

function AudioPlayer({ noteId = '', audioPlayerProps = {}, showVariantIa }) {
    const { width: viewportWidth } = useWindowSize();
    const isMobile = viewportWidth < 1280;

    const { onCloseAudioPlayer, isOpenAudioPlayer, setEnableButton } =
        audioPlayerProps;

    const {
        isOpen: isToastOpen,
        onOpen: openToast,
        onClose: closeToast
    } = useDisclosure(false);

    if (isSSR()) return null;

    const buildAudioPlayer = isOpenAudioPlayer && (
        <BuildAudioPlayer
            setEnableButton={setEnableButton}
            noteId={noteId}
            playbackState="playing"
            onCloseAudioPlayer={onCloseAudioPlayer}
            showVariantIa={showVariantIa}
            openToast={openToast}
        />
    );

    return (
        <>
            <ShowToast
                isOpen={isToastOpen}
                onClose={closeToast}
                title="Error de audio"
                description="Parece que hubo un problema."
                status="danger"
                timeout={2750}
            />
            {isMobile ? (
                <Dialog
                    isOpen={isOpenAudioPlayer}
                    onClose={onCloseAudioPlayer}
                    position="bottom"
                    id="audio-player"
                    classnames={{
                        base: 'w-100 p-16 w-640_md shadow-up-md mx-auto',
                        wrapper: 'flex flex-column gap-12'
                    }}
                    style={{ zIndex: 15000 }}
                >
                    <Dialog.Header className="flex-column">
                        <Button
                            onClick={onCloseAudioPlayer}
                            className="as-flex-end"
                            aria-label="Cerrar"
                            title="Cerrar"
                        >
                            <Icon>
                                <IconSprite name="close" />
                            </Icon>
                        </Button>
                    </Dialog.Header>
                    {buildAudioPlayer}
                </Dialog>
            ) : (
                buildAudioPlayer
            )}
        </>
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
