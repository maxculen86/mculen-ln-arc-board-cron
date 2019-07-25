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
        <div className="row aper-receta w-100 hlp-marginBottom-40">
            <section className="col-desksm-8 cont-figure">
                <ArticleImage
                    imageResizePresets={props.globalContent.imageResizePresets}
                    image={props.globalContent.promo_items.basic}
                    zoom
                />
            </section>

            <Breadcrumb {...props} />
            <TituloNota {...props} />
            {/* <CategoryNota items={sections} destacado={destacado} />
            <TagsNota items={tags} destacado={destacado} /> */}

            <Sections
                taxonomy={props.globalContent.taxonomy}
                destacado={true}
            />
            <Tags tags={tags} destacado={false} />
        </div>
    );
};
