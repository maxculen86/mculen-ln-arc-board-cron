import React from 'react';
import { cx } from '@ln/cva';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import {
    copyToClipboard,
    getTwitterTitle,
    popUpCompartirMailTo,
    popUpCompartirNotaFB,
    popUpCompartirNotaTW,
    shareWhatsAppDesktop
} from '../../../private/LN/common/utils/shareHelper';

const className = {
    onlyMobile: 'lg-none',
    onlyDesktop: 'lg-only'
};

export const shareVideoConfig = [
    {
        id: 'compartirMobile',
        title: 'Compartir el video',
        className: className.onlyMobile,
        iconProps: { name: 'reply' },
        onClick: ({ videoId, basic, shareButton }) => {
            shareButton();
            addEventToDataLayerV2({
                event: 'share_video',
                title: basic,
                rest: { id_video: videoId, tags: 'Nativo' }
            });
        }
    },
    {
        id: 'whatsAppShareDesktop',
        title: 'Compartir el video en WhatsApp',
        className: className.onlyDesktop,
        iconProps: { name: 'whatsapp' },
        onClick: ({ videoId, basic, url, host }) => {
            shareWhatsAppDesktop(url, host);
            addEventToDataLayerV2({
                event: 'share_video',
                title: basic,
                rest: { id_video: videoId, tags: 'whatsapp' }
            });
        }
    },
    {
        id: 'copyLinkNote',
        title: 'Copiar link del video',
        className: className.onlyDesktop,
        onClick: ({ videoId, basic, setCopy, url, host, onShowTooltip }) => {
            copyToClipboard(host, url);
            if (onShowTooltip) {
                onShowTooltip();
            }
            setCopy(true);
            addEventToDataLayerV2({
                event: 'share_video',
                title: basic,
                rest: { id_video: videoId, tags: 'copiar link' }
            });
        },
        iconProps: { name: 'fileCopy' },
        showTooltip: true,
        tooltipProps: {
            position: 'right-center',
            hideArrow: false,
            toggleOn: 'click',
            disableTrigger: true,
            content: <span className="text-12">Copiado</span>,
            className:
                'flex ai-center h-32 rounded-4 p-8 bg-blue-500 text-light-50'
        }
    },
    {
        id: 'btnfacebook',
        title: 'Compartir el video en Facebook',
        className: className.onlyDesktop,
        onClick: ({ videoId, basic, url, host }) => {
            popUpCompartirNotaFB(url, host);
            addEventToDataLayerV2({
                event: 'share_video',
                title: basic,
                rest: { id_video: videoId, tags: 'compartir facebook' }
            });
        },
        iconProps: { name: 'facebook' }
    },
    {
        id: 'btntwitter',
        title: 'Compartir el video en X',
        className: className.onlyDesktop,
        onClick: ({ videoId, mobileTitle, basic, url, host }) => {
            const twitterTitle = getTwitterTitle(mobileTitle, basic);
            popUpCompartirNotaTW(url, host, twitterTitle);
            addEventToDataLayerV2({
                event: 'share_video',
                title: basic,
                rest: { id_video: videoId, tags: 'compartir x' }
            });
        },
        iconProps: { name: 'twitter' }
    },
    {
        id: 'btnemail',
        title: 'Compartir el video por E-mail',
        onClick: ({ videoId, basic, url, host }) => {
            popUpCompartirMailTo(url, host);
            addEventToDataLayerV2({
                event: 'share_video',
                title: basic,
                rest: { id_video: videoId, tags: 'enviar mail' }
            });
        },
        className: cx('email', className.onlyDesktop),
        iconProps: { name: 'mail' }
    }
];
