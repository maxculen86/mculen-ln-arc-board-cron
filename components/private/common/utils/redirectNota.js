import { SITE_LANACION } from 'fusion:environment';
import getQueryParamValue from './getQueryParamValue';

const redirectNota = ({ redirect = false, requestUri = '' }) => {
    if (!redirect) {
        return '';
    }
    const queryObt = getQueryParamValue(
        'nota_id',
        `${SITE_LANACION}${requestUri}`
    );
    return `${SITE_LANACION}/${queryObt.replace('/', '')}`;
};

export default redirectNota;
