import React from 'react';
import config from '../../../../../properties/sites/foodit';
import {
    popUpCompartirMailTo,
    popUpCompartirNotaFB,
    popUpCompartirNotaTW,
    shareWhatsAppDesktop
} from '../../../../private/LN/common/utils/shareHelper';
import get from '../../../../private/common/utils/get';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

export const socials = [
    {
        type: 'button',
        onClick: ({ article }) => {
            const url = get(article, 'website_url', '');
            const title = get(article, 'headlines.basic', '');

            popUpCompartirNotaFB(url, config.host, title);
        },
        title: 'Compartir por Facebook',
        text: 'Facebook',
        icon: <IconSprite name="facebook" />
    },
    {
        type: 'button',
        onClick: ({ article }) => {
            const url = get(article, 'website_url', '');
            const title = get(article, 'headlines.basic', '');

            popUpCompartirNotaTW(url, config.host, title);
        },
        title: 'Compartir por Twitter',
        text: 'Twitter',
        icon: <IconSprite name="twitter" />
    },
    {
        type: 'button',
        onClick: ({ article }) => {
            const url = get(article, 'website_url', '');
            const title = get(article, 'headlines.basic', '');

            shareWhatsAppDesktop(url, config.host, title);
        },
        title: 'Compartir por Whatsapp',
        text: 'Whatsapp',
        icon: <IconSprite name="whatsapp" />
    },
    {
        type: 'button',
        onClick: ({ article }) => {
            const url = get(article, 'website_url', '');
            popUpCompartirMailTo(url, config.host);
        },
        title: 'Compartir por Email',
        text: 'Email',
        icon: <IconSprite name="email" />
    }
];
