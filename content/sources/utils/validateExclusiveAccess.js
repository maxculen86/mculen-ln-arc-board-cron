import Redirect from './redirect';
import { addRandomParam } from './paywall';

const validateExclusiveAccess = ({
    contentCode,
    meteringVariant,
    host,
    path
}) => {
    if (contentCode === 'cerrada') {
        if (meteringVariant !== 'S') {
            const PAYWALL_URL =
                'https://suscripciones.lanacion.com.ar/suscripcion/E/1/1/?callback=';

            const callback = Buffer.from(addRandomParam(host + path)).toString(
                'base64'
            );

            throw new Redirect(PAYWALL_URL + callback, 301);
        }

        return true;
    }

    return false;
};

export default validateExclusiveAccess;
