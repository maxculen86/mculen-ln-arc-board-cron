import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import BajadaNota from '../../private/LN/nota/apertura/bajadaNota';

const bajadaNota = props => {
    return (
        <Static id="bajada-nota">
            <BajadaNota {...props} />
        </Static>
    );
};

bajadaNota.label = 'LN-Nota-Bajada';

export default Consumer(bajadaNota);
