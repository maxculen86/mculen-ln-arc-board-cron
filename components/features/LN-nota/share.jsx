import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import Share from '../../private/LN/nota/share';

const share = props => {
    const { id: featureId } = props;
    return (
        <Static id={featureId}>
            <Share {...props} />
        </Static>
    );
};

share.label = 'LN-Nota-Share';

export default Consumer(share);
