import React from 'react';

import TituloNota from './tituloNota';
import TagsNota from './tagsNota';

export default props => {
    return (
        <div>
            <TituloNota {...props} />
            <TagsNota {...props} />
        </div>
    );
};
