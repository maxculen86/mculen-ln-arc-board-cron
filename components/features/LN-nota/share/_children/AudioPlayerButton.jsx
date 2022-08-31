/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import { createPortal } from 'react-dom';
import ComButton from '../../../../private/common/com-button';
import AudioPlayer from '../../../../private/common/audioPlayer';
import getViewportSize from '../../../../private/common/hooks/useViewportSize';
import { BtnContainer } from '../../../../private/LN/common/utils/shareHelper';
import { VIDEO } from '../../../../private/common/utils/subtypes/subtypeHelper';
import '../../../../../resources/dist/css/ln/components/audio-player-button.css';

const AudioPlayerButton = ({ subtype = '' }) => {
    const [openPortal, setOpenPortal] = useState(false);
    const [prueba, setPrueba] = useState(false);
    const [targetRenderButton, setTargetRenderButton] = useState(false);
    const [widthContainer, setWidthContainer] = useState(false);

    const viewport = getViewportSize();

    useEffect(() => {
        if (viewport === 'desktop' && subtype !== VIDEO) {
            const cuerpoNota = document.querySelector('#prueba') || false;
            setTargetRenderButton(cuerpoNota);
            setWidthContainer(true);
        }
    }, [viewport, subtype]);

    const audioPlayerRender = () => {
        // logica que deberia ocurrir solo en mobile y tablet
        const buttonHeadset = document.querySelector('#headset');
        if (viewport !== 'desktop' || subtype === VIDEO) {
            const pruebaElement = document.querySelector(
                '.mod-share-container'
            );
            if (pruebaElement) {
                setPrueba(pruebaElement);
                setOpenPortal(true);
            }
            if (buttonHeadset && pruebaElement)
                buttonHeadset.setAttribute('disabled', '');
        }
        // logica para desktop
        if (viewport === 'desktop' && subtype !== VIDEO) {
            const pruebaElement = document.querySelector(
                '#audio-player-container'
            );
            if (pruebaElement) {
                setPrueba(pruebaElement);
                setOpenPortal(true);
            }
            if (buttonHeadset && pruebaElement)
                buttonHeadset.setAttribute('disabled', '');
        }
    };

    const _component = (
        <BtnContainer
            withContainer={widthContainer}
            id="audio-player-container"
        >
            <ComButton
                size="--fourxs"
                iconName="headset"
                title="Escuchar nota"
                classCondition="headset audio-player-button --tertiary"
                onClick={audioPlayerRender}
                id="headset"
                textname="escuchar"
            />
            {openPortal ? createPortal(<AudioPlayer />, prueba) : null}
        </BtnContainer>
    );

    return (
        <>
            {targetRenderButton
                ? createPortal(_component, targetRenderButton)
                : _component}
        </>
    );
};

AudioPlayerButton.propTypes = {
    subtype: PropTypes.string
};

export default AudioPlayerButton;
