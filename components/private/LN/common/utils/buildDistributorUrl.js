import { SITE_LANACION } from 'fusion:environment';
import formatDistributorName from './formatDistributorName';

const buildDistributorUrl = distributorName => {
    if (!distributorName || distributorName === 'LA NACION') {
        return null;
    }

    return `${SITE_LANACION}/distributor/${formatDistributorName(distributorName)}/`;
};

export default buildDistributorUrl;
