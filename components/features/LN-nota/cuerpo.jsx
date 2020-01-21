import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Cuerpo from '../../private/LN/nota/cuerpo';
import { getSlotsOptions } from '../../private/LN/common/banner/config';

const cuerpo = props => {
    return <Cuerpo {...props} />;
};

cuerpo.label = 'LN-nota-Cuerpo';

cuerpo.propTypes = {
    customFields: PropTypes.shape({
        'Banner 1': PropTypes.oneOf(getSlotsOptions()),
        'Banner 2': PropTypes.oneOf(getSlotsOptions())
    }).isRequired
};

export default Consumer(cuerpo);
