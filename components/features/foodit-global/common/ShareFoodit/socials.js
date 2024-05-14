import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import {
    popUpCompartirMailTo,
    popUpCompartirNotaFB,
    popUpCompartirNotaTW,
    shareWhatsAppDesktop
} from '../../../../private/LN/common/utils/shareHelper';
import get from '../../../../private/common/utils/get';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import addActionToDataLayer from '../utils/addActionToDataLayer';

export const socials = [
    {
        type: 'button',
        onClick: ({ article }) => {
            addActionToDataLayer(article, 'compartir');
            const url = get(article, 'website_url', '');
            const title = get(article, 'headlines.basic', '');

            popUpCompartirNotaFB(url, SITE_FOODIT, title);
        },
        title: 'Compartir por Facebook',
        text: 'Facebook',
        icon: <IconSprite name="facebook" />
    },
    {
        type: 'button',
        onClick: ({ article }) => {
            addActionToDataLayer(article, 'compartir');
            const url = get(article, 'website_url', '');
            const title = get(article, 'headlines.basic', '');

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
            const url = get(article, 'website_url', '');
            const title = get(article, 'headlines.basic', '');

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
            const url = get(article, 'website_url', '');
            popUpCompartirMailTo(url, SITE_FOODIT);
        },
        title: 'Compartir por Email',
        text: 'Email',
        icon: <IconSprite name="email" />
    }
];
