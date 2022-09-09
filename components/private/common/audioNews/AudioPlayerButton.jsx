/* eslint-disable react/require-default-props */
import React, { useState, useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import ComButton from '../com-button';
import AudioPlayer from '.';
import { BtnContainer, isSuscription } from '../../LN/common/utils/shareHelper';
import getToken from '../utils/getToken';
// import { isSuscription } from '../../../../private/LN/common/utils/shareHelper';
import useFetch from '../hooks/useFetch';
import LoadingIcon from '../../LN/common/loadingIcon';
import get from '../utils/get';
import { parseDate, handleClickAudioNews } from './helpers';
import { GlobalContext } from '../context/globalContext';

const AUDIO_NEWS_URL =
    'https://gfmjwmw73ls5ffo2w5t4lpfgj40trxvg.lambda-url.us-east-1.on.aws/api/v1/audio/status/';

const getEndpointAudioNews = (publishDate, noteId) => {
    const date = parseDate(publishDate);
    return date && noteId ? `${AUDIO_NEWS_URL}${date}/${noteId}` : null;
};

const AudioPlayerButton = ({
    isListenable = false,
    publishDate = '',
    noteId = ''
}) => {
    // const [openPortal, setOpenPortal] = useState(false);
    // const [prueba, setPrueba] = useState(false);
    // const [targetRenderButton, setTargetRenderButton] = useState(false);
    // const [widthContainer, setWidthContainer] = useState(false);
    const { dispatch } = useContext(GlobalContext) || {};

    const [openPlayer, setOpenPlayer] = useState(false);

    const publishDateMock = '20220901170232';
    const noteIdMock = '2KOBND62KNFVVBFQZOADNN6WNY';
    const endpoint = `https://gfmjwmw73ls5ffo2w5t4lpfgj40trxvg.lambda-url.us-east-1.on.aws/api/v1/audio/status/${publishDateMock}/${noteIdMock}`;

    const token = getToken();
    const suscription = isSuscription(token);

    const [data, loading, error] = useFetch({
        url: getEndpointAudioNews(publishDate, noteId)
    });
    const audioUrl = get(data, 'audio_url');
    // useEffect(() => {
    //     if (viewport === 'desktop' && subtype !== VIDEO) {
    //         const cuerpoNota = document.querySelector('#prueba') || false;
    //         setTargetRenderButton(cuerpoNota);
    //         setWidthContainer(true);
    //     }
    // }, [viewport, subtype]);

    // const audioPlayerRender = () => {
    //     // logica que deberia ocurrir solo en mobile y tablet
    //     const buttonHeadset = document.querySelector('#headset');
    //     if (viewport !== 'desktop' || subtype === VIDEO) {
    //         const pruebaElement = document.querySelector(
    //             '.mod-share-container'
    //         );
    //         if (pruebaElement) {
    //             setPrueba(pruebaElement);
    //             setOpenPortal(true);
    //         }
    //         if (buttonHeadset && pruebaElement)
    //             buttonHeadset.setAttribute('disabled', '');
    //     }
    //     // logica para desktop
    //     if (viewport === 'desktop' && subtype !== VIDEO) {
    //         const pruebaElement = document.querySelector(
    //             '#audio-player-container'
    //         );

    //         if (pruebaElement) {
    //             setPrueba(pruebaElement);
    //             setOpenPortal(true);
    //         }
    //         if (buttonHeadset && pruebaElement)
    //             buttonHeadset.setAttribute('disabled', '');
    //     }
    // };

    // const _component = (
    //     <BtnContainer
    //         withContainer={widthContainer}
    //         id="audio-player-container"
    //     >
    //         <ComButton
    //             size="--fourxs"
    //             iconName="headset"
    //             title="Escuchar nota"
    //             classCondition="headset audio-player-button --tertiary"
    //             onClick={audioPlayerRender}
    //             id="headset"
    //             textname="escuchar"
    //         />
    //         {/* {openPortal ? createPortal(<AudioPlayer />, prueba) : null} */}
    //     </BtnContainer>
    // );

    return (
        <>
            {isListenable && (
                // <BtnContainer withContainer id="audio-player-container">
                <div>
                    <ComButton
                        size="--fourxs"
                        iconName="headset"
                        title="Escuchar nota"
                        classCondition="headset audio-player-button --tertiary"
                        onClick={() =>
                            handleClickAudioNews(
                                token,
                                suscription,
                                setOpenPlayer,
                                dispatch
                            )
                        }
                        id="headset"
                        textname="escuchar"
                        disabled={openPlayer}
                        u
                    />
                    {(openPlayer && loading && <LoadingIcon />) ||
                        (openPlayer && !loading && (
                            <AudioPlayer audio={audioUrl} />
                        ))}
                </div>
                // </BtnContainer>
            )}
            {/* {targetRenderButton
                ? createPortal(_component, targetRenderButton)
                : _component} */}
        </>
    );
};

AudioPlayerButton.propTypes = {
    isListenable: PropTypes.bool,
    publishDate: PropTypes.string,
    noteId: PropTypes.string
};

export default AudioPlayerButton;
