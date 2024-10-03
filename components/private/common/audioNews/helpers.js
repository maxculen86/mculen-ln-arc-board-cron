/* eslint-disable no-param-reassign */
import React from 'react';
import { DOMINIO_COOKIE } from 'fusion:environment';
import { addEventToDataLayerV2 } from '../../LN/common/utils/addEventToDataLayer';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';

export const getIconByOpenPlayer = enableButton =>
    enableButton
        ? { headphoneIcon: <IconSprite name="headphoneFilled" /> }
        : { headphoneIcon: <IconSprite name="headphone" /> };

export const handleClickAudioNews = (
    token,
    suscription,
    setOpenPlayer,
    dispatch
) => {
    addEventToDataLayerV2({
        event: 'e_linkclick',
        action: 'escuchar',
        category: 'nota_ln9',
        label: 'escuchar_completo'
    });
    if (token && suscription) setOpenPlayer(true);

    (!suscription || !token) &&
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                open: true,
                origin: 'audioNews',
                typeAlert: 'exclusive-ln',
                typeModal: 'barrier'
            }
        });
};

export const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
        name +
        '=' +
        encodeURIComponent(value) +
        '; expires=' +
        expires +
        '; domain=' +
        DOMINIO_COOKIE +
        '; path=/';
};

export const getCookie = name => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
};

export const IA_AUDIO_SUMMARY_TRACKING_STORAGE = {
    key: 'IA-audio-summary-tracking',
    value: 'wasDisplayed'
};
