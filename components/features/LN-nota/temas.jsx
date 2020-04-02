import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import Temas from '../../private/LN/nota/apertura/tags';

const temas = props => {
    const {
        globalContent: {
            taxonomy: { tags }
        },
        id: featureId
    } = props;
    return (
        <Static id={featureId}>
            <Temas tags={tags} destacado temas />
        </Static>
    );
};

temas.label = 'LN-Nota-Temas';

export default Consumer(temas);
