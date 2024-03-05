import Redirect from './redirect';
import { setCallback } from './paywall';

const validateExclusiveAccess = ({
    contentCode,
    meteringVariant,
    host,
    path,
    paywallUrl
}) => {
    if (contentCode === 'cerrada') {
        if (
            !['S', 'QSP'].includes(meteringVariant) &&
            path &&
            !path.match(
                /\/api\/(?:mobile\/)?v([1-2]+)\/notas\/(text\/)?(byId\/(.+)\/$|byUrl(\/.+\/$))/g
            )
        ) {
            const callback = setCallback(host, path);

            throw new Redirect(`${paywallUrl}${callback}`, 302);
        }

        return true;
    }

    return false;
};

export default validateExclusiveAccess;
