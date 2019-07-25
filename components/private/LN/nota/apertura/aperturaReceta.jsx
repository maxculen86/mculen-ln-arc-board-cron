import React from 'react';

import TituloNota from './tituloNota';
import TagsNota from './tagsOrSections';
import CategoryNota from './tagsOrSections';
import Breadcrumb from './breadcrumb';
import Tags from './tags';
import Sections from './sections';
import ArticleImage from '../articleImage';

export default props => {
    const {
        globalContent: {
            taxonomy: { tags, sections }
        }
    } = props;
    return (
        <div>
            <Breadcrumb {...props} />
            <TituloNota {...props} />
            {/* <CategoryNota items={sections} destacado={destacado} />
            <TagsNota items={tags} destacado={destacado} /> */}

            <Sections
                taxonomy={props.globalContent.taxonomy}
                destacado={true}
            />
            <Tags tags={tags} destacado={false} />

            <ArticleImage
                imageResizePresets={props.globalContent.imageResizePresets}
                image={props.globalContent.promo_items.basic}
            />
        </div>
    );
};
