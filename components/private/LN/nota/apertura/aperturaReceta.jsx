import React from 'react';

import TituloNota from './tituloNota';
import TagsNota from './tagsOrSections';
import CategoryNota from './tagsOrSections';
import Breadcrumb from './breadcrumb';

export default props => {
    const {
        globalContent: {
            taxonomy: { tags, sections }
        }
    } = props;
    const destacado = true;
    return (
        <div>
            <Breadcrumb {...props} />
            <TituloNota {...props} />
            <CategoryNota items={sections} destacado={destacado} />
            <TagsNota items={tags} destacado={destacado} />
        </div>
    );
};
