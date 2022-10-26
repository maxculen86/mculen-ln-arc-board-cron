/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */
import { LOGIN_URL, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/globalContext';
import useTermica from '../hooks/useTermica';
import get from './get';

export const CLOSED_BY_TERMIC = 'CLOSED_BY_TERMIC';
export const CLOSED_COMMENTS = 'CLOSED_COMMENTS';
export const SUBSCRIPTION = 'SUBSCRIPTION';

export const CALLBACKS_BY_CHANNEL_AND_EVENT = {
    authentication: {
        required: ({ registracionUrl }) => {
            if (registracionUrl) window.location.href = registracionUrl;
            return false;
        }
    },
    commenting: {
        loaded: ({ setIsReady, outputType }) => {
            outputType === 'default' && setIsReady && setIsReady(true);
            if (outputType === 'widgets') {
                const loader = document.getElementsByClassName('loader');
                loader && loader[0].classList.add('hlp-none');
            }
        }
    },
    comment: {
        created: ({ channel, event, args, window }) => {
            if (window.dataLayer !== 'undefined') {
                window.dataLayer.push({
                    event: 'Comentar',
                    Type: 'Comentar'
                });
            }
            return { channel, event, args };
        }
    },
    'comment-reply': {
        posted: ({ channel, event, args, window }) => {
            if (window.dataLayer !== 'undefined') {
                window.dataLayer.push({
                    event: 'Comentar',
                    Type: 'Responder'
                });
            }
            return { channel, event, args };
        }
    }
};

export const allowComments = props =>
    get(props, 'globalContent.type', '') === 'story' &&
    get(props, 'globalContent._id', '') &&
    get(props, 'globalContent.comments.display_comments', true);

export const shouldLoadViafoura = inputDate => {
    const gc = useContext(GlobalContext);
    const deadlineLivefyre = get(
        gc,
        'state.siteService.migration.deadline_livefyre'
    );

    const deadlineDate =
        deadlineLivefyre && new Date(`${deadlineLivefyre}T20:00:00`);
    const articlePublishDate = inputDate && new Date(inputDate);

    return (
        deadlineDate && articlePublishDate && articlePublishDate >= deadlineDate
    );
};

export const conditionallyCallViafoura = time => {
    const newNoteAbortFetch = t => {
        const differenceInMins = (new Date() - new Date(t)) / 60000;
        return differenceInMins < 10;
    };

    return shouldLoadViafoura(time) && !newNoteAbortFetch(time);
};

export const getLoginAndRegistrationURLS = () => {
    const urlBase64 =
        typeof window !== 'undefined' ? window.btoa(location.href) : '';

    return {
        loginUrl: `${LOGIN_URL}${urlBase64}`,
        registracionUrl: `${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${urlBase64}&cv=670&fc=744#`
    };
};

export const getMessageProps = (props, messageType, gc) => {
    const canonicalUrl = get(props, 'globalContent.canonical_url', '');
    const outputType = get(props, 'outputType', 'default');
    const termicas = get(gc, 'state.siteService.termicas', []);
    const element = termicas.find(
        ter => ter && ter.key === 'mensaje_para_cierre_de_comentarios'
    );
    const customMessage = (element && element.value) || '';
    const { loginUrl, registracionUrl } = getLoginAndRegistrationURLS();

    const MESSAGE_PROPS = {
        CLOSED_BY_TERMIC: {
            title: customMessage,
            subtitle: ' ',
            icon: 'comment',
            text: 'Comentarios'
        },
        CLOSED_COMMENTS: {
            title: 'Nota cerrada a comentarios.',
            subtitle: ' ',
            icon: 'comment',
            text: 'Comentarios'
        },
        SUBSCRIPTION: {
            title: 'Ahora para comentar debés tener Acceso Digital.',
            subtitle: 'Ingresá o suscribite',
            secondaryUrl:
                (outputType !== 'widgets' && canonicalUrl && loginUrl) || '',
            specialUrl:
                (outputType !== 'widgets' && canonicalUrl && registracionUrl) ||
                '',
            dark: true,
            isExclusive: true
        }
    };
    return MESSAGE_PROPS[messageType];
};

export const useValidateComments = (props, subscription) => {
    const gc = useContext(GlobalContext);
    const [data, setData] = useState({});
    const allow = get(props, 'globalContent.comments.allow_comments', true);
    const show = get(props, 'globalContent.comments.display_comments', true);
    const firstPublishDate = get(props, 'globalContent.first_publish_date');
    const termicaLivefyre = useTermica('livefyre');
    const shouldLoad =
        allowComments(props) && shouldLoadViafoura(firstPublishDate);

    useEffect(() => {
        const messageType =
            (!termicaLivefyre && CLOSED_BY_TERMIC) ||
            (!allow && CLOSED_COMMENTS) ||
            (!subscription && SUBSCRIPTION);

        setData({
            shouldLoad,
            allowComments: allow,
            showComments: show,
            messageProps: getMessageProps(props, messageType, gc),
            showCounter: show
        });
    }, [subscription, termicaLivefyre, allow, show, shouldLoad, props, gc]);

    const setMessage = message => {
        if (data.messageProps) {
            setData({ ...data, [data.messageProps]: message });
        }
    };

    return { ...data, setMessage };
};

export default {
    allowComments,
    shouldLoadViafoura,
    useValidateComments
};
