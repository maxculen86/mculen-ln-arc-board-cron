// TODO: Hay que modular lliftigniter a un Command Pattern

import config from '../../../../properties/sites/la-nacion-ar';

const liftigniter = (() => {
    const idClient = config.lifigniter.clientId;
})();

export default liftigniter;
