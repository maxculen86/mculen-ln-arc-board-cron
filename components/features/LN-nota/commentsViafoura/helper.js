import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import get from '../../../private/common/utils/get';
import {
    getLoginAndRegistrationURLS,
    CALLBACKS_BY_CHANNEL_AND_EVENT
} from '../../../private/common/utils/commentsHelper';

export const loadViafoura = ({
    outputType,
    getCookie,
    subscription,
    setIsReady,
    setMessage
}) =>
    dynamicallyLoadScript('https://cdn.viafoura.net/vf-v2.js', 'body')
        .then(() => {
            const { loginUrl, registracionUrl } = getLoginAndRegistrationURLS();
            const token = getCookie('token');
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
                        registracionUrl,
                        setIsReady
                    });
                });

                if (
                    subscription &&
                    token &&
                    window.vf &&
                    window.vf.session &&
                    window.vf.session.login
                ) {
                    window.vf.session.login.cookie(token).catch(error => {
                        console.error('Viafoura Login incorrecto ', {
                            error,
                            outputType
                        });
                        setMessage({
                            title: 'Ahora para comentar debés tener Acceso Digital.',
                            subtitle: 'Iniciar sesión o suscribite',
                            secondaryUrl: loginUrl,
                            specialUrl: registracionUrl,
                            dark: true,
                            isExclusive: true
                        });
                    });
                }
            });
        })
        .catch(() => {});
