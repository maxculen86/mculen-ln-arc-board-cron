import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import Temas from '../../private/LN/nota/apertura/tags';

const temas = props => {
    const {
        globalContent: { taxonomy },
        id: featureId
    } = props;
    const { tags, sections } = taxonomy || {};

    return (
        <Static id={featureId}>
            <Temas tags={tags} sections={sections} destacado temas />
        </Static>
    );
};

temas.label = 'LN-Nota-Temas';

export default Consumer(temas);
