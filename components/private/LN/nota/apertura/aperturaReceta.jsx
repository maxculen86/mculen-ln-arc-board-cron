import React from 'react';

import TituloNota from './tituloNota';
import TagsNota from './tagsNota';
import Breadcrumb from './breadcrumb';

export default props => {
    return (
        <div>
            <Breadcrumb {...props} />
            <TituloNota {...props} />
            <TagsNota {...props} />
        </div>
    );
};
