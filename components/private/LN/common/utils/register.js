/* eslint-disable no-console */
import handleCookie from './handleCookie';

import siteConfig from '../../../../../properties/sites/la-nacion-ar';
import dynamicallyLoadScript from './dynamicallyLoadScript';

const { getCookie, setCookie } = handleCookie();
let messaging = null;

const apiNotification = 'https://notificaciones.lanacion.com.ar/api/';
const topicName = 'Alertas_LA_NACION'; // 'pwatemp';
const notificationModal = '#notificacion-modal';
const aplicationJson = 'application/json';

const verify = () => {
    return true && 'serviceWorker' in navigator;
};

const unregister = () => {
    return new Promise((resolve, reject) => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .getRegistrations()
                .then(registrations => {
                    const { length } = registrations || [];

                    for (const registration of registrations) {
                        console.log('SW: unreg', registration);
                        registration.unregister();
                    }

                    resolve(length);
                })
                .catch(err => {
                    console.log('SW: unreg ERROR', err);
                    reject(err);
                });
        } else {
            reject(new Error('serviceWorker == undefined'));
        }
    });
};

const register = deployment => {
    return new Promise((resolve, reject) => {
        if ('serviceWorker' in navigator) {
            console.log('[Service Worker] Will the service worker register?');
            navigator.serviceWorker
                .register(`/sw.js?d=${deployment}`)
                .then(reg => {
                    initialize();
                    console.log('[Service Worker] Yes, it did.');
                })
                .catch(err => {
                    console.log(
                        "[Service Worker] No it didn't. This happened: ",
                        err
                    );
                });
        }
    });
};

const showNoShowModal = (id, value) => {
    const modal = document.querySelector(id);
    if (modal) modal.style.display = value;
};

const setDataLayer = event => {
    if (dataLayer) {
        dataLayer.push({
            event: event
        });
    }
};

const initialize = () => {
    if (typeof firebase !== 'undefined') {
        const { firebase: firebaseConfig = {} } = siteConfig || {};
        firebase.initializeApp(firebaseConfig);

        messaging = firebase.messaging();
    }
    const lnNotification = 'ln-notification';
    const ls = getCookie(lnNotification);

    document.addEventListener('freeze', e => {
        console.log('freeze');
    });
    document.addEventListener('resume', e => {
        console.log('resume');
    });

    if (!ls) {
        displayNotificacion();
    }

    const notifButtonNo = document.querySelector('#notificacion-no');
    const notifButtonYes = document.querySelector('#notificacion-si');

    if (notifButtonNo && notifButtonYes) {
        notifButtonNo.addEventListener('click', e => {
            e.preventDefault();
            setDataLayer('PushNoficationDismiss');
            setCookie(lnNotification, 'false', 43200);
            showNoShowModal(notificationModal, 'none');
        });

        notifButtonYes.addEventListener('click', e => {
            e.preventDefault();
            setDataLayer('PushNoficationConsent');
            setCookie(lnNotification, 'true', 43200);
            showNoShowModal(notificationModal, 'none');
            checkSubscription(true);
        });
    }
};

const displayNotificacion = () => {
    if (isNotificationDefault()) {
        setDataLayer('PushNoficationPrompt');
        showNoShowModal(notificationModal, 'block');
    }
};

const isNotificationDefault = () => {
    if ('Notification' in window) {
        return Notification.permission === 'default';
    }
    return false;
};

const checkSubscription = showError => {
    const authToken = 'x-auth2-token';
    navigator.serviceWorker.ready.then(registration => {
        console.log(`[Service Worker] on ready = ${registration}`);
        registration.pushManager.getSubscription().then(subscription => {
            console.log(`[Service Worker] on ready = ${subscription}`);
            messaging.useServiceWorker(registration);
            messaging
                .requestPermission()
                .then(() => handleToken())
                .then(token => {
                    console.log('[Service Worker] Notificaciones Admitidas');
                    try {
                        localStorage.setItem('x-auth3-token', token);
                    } catch (e) {
                        console.log(
                            'Error al intentar guardar x-auth3-token en localStorage'
                        );
                    }

                    /* En caso de utilizar el firebase storage  para almacenar
                        caches.open('sw').then(function (cache) {
                            cache.match('/pushtoken').then(function (val) {
                                if (val && val.ok) {
                                    val.json().then(function (result) {
                                        if (token != result.token) {
                                            localStorage.setItem('x-auth4-token', token);
                                        }
                                    });
                                }
                            })
                        });
                    */

                    if (
                        token !== localStorage.getItem(authToken) ||
                        localStorage.getItem(authToken) === null
                    ) {
                        try {
                            localStorage.setItem(authToken, token);
                            registerSuscription(token, showError);
                        } catch (e) {
                            console.log(
                                'Error al intentar guardar x-auth2-token en localStorage'
                            );
                        }
                    }
                })
                .catch(err => {
                    console.log('[Service Worker] Notificaciones denegadas');
                });
        });
    });
};

const handleToken = () => {
    return messaging.getToken();
};

const savePushTokenCache = token => {
    caches
        .open('sw')
        .then(cache => {
            const options = { headers: { 'Content-Type': aplicationJson } };
            const response = JSON.stringify({
                token
            });
            cache.put('/pushtoken', new Response(response, options));
        })
        .catch(e => {
            console.log('caches error', e);
        });
};

// Registrar dispositivo en api notificaciones
const registerSuscription = (token, showError) => {
    // Guarda el token en cache
    savePushTokenCache(token);

    const body = JSON.stringify({ token });

    const apiUrl = `${apiNotification}notification/register/`;

    const headers = {
        Accept: aplicationJson,
        'Content-Type': aplicationJson,
        'x-token': getCookie('token')
    };
    fetch(apiUrl, {
        method: 'post',
        headers,
        body
    })
        .then(response => response.json())
        .then(res => {
            console.log('device notifications registered.', res);
            registerTopic(topicName, token, showError);
        })
        .catch(err => {
            console.log('device notifications error: ', err);
        });
};

// Registrar topico en api notificaciones
const registerTopic = (topic, token, showError) => {
    const body = JSON.stringify({
        token,
        topicName: topic
    });

    const apiUrl = `${apiNotification}notification/subscriptions/`;
    const headers = {
        Accept: aplicationJson,
        'Content-Type': aplicationJson
    };

    fetch(apiUrl, {
        method: 'post',
        headers,
        body
    })
        .then(response => response.json())
        .then(res => {
            if (res.status === 200) {
                console.log('topic registered.');
                return true;
            }
            return false;
        })
        .catch(err => {
            console.log('device notifications error: ', err);
        });
};

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
