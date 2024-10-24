import { useDisclosure } from '@ln/hooks';
import { useState } from 'react';
import useTermica from '../../hooks/useTermica';

export const useAudioPlayer = ({ isListenable }) => {
    const [enableButton, setEnableButton] = useState(false);
    const thermicalAudio =
        !useTermica('hide_listening_articles') && isListenable;
    const {
        onOpen: onOpenAudioPlayer,
        onClose: onCloseAudioPlayer,
        isOpen: isOpenAudioPlayer
    } = useDisclosure();

    return {
        audioPlayerProps: {
            setEnableButton,
            enableButton,
            onOpenAudioPlayer,
            onCloseAudioPlayer,
            isOpenAudioPlayer,
            thermicalAudio
        }
    };
};
