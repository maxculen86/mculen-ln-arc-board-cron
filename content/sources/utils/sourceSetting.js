import getProperties from 'fusion:properties';
import get from '../../../components/private/common/utils/get';

const getTTLValue = contentSource => {
    try {
        // TODO: buscar forma dinámica de agregar el arcSite.
        const arcSite = 'la-nacion-ar';
        const properties = getProperties(arcSite);
        return (
            (arcSite &&
                contentSource &&
                get(properties, `ttlConfig.${contentSource}`, null)) ||
            null
        );
    } catch (error) {
        return 120;
    }
};

export default getTTLValue;
