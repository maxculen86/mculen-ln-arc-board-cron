import Redirect from './redirect';
import { setCallback } from './paywall';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';

const validateExclusiveAccess = ({
    contentCode,
    meteringVariant,
    host,
    path
}) => {
    if (contentCode === 'cerrada') {
        if (
            !['S', 'QSP'].includes(meteringVariant) &&
            path &&
            !path.match(
                /\/api\/(?:mobile\/)?v([1-2]+)\/notas\/(text\/)?(byId\/(.+)\/$|byUrl(\/.+\/$))/g
            )
        ) {
            const PAYWALL_URL = `${SITIO_SEGURO_REGISTRACION}/suscripcion/E/1/1/?callback=`;

            const callback = setCallback(host, path);

            throw new Redirect(`${PAYWALL_URL}${callback}`, 302);
        }

        return true;
    }

    return false;
};

export default validateExclusiveAccess;
