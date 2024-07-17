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
