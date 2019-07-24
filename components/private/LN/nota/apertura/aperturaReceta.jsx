import React from 'react';

import TituloNota from './tituloNota';
import TagsNota from './tagsOrSections';
import CategoryNota from './tagsOrSections';
import Breadcrumb from './breadcrumb';
import Tags from './tags';
import Sections from './sections';
import BajadaNota from './bajadaNota';
import AuthorNota from './authorNota';

export default props => {
    const {
        globalContent: {
            taxonomy,
            taxonomy: { tags },
            headlines,
            subheadlines,
            credits
        }
    } = props;
    return (
        <div>
            <Breadcrumb {...props} />
            <TituloNota titulo={headlines.basic} />
            {/* <CategoryNota items={sections} destacado={destacado} />
            <TagsNota items={tags} destacado={destacado} /> */}

            <Sections taxonomy={taxonomy} destacado={true} />
            <BajadaNota subheadlines={subheadlines.basic} />
            <Tags tags={tags} destacado={false} />
            <AuthorNota author={credits.by} />
        </div>
    );
};
