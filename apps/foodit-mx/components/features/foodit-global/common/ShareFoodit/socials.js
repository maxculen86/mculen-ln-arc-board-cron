import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import {
    popUpCompartirMailTo,
    popUpCompartirNotaFB,
    popUpCompartirNotaTW,
    shareWhatsAppDesktop
} from '../../../../private/LN/common/utils/shareHelper';
import get from '../../../../private/common/utils/get';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import addActionToDataLayer from '../utils/addActionToDataLayer';

const getUrlAndTitle = article => ({
    url: get(article, 'website_url', ''),
    title: get(article, 'headlines.basic', '')
});

export const socials = [
    {
        type: 'button',
        onClick: ({ article }) => {
            addActionToDataLayer(article, 'compartir');
            const { url } = getUrlAndTitle(article);
            popUpCompartirNotaFB(url, SITE_FOODIT);
        },
        title: 'Compartir por Facebook',
        text: 'Facebook',
        icon: <IconSprite name="facebook" />
    },
    {
        type: 'button',
        onClick: ({ article }) => {
            addActionToDataLayer(article, 'compartir');
            const { url, title } = getUrlAndTitle(article);
            popUpCompartirNotaTW(url, SITE_FOODIT, title);
        },
        title: 'Compartir por Twitter',
        text: 'Twitter',
        icon: <IconSprite name="twitter" />
    },
    {
        type: 'button',
        onClick: ({ article }) => {
            addActionToDataLayer(article, 'compartir');
            const { url, title } = getUrlAndTitle(article);
            shareWhatsAppDesktop(url, SITE_FOODIT, title);
        },
        title: 'Compartir por Whatsapp',
        text: 'Whatsapp',
        icon: <IconSprite name="whatsapp" />
    },
    {
        type: 'button',
        onClick: ({ article }) => {
            addActionToDataLayer(article, 'compartir');
            const { url } = getUrlAndTitle(article);
            popUpCompartirMailTo(url, SITE_FOODIT);
        },
        title: 'Compartir por Email',
        text: 'Email',
        icon: <IconSprite name="email" />
    }
];
