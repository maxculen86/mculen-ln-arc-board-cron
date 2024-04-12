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
// import { addActionToDataLayer } from '../ActionsButtons/_helper';
import { addEventToDataLayer } from '../../../../private/LN/common/utils/shareHelper';

export const socials = [
    {
        type: 'button',
        onClick: ({ article }) => {
            addActionToDataLayer(article, 'compartir');
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
            addActionToDataLayer(article, 'compartir');
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
            addActionToDataLayer(article, 'compartir');
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
            addActionToDataLayer(article, 'compartir');
            const url = get(article, 'website_url', '');
            popUpCompartirMailTo(url, config.host);
        },
        title: 'Compartir por Email',
        text: 'Email',
        icon: <IconSprite name="email" />
    }
];

export const addActionToDataLayer = (article, action) => {
    const TYPES_LABEL = {
        7: 'receta',
        4: 'nota'
    };

    addEventToDataLayer({
        event: 'e_linkclick',
        category: 'interaction',
        label: TYPES_LABEL[get(article, 'subtype', '')] || '',
        action,
        title: get(article, 'headlines.basic', ''),
        articleId: get(article, '_id', '')
    });
};
