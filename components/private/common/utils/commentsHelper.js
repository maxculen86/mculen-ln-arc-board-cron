import { LOGIN_URL, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import { useContext } from 'react';
import { useContent } from 'fusion:content';
import { GlobalContext } from '../context/globalContext';
import findTermica from './findTermica';
import get from './get';

export const allowComments = props =>
    get(props, 'globalContent.type') === 'story' &&
    get(props, 'globalContent._id') &&
    get(props, 'globalContent.comments.display_comments', true) &&
    findTermica('livefyre');

export const shouldLoadViafoura = inputDate => {
    const gc = useContext(GlobalContext);
    const deadlineLivefyer = get(
        gc,
        'state.siteService.migration.deadline_livefyre'
    );

    const deadlineDate = deadlineLivefyer && new Date(deadlineLivefyer);
    const articlePublishDate = inputDate && new Date(inputDate);

    return (
        deadlineDate &&
        articlePublishDate &&
        articlePublishDate.setHours(0, 0, 0, 0) >=
            deadlineDate.setHours(0, 0, 0, 0)
    );
};

export const shouldLoadViafouraSSR = props => {
    const {
        globalContent: { first_publish_date: firstPublishDate } = {},
        arcSite: website
    } = props;
    return useContent({
        sourceName: 'navigationTreeSource',
        query: {
            website
        },
        transform: resp => {
            const showComments =
                get(props, 'globalContent.type') === 'story' &&
                get(props, 'globalContent._id') &&
                get(props, 'globalContent.comments.display_comments', true) &&
                get(resp, 'Termicas.livefyre', true);
            const deadlineLivefyre = get(resp, 'migration.deadline_livefyre');
            const deadlineDate = deadlineLivefyre && new Date(deadlineLivefyre);
            const articlePublishDate =
                firstPublishDate && new Date(firstPublishDate);
            return (
                showComments &&
                deadlineDate &&
                articlePublishDate &&
                articlePublishDate.setHours(0, 0, 0, 0) >=
                    deadlineDate.setHours(0, 0, 0, 0)
            );
        }
    });
};

export const validateComments = (props, subscription = false) => {
    const allow = get(props, 'globalContent.comments.allow_comments', true);
    const show = get(props, 'globalContent.comments.display_comments', true);
    // const subscription = get(props, 'globalContent.subscription', false);
    return {
        shouldLoad: shouldLoadViafouraSSR(props),
        allowComments: allow,
        showComments: show,
        messageType:
            (!allow && 'CLOSED_COMMENTS') || (!subscription && 'SUBSCRIPTION'),
        showCounter: show
    };
};

export const getMessageProps = (props, messageType) => {
    const canonicalUrl = get(props, 'globalContent.canonical_url', '');
    // const urlBase64 =
    //     Buffer.from(canonicalUrl, 'binary').toString('base64') || '';
    const urlBase64 =
        typeof window !== 'undefined' ? window.btoa(location.href) : '';
    const loginUrl = `${LOGIN_URL}${urlBase64}`;
    const registracionUrl = `${SITIO_SEGURO_REGISTRACION}/suscribirme?callback=${urlBase64}`;

    const MESSAGE_PROPS = {
        CLOSED_COMMENTS: {
            title: 'Nota cerrada a comentarios.',
            subtitle: ' ',
            icon: 'comment',
            text: 'Comentarios'
        },
        SUBSCRIPTION: {
            title: 'Ahora para comentar debés tener Acceso Digital.',
            subtitle: 'Ingresá o suscribite',
            secondaryUrl: (canonicalUrl && loginUrl) || '',
            specialUrl: (canonicalUrl && registracionUrl) || '',
            dark: true,
            isExclusive: true
        }
    };
    return MESSAGE_PROPS[messageType];
};

export default {
    allowComments,
    shouldLoadViafoura,
    shouldLoadViafouraSSR,
    validateComments
};
