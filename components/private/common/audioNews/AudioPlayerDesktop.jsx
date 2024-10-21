/* eslint-disable react/require-default-props */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import classNames from 'classnames';
import getToken from '../utils/getToken';
import { handleClickAudioNews } from './helpers';
import BuildAudioPlayer from './BuildAudioPlayer';
import { GlobalContext } from '../context/globalContext';
import useTermica from '../hooks/useTermica';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../auth/helper/loginHelper';
import { addEventToDataLayerV2 } from '../../LN/common/utils/addEventToDataLayer';
import getAudioEvents from '../../../features/LN-10-global/common/utils/getAudioEvents';
import handleCookie from '../../LN/common/utils/handleCookie';

function AudioPlayerDesktop({ noteId = '', isListenable, className }) {
    const { globalContent = {}, globalContentConfig = {} } = useAppContext();
    const { dispatch } = useContext(GlobalContext) || {};
    const [openPlayer, setOpenPlayer] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const { getCookie } = handleCookie();
    const [contentVariant] = useState(getCookie('contentVariant') || 'article');
    const token = getToken();
    const suscription = isSubscribed(SUBSCRIBED_HELPER.LN);
    const showListenButton =
        !useTermica('hide_listening_articles') && isListenable;

    const _class = classNames('mr-16 ai-start_l', className);
    if (!showListenButton) return null;
    return (
        <div
            className="btn-container l-only w-100 mb-32 ai-start transition transition-all transition-ease-in transition-duration-1000 min-h-56 py-16 grid border border-bottom border-thin border-neutral-light-100"
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
                    addEventToDataLayerV2({
                        event: 'page_listened',
                        rest: getAudioEvents(
                            globalContent,
                            globalContentConfig,
                            contentVariant
                        )
                    });
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
    );
}

AudioPlayerDesktop.propTypes = {
    isListenable: PropTypes.bool,
    noteId: PropTypes.string,
    className: PropTypes.string
};

export default AudioPlayerDesktop;
