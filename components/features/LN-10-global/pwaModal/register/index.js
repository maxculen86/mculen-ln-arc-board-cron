import dynamicallyLoadScript from '../../../../private/LN/common/utils/dynamicallyLoadScript';
import { register, unregister, verify } from './serviceWorkerUtils';

const startPWASetup = deployment => {
    window.addEventListener(
        'load',
        (() => {
            // se detecta que ios para que no corra el sw
            const isSafari = !!navigator.userAgent.match(
                /Version\/[\d\.]+.*Safari/
            );
            const iOS =
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !window.MSStream;

            if (!isSafari && !iOS) {
                dynamicallyLoadScript(
                    'https://www.gstatic.com/firebasejs/5.11.1/firebase-app.js',
                    'body'
                )
                    .then(() => {
                        dynamicallyLoadScript(
                            'https://www.gstatic.com/firebasejs/5.11.1/firebase-messaging.js',
                            'body'
                        )
                            .then(() => {
                                if (verify()) {
                                    register(deployment)
                                        .then(swRegistration => {
                                            console.log(
                                                'SW: start',
                                                swRegistration
                                            );
                                        })
                                        .catch(err => {
                                            console.error('SW: error', err);
                                        });
                                } else {
                                    unregister()
                                        .then(r => console.log('SW: unreg ', r))
                                        .catch(err =>
                                            console.error('SW: unreg', err)
                                        );
                                }
                            })
                            .catch(() => {});
                    })
                    .catch(() => {});
            }
        })()
    );
};

export default startPWASetup;
