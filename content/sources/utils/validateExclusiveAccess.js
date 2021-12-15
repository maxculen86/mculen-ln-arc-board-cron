import Redirect from './redirect';
import { setCallback } from './paywall';

const validateExclusiveAccess = ({
    contentCode,
    meteringVariant,
    host,
    path
}) => {
    if (contentCode === 'cerrada') {
        if (
            meteringVariant !== 'S' &&
            !path.match(
                /\/api\/v([1-2]+)\/notas\/(byId\/(.+)\/$|byUrl(\/.+\/$))/g
            )
        ) {
            const PAYWALL_URL =
                'https://suscripciones.lanacion.com.ar/suscripcion/E/1/1/?callback=';

            const callback = setCallback(host, path);

            throw new Redirect(`${PAYWALL_URL}${callback}`, 301);
        }

        return true;
    }

    return false;
};

export default validateExclusiveAccess;
