import getProperties from 'fusion:properties';
import environment from 'fusion:environment';
import get from '../../../components/private/common/utils/get';

console.log('************ environment', environment);

const getTTLValue = contentSource => {
    // TODO: buscar forma dinámica de agregar el arcSite.
    const arcSite = 'la-nacion-ar';
    const properties = getProperties(arcSite);
    return (
        (arcSite &&
            contentSource &&
            get(properties, `ttlConfig.${contentSource}`, null)) ||
        null
    );
};

export default getTTLValue;
