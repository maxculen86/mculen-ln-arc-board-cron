import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import BajadaNota from '../../private/LN/nota/bajada';

const bajadaNota = props => {
    const { id: featureId } = props;
    return (
        <Static id={featureId}>
            <BajadaNota {...props} />
        </Static>
    );
};

bajadaNota.label = 'LN-Nota-Bajada';

export default Consumer(bajadaNota);
