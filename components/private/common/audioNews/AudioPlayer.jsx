import React from 'react';
import { Dialog } from '@ln/common-ui-dialog';
import { useWindowSize } from '@ln/hooks';
import { Button } from '@ln/common-ui-button';
import { Icon } from '@ln/common-ui-icon';
import BuildAudioPlayer from './BuildAudioPlayer';
import isSSR from '../../LN/common/utils/isSSR';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';

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
            playbackState="playing"
            onCloseAudioPlayer={onCloseAudioPlayer}
            showVariantIa={showVariantIa}
        />
    );

    return isMobile ? (
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
                        <IconSprite
                            name="close"
                            fill="var(--neutral-light-800)"
                        />
                    </Icon>
                </Button>
            </Dialog.Header>
            {buildAudioPlayer}
        </Dialog>
    ) : (
        buildAudioPlayer
    );
}

export default AudioPlayer;
