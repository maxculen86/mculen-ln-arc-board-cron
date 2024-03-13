import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import handleCookie from '../../../private/LN/common/utils/handleCookie';
import {
    CALLBACKS_BY_CHANNEL_AND_EVENT,
    getLoginAndRegistrationURLS,
    getLoginAndRegistrationURLSFoodit
} from '../../../private/common/utils/commentsHelper';
import get from '../../../private/common/utils/get';

export const loginViafoura = ({
    outputType,
    setIsReady,
    setMessage,
    subscription
}) => {
    const { getCookie } = handleCookie();

    dynamicallyLoadScript('https://cdn.viafoura.net/vf-v2.js', 'body')
        .then(() => {
            const {
                loginUrl,
                registracionUrl
            } = getLoginAndRegistrationURLSFoodit();
            const token = getCookie('token');
            window.vfQ = window.vfQ || [];
            window.vfQ.push(() => {
                window.vf.$prepublish((channel, event, ...args) => {
                    const _callback = get(
                        CALLBACKS_BY_CHANNEL_AND_EVENT,
                        `${channel}.${event}`,
                        () => ({
                            channel,
                            event,
                            args
                        })
                    );
                    return _callback({
                        channel,
                        event,
                        args,
                        window,
                        outputType,
                        registracionUrl,
                        setIsReady
                    });
                });
                subscription &&
                    token &&
                    window.vf &&
                    window.vf.session &&
                    window.vf.session.login
                        .cookie(token)
                        .then(successMessage => {
                            console.log(
                                'Viafoura Login correcto ',
                                successMessage
                            );
                        })
                        .catch(error => {
                            console.error('Viafoura Login incorrecto ', {
                                error,
                                outputType
                            });
                            setMessage({
                                title:
                                    'Ahora para comentar debés tener Acceso Digital.',
                                subtitle: 'Iniciar sesión o suscribite',
                                secondaryUrl: loginUrl,
                                specialUrl: registracionUrl,
                                dark: true,
                                isExclusive: true
                            });
                        });
            });
        })
        .catch(error => {});
};
