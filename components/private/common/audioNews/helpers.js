/* eslint-disable no-param-reassign */
import React from 'react';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import addEventToDataLayer from '../../LN/common/utils/addEventToDataLayer';

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
    addEventToDataLayer({
        event: 'e_linkclick',
        action: 'toolbard',
        category: 'nota_ln9',
        label: 'Escuchar nota'
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
        '; path=/';
};

export const getCookie = name => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
};
