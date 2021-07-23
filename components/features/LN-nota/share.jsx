import React from 'react';
import Consumer from 'fusion:consumer';

import Share from '../../private/LN/nota/share';

const share = props => {
    return <Share {...props} />;
};

share.label = 'LN-Nota-Share';

share.lazy = ['default', 'amp'];

export default Consumer(share);
