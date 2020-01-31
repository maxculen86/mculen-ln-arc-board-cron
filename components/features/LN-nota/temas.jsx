import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import Temas from '../../private/LN/nota/apertura/sections';

const temas = props => {
    const {
        globalContent: { taxonomy },
        id: featureId
    } = props;
    return (
        <Static id={featureId}>
            <Temas taxonomy={taxonomy} destacado temas />
        </Static>
    );
};

temas.label = 'LN-Nota-Temas';

export default Consumer(temas);
