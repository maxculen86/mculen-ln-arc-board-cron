import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import Share from '../../private/LN/nota/share';

const share = props => {
    return (
        <Static id="LN-Nota-Share">
            <Share {...props} />
        </Static>
    );
};

share.label = 'LN-Nota-Share';

export default Consumer(share);
