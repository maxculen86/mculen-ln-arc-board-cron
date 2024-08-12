/* eslint-disable react/require-default-props */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import getToken from '../utils/getToken';
import { handleClickAudioNews } from './helpers';
import BuildAudioPlayer from './BuildAudioPlayer';
import { isSubscribed } from '../../LN/common/utils/contextHelper';
import { GlobalContext } from '../context/globalContext';
import useTermica from '../hooks/useTermica';
import classNames from 'classnames';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';

const AudioPlayerDesktop = ({ noteId = '', isListenable, className }) => {
    const { dispatch } = useContext(GlobalContext) || {};
    const [openPlayer, setOpenPlayer] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const token = getToken();
    const suscription = isSubscribed();
    const showListenButton =
        !useTermica('hide_listening_articles') && isListenable;

    const _class = classNames('mr-16', className);

    return (
        <>
            {showListenButton && (
                <div
                    className="btn-container l-only w-100 mb-32 ai-center transition transition-all transition-ease-in transition-duration-1000 min-h-56 hlp-paddingTop-16 hlp-paddingBottom-16 --d-grid"
                    id="audio-player-desktop"
                >
                    <Button
                        id="btnAudioDesktop"
                        title="Escuchar nota"
                        variant="primary"
                        dataEvent="LinkClick"
                        dataSection="Escuchar Nota"
                        className={_class}
                        onClick={() => {
                            handleClickAudioNews(
                                token,
                                suscription,
                                setOpenPlayer,
                                dispatch
                            );
                            // eventHandler({
                            //     activeWindow: window,
                            //     action: 'listenButton',
                            //     eventLabel: 'escuchar duplicado'
                            // });
                        }}
                        disabled={enableButton || openPlayer}
                    >
                        <Icon size={24} color="inherit">
                            <IconSprite name="listen" />
                        </Icon>
                        <Text>Escuchar</Text>
                    </Button>

                    {openPlayer && (
                        <BuildAudioPlayer
                            setEnableButton={setEnableButton}
                            noteId={noteId}
                            setOpenPlayer={setOpenPlayer}
                            loaderClass="m-0"
                        />
                    )}
                </div>
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
