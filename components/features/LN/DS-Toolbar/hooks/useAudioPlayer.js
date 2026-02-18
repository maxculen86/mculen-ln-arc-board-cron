import { useState } from 'react';
import { useDisclosure } from '@ln/hooks';
import useTermica from '../../../../private/common/hooks/useTermica';

const useAudioPlayer = ({ isListenable }) => {
    const [disableButton, setDisableButton] = useState(false);
    const thermicalAudio =
        !useTermica('hide_listening_articles') && isListenable;
    const {
        onOpen: onOpenAudioPlayer,
        onClose: onCloseAudioPlayer,
        isOpen: isOpenAudioPlayer
    } = useDisclosure();

    return {
        audioPlayerProps: {
            setDisableButton,
            disableButton,
            onOpenAudioPlayer,
            onCloseAudioPlayer,
            isOpenAudioPlayer,
            thermicalAudio
        }
    };
};

export default useAudioPlayer;
