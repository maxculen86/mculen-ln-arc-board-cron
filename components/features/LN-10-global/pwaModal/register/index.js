import dynamicallyLoadScript from '../../../../private/LN/common/utils/dynamicallyLoadScript';
import { register, unregister, verify } from './serviceWorkerUtils';

const startPWASetup = deployment => {
    window.addEventListener('load', async () => {
        const isSafari = !!navigator.userAgent.match(
            /Version\/[\d\.]+.*Safari/
        );
        const iOS =
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        if (!isSafari && !iOS) {
            try {
                await dynamicallyLoadScript(
                    'https://www.gstatic.com/firebasejs/5.11.1/firebase-app.js',
                    'body'
                );
                await dynamicallyLoadScript(
                    'https://www.gstatic.com/firebasejs/5.11.1/firebase-messaging.js',
                    'body'
                );
                if (verify()) {
                    try {
                        await register(deployment);
                    } catch (err) {
                        console.error('SW: error', err);
                    }
                } else {
                    try {
                        await unregister();
                    } catch (err) {
                        console.error('SW: unreg', err);
                    }
                }
            } catch (err) {
                console.error('Error al cargar los scripts de Firebase.', err);
            }
        }
    });
};

export default startPWASetup;
