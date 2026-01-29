import React from 'react';
import {
    copyToClipboard,
    getTwitterTitle,
    popUpCompartirMailTo,
    popUpCompartirNotaFB,
    popUpCompartirNotaTW,
    shareWhatsAppDesktop
} from '../../../private/LN/common/utils/shareHelper';
import Icon from '../../ui/ln/icon/default';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import getAudioEvents from '../../LN-10-global/common/utils/getAudioEvents';

export const SHARE_OPTIONS = [
    {
        id: 'whatsapp',
        label: 'WhatsApp',
        icon: <Icon name="whatsapp" />,
        tag: 'whatsapp',
        onClick: ({ requestUri, host, title }) => {
            shareWhatsAppDesktop(requestUri, host);
            addEventToDataLayerV2({
                event: 'share_note',
                title,
                rest: { tags: 'whatsapp' }
            });
        }
    },
    {
        id: 'link',
        label: 'Copiar link',
        icon: <Icon name="fileCopy" />,
        tag: 'link',
        onClick: ({ setCopied, title }) => {
            copyToClipboard();
            setCopied(true);

            addEventToDataLayerV2({
                event: 'share_note',
                title,
                rest: { tags: 'link' }
            });
        }
    },
    {
        id: 'facebook',
        label: 'Facebook',
        icon: <Icon name="facebook" />,
        tag: 'facebook',
        onClick: ({ requestUri, host, title }) => {
            popUpCompartirNotaFB(requestUri, host);
            addEventToDataLayerV2({
                event: 'share_note',
                title,
                rest: { tags: 'facebook' }
            });
        }
    },
    {
        id: 'x',
        label: 'X',
        icon: <Icon name="twitter" />,
        tag: 'x',
        onClick: ({ requestUri, host, title, mobileTitle }) => {
            const twitterTitle = getTwitterTitle(mobileTitle, title);
            popUpCompartirNotaTW(requestUri, host, twitterTitle);
            addEventToDataLayerV2({
                event: 'share_note',
                title,
                rest: { tags: 'x' }
            });
        }
    },
    {
        id: 'mail',
        label: 'Mail',
        icon: <Icon name="mail" />,
        tag: 'mail',
        onClick: ({ requestUri, host, title }) => {
            popUpCompartirMailTo(requestUri, host);
            addEventToDataLayerV2({
                event: 'share_note',
                title,
                rest: { tags: 'mail' }
            });
        }
    }
];

const handleShareClick = ({ shareButton, toggleShareMenu, noteId, title }) => {
    const isMobile =
        typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 768px)').matches &&
        typeof navigator.share === 'function';

    if (isMobile) {
        shareButton();

        addEventToDataLayerV2({
            event: 'share_note',
            articleId: noteId,
            title,
            rest: { tags: 'popup-nativo' }
        });

        return;
    }

    toggleShareMenu();
};

export const handleWhatsappShare = ({ requestUri, title, host }) => {
    const whatsappOption = SHARE_OPTIONS.find(
        option => option.id === 'whatsapp'
    );
    whatsappOption?.onClick({ requestUri, title, host });
};

export const handleClickAudioNews = ({
    onOpenAudioPlayer,
    globalContent,
    globalContentConfig,
    isSummary,
    subscription,
    token,
    openBarrier
} = {}) => {
    if (subscription && token) {
        onOpenAudioPlayer();
    } else {
        openBarrier();
    }

    addEventToDataLayerV2({
        event: 'page_listened',
        rest: {
            ...getAudioEvents(globalContent, globalContentConfig, isSummary),
            reproduccion: '0'
        }
    });
};

export default handleShareClick;
