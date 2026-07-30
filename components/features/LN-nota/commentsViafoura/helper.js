import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import { getAuthTokens } from '../../../private/common/auth/helper/loginHelper';
import get from '../../../private/common/utils/get';
import {
    getLoginAndRegistrationURLS,
    CALLBACKS_BY_CHANNEL_AND_EVENT
} from '../../../private/common/utils/commentsHelper';

const getSubscriptionMessage = ({ loginUrl, registracionUrl }) => ({
    title: 'Ahora para comentar debés tener Acceso Digital.',
    subtitle: 'Iniciar sesión o suscribite',
    secondaryUrl: loginUrl,
    specialUrl: registracionUrl,
    dark: true,
    isExclusive: true
});

export const syncViafouraSession = async ({
    subscription,
    outputType,
    setMessage,
    loginUrl,
    registracionUrl
}) => {
    const login = get(window, 'vf.session.login');

    try {
        const { token: idToken } = await getAuthTokens();

        if (!subscription || !idToken || !login?.openIdConnect) {
            return;
        }
        await login.openIdConnect(idToken);
    } catch (error) {
        console.error('Viafoura Login incorrecto ', {
            error,
            outputType
        });
        setMessage(getSubscriptionMessage({ loginUrl, registracionUrl }));
    }
};

const syncWhenUclIsReady = params => {
    if (window.UCL) {
        return;
    }

    window.addEventListener(
        'ucl-ready',
        () => {
            syncViafouraSession(params);
        },
        { once: true }
    );
};

export const loadViafoura = ({
    outputType,
    getCookie,
    subscription,
    setIsReady,
    setMessage,
    articleId
}) =>
    dynamicallyLoadScript('https://cdn.viafoura.net/vf-v2.js', 'body')
        .then(() => {
            const { loginUrl, registracionUrl } = getLoginAndRegistrationURLS();
            const sessionToken = getCookie('token');
            window.vfQ = window.vfQ || [];
            window.vfQ.push(() => {
                window.vf.$prepublish((channel, event, ...args) => {
                    const callback = get(
                        CALLBACKS_BY_CHANNEL_AND_EVENT,
                        `${channel}.${event}`,
                        () => ({
                            channel,
                            event,
                            args
                        })
                    );
                    return callback({
                        channel,
                        event,
                        args,
                        window,
                        outputType,
                        loginUrl,
                        registracionUrl,
                        sessionToken,
                        subscription,
                        setIsReady,
                        articleId
                    });
                });

                const syncParams = {
                    subscription,
                    outputType,
                    setMessage,
                    loginUrl,
                    registracionUrl
                };

                syncViafouraSession(syncParams);
                syncWhenUclIsReady(syncParams);
            });
        })
        .catch(error => {
            console.error('Error loading Viafoura script', error);
        });
