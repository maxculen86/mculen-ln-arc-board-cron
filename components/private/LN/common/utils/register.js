/* eslint-disable no-console */
import handleCookie from './handleCookie';

import siteConfig from '../../../../../properties/sites/la-nacion-ar';
import dynamicallyLoadScript from './dynamicallyLoadScript';
import getViewport from './screenHelper';

const { getCookie, setCookie } = handleCookie();
let messaging = null;
let deferredPrompt;

// TODO: refactor de todo este archivo o_O
const apiNotification = 'https://notificaciones.lanacion.com.ar/api/';
const topicName = 'Alertas_LA_NACION'; // 'pwatemp';

const validatePopupPwa = () => {
    const pwaInit = localStorage.getItem('pwaNotificationInit');
    if (!pwaInit) {
        return true;
    }

    const diff = (new Date(pwaInit) - new Date()) / 1000 / 60 / 60 / 24;
    if (diff >= 30) {
        return true;
    }
    return false;
};

// const addToHome = () =>
//     new Promise((resolve, reject) => {
//         reject(
//             new Error(
//                 'Lo sentimos, se produjo algún error al inicializar el app'
//             )
//         );
//     });

/*
async function getPushToken() {
   let tokenvalue;
   tokenvalue = await caches.open('v1').then(function (cache) {
       return cache.match('/pushtoken').then(function (val) {
           if (val.ok) {
               val.json().then(function (result) {
                   return result.token;
               });
           }
       })
   });
   return tokenvalue;
}
*/
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
    // console.log('SW: xxx');

    return new Promise((resolve, reject) => {
        // TODO: pasar beforeinstallprompt a sw?
        window.addEventListener('beforeinstallprompt', e => {
            console.log('SW: app beforeinstallprompt Event fired', e);
            e.preventDefault();
            deferredPrompt = e;
            const notificacionPwaSi = document.querySelector(
                '#notificacion-pwa-si'
            );
            const notificacionPwaNo = document.querySelector(
                '#notificacion-pwa-no'
            );
            if (notificacionPwaSi && notificacionPwaNo) {
                notificacionPwaSi.addEventListener('click', () => {
                    // ocultarPopupPwa();
                    showNoShowModal('#notificacion-modal-pwa', 'none');
                    // setShowModalApp(false);
                    e.prompt();
                    setDataLayer('notificationPrompt');

                    // e.userChoice will return a Promise.
                    // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
                    e.userChoice.then(choiceResult => {
                        console.log(choiceResult.outcome);
                        if (choiceResult.outcome === 'dismissed') {
                            console.log(
                                '[Service Worker] User cancelled home screen install'
                            );
                            try {
                                localStorage.setItem(
                                    'pwaNotificationInit',
                                    new Date()
                                );
                            } catch (err) {
                                console.log(
                                    'Error al intentar guardar pwaNotificationInit en localStorage'
                                );
                            }
                        } else {
                            setDataLayer('notificationConsent');
                        }
                    });
                });

                notificacionPwaNo.addEventListener('click', () => {
                    try {
                        localStorage.setItem('pwaNotificationInit', new Date());
                        showNoShowModal('#notificacion-modal-pwa', 'none');
                    } catch (err) {
                        console.log(
                            'Error al intentar guardar pwaNotificationInit en localStorage'
                        );
                    }
                });
            }

            // let mobileCheck = false;
            // (function(a) {
            //     if (
            //         /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            //             a
            //         ) ||
            //         /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            //             a.substr(0, 4)
            //         )
            //     )
            //         mobileCheck = true;
            // })(navigator.userAgent || navigator.vendor || window.opera);
            const { isMobile } = getViewport();
            if (validatePopupPwa() && isMobile) {
                // if (Cookie.LeerCookie(notifKey) && validatePopupPwa() && mobileCheck) {
                showNoShowModal('#notificacion-modal-pwa', 'block');
            }

            return false;
        });

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

// const updateRegister = () => {
//     if (Notification.permission === 'granted') {
//         /*
//         solo hace la actualizacion del token si tiene admitidas las notificaciones

//         navigator.serviceWorker.getRegistrations().then((reg) => {
//            console.log(reg);
//         }).catch(function (err) {
//            console.log('UPD SW: unreg ERROR', arguments);

//         });
//         */
//         checkSubscription();

//         console.log('[Service Worker] update registration');
//         /*
//         caches.open('sw').then(function (cache) {
//            cache.match('/pushtoken').then(function (val) {
//                if (val && val.ok) {
//                    val.json().then(function (result) {
//                        const tkn = result.token;
//                        registerSuscription(tkn, false);
//                    });
//                }
//            })
//         });
//         */
//     }
// };

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

    const ls = getCookie('ln-notification');

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
            setCookie('ln-notification', 'false', 43200);
            showNoShowModal('#notificacion-modal', 'none');
        });

        notifButtonYes.addEventListener('click', e => {
            e.preventDefault();
            setDataLayer('PushNoficationConsent');
            setCookie('ln-notification', 'true', 43200);
            showNoShowModal('#notificacion-modal', 'none');
            checkSubscription(true);
        });
    }
};

const displayNotificacion = () => {
    if (isNotificationDefault()) {
        setDataLayer('PushNoficationPrompt');
        showNoShowModal('#notificacion-modal', 'block');
    }
};
/*
const displayNotificacionError = () => {
    var modal = $('#notificacion-error-modal');

    $('#notificacion-error-btn').click(e => {
        e.preventDefault();
        modal.hide();
    });
    
    $('#notificacion-refresh-btn').click(e => {
        e.preventDefault();
        modal.hide();
        window.location.reload();
    });
    
    modal.show();
    dataLayer.push({
        'event': 'PushNoficationError'
    });
};
*/
const isNotificationDefault = () => {
    if ('Notification' in window) {
        return Notification.permission === 'default';
    }
    return false;
};

const checkSubscription = showError => {
    navigator.serviceWorker.ready.then(registration => {
        console.log(`[Service Worker] on ready = ${registration}`);
        registration.pushManager.getSubscription().then(subscription => {
            console.log(`[Service Worker] on ready = ${subscription}`);
            // var isSubscribed = !(subscription === null);
            // if (!isSubscribed) {
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
                        token !== localStorage.getItem('x-auth2-token') ||
                        localStorage.getItem('x-auth2-token') === null
                    ) {
                        try {
                            localStorage.setItem('x-auth2-token', token);
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
            //  }
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
            const options = { headers: { 'Content-Type': 'application/json' } };
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
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
            /*
            if (showError) {
                displayNotificacionError();
            }
            */
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
        Accept: 'application/json',
        'Content-Type': 'application/json'
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
            /*
            if (showError) {
                displayNotificacionError();
            }
            */
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

            // return new Promise((resolve, reject) => {});
        })()
    );
};

export default startPWASetup;
