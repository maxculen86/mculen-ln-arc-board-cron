import React from 'react';

import TituloNota from './tituloNota';
import TagsNota from './tagsNota';
import Breadcrumb from './breadcrumb';

export default props => {
    return (
        <div>
            <TituloNota {...props} />
            <TagsNota {...props} />
            <Breadcrumb {...props} />
        </div>
    );
};
