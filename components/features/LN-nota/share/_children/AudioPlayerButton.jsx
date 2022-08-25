import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ComButton from '../../../../private/common/com-button';
import AudioPlayer from '../../../../private/common/audioPlayer';
import '../../../../../resources/dist/css/ln/components/audio-player-button.css';

const AudioPlayerButton = () => {
    const [openPortal, setOpenPortal] = useState(false);
    const [prueba, setPrueba] = useState([]);
    const audioPlayerRender = () => {
        const pruebaElement = document.querySelector('.mod-share-container');
        const buttonHeadset = document.querySelector('#headset');
        if (pruebaElement) {
            setPrueba(pruebaElement);
            setOpenPortal(true);
        }
        if (buttonHeadset && pruebaElement)
            buttonHeadset.setAttribute('disabled', '');
    };
    return (
        <>
            <ComButton
                size="--fourxs"
                iconName="headset"
                title="Escuchar nota"
                classCondition="headset audio-player-button"
                onClick={audioPlayerRender}
                id="headset"
            />
            {openPortal ? ReactDOM.createPortal(<AudioPlayer />, prueba) : null}
        </>
    );
};

export default AudioPlayerButton;
