/* eslint-disable react/require-default-props */
import React, { useState, useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import ComButton from '../com-button';
import { BtnContainer } from '../../LN/common/utils/shareHelper';
import getToken from '../utils/getToken';
import { handleClickAudioNews } from './helpers';
import BuildAudioPlayer from './BuildAudioPlayer';
import { isSubscribed } from '../../LN/common/utils/contextHelper';
import { GlobalContext } from '../context/globalContext';
import '../../../../resources/dist/css/ln/components/audio-player-desktop.css';

const AudioPlayerDesktop = ({
    publishDate = '',
    noteId = '',
    isListenable
}) => {
    const { dispatch } = useContext(GlobalContext) || {};

    const [openPlayer, setOpenPlayer] = useState(false);
    const token = getToken();
    const suscription = isSubscribed();

    return (
        <>
            {isListenable && (
                <BtnContainer withContainer id="audio-player-desktop">
                    <ComButton
                        size="--fivexs"
                        iconName="headset"
                        title="Escuchar nota"
                        classCondition="headset --tertiary"
                        onClick={() =>
                            handleClickAudioNews(
                                token,
                                suscription,
                                setOpenPlayer,
                                dispatch
                            )
                        }
                        textname="escuchar"
                        disabled={openPlayer}
                    />
                    {openPlayer && (
                        <BuildAudioPlayer
                            publishDate={publishDate}
                            noteId={noteId}
                        />
                    )}
                </BtnContainer>
            )}
        </>
    );
};

AudioPlayerDesktop.propTypes = {
    isListenable: PropTypes.bool,
    publishDate: PropTypes.string,
    noteId: PropTypes.string
};

export default AudioPlayerDesktop;
