import {
    copyToClipboard,
    getTwitterTitle,
    popUpCompartirMailTo,
    popUpCompartirNotaFB,
    popUpCompartirNotaTW
} from '../../../private/LN/common/utils/shareHelper';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import getAudioEvents from '../../LN-10-global/common/utils/getAudioEvents';

export const SHARE_OPTIONS = [
    {
        id: 'share_option_link',
        label: ({ copied }) => (copied ? '¡Enlace copiado!' : 'Copiar enlace'),
        icon: ({ copied }) => (copied ? 'check' : 'file-copy'),
        tag: 'link',
        onClick: ({ setCopied, title, host, requestUri }) => {
            copyToClipboard(host, requestUri);
            setCopied(true);
            addEventToDataLayerV2({
                event: 'share_note',
                title,
                rest: { tags: 'link' }
            });
        },
        color: 'custom',
        className: ({ copied }) =>
            copied
                ? 'text-success-default'
                : 'text-secondary-default hover:text-secondary-light'
    },
    {
        id: 'share_option_facebook',
        label: 'Publicar en Facebook',
        icon: 'facebook',
        tag: 'facebook',
        onClick: ({ requestUri, host, title }) => {
            popUpCompartirNotaFB(requestUri, host);
            addEventToDataLayerV2({
                event: 'share_note',
                title,
                rest: { tags: 'facebook' }
            });
        },
        color: 'secondary'
    },
    {
        id: 'share_option_x',
        label: 'Compartir en X (Twitter)',
        icon: 'x',
        tag: 'x',
        onClick: ({ requestUri, host, title, mobileTitle }) => {
            const twitterTitle = getTwitterTitle(mobileTitle, title);
            popUpCompartirNotaTW(requestUri, host, twitterTitle);
            addEventToDataLayerV2({
                event: 'share_note',
                title,
                rest: { tags: 'x' }
            });
        },
        color: 'secondary'
    },
    {
        id: 'share_option_mail',
        label: 'Enviar un E-Mail',
        icon: 'mail',
        tag: 'mail',
        onClick: ({ requestUri, host, title }) => {
            popUpCompartirMailTo(requestUri, host);
            addEventToDataLayerV2({
                event: 'share_note',
                title,
                rest: { tags: 'mail' }
            });
        },
        color: 'secondary'
    }
];

export const handleShareNativeTrigger = ({
    shareNativeTrigger,
    noteId,
    title
}) => {
    const isMobile =
        typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 1280px)').matches &&
        typeof navigator.share === 'function';

    if (isMobile) {
        shareNativeTrigger();

        addEventToDataLayerV2({
            event: 'share_note',
            articleId: noteId,
            title,
            rest: { tags: 'popup-nativo' }
        });
    }
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

// TODO: remover al quitar data-tw post migracion, se necesita momentaneamente para evitar conflictos de selectores css.
export const handleVisibilityChanged = event => {
    if (event?.changedProps?.showBottomWidget?.currentValue === true) {
        const el = document.querySelector('.time-indicator.standard.fixed');
        if (el) {
            el.style.setProperty('position', 'relative', 'important');
        }
    }
};
