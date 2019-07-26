import React from 'react';

import TituloNota from './tituloNota';
import Breadcrumb from './breadcrumb';
import Tags from './tags';
import Sections from './sections';
import BajadaNota from './bajadaNota';
import AuthorNota from './authorNota';
import ArticleImage from '../articleImage';

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

    console.log('Props: ', props.globalContent.promo_items.basic);
    return (
        <div className="row aper-receta w-100 hlp-marginBottom-40">
            <section className="col-desksm-8 cont-figure">
                {/* <ArticleImage
                    imageResizePresets={props.globalContent.imageResizePresets}
                    image={props.globalContent.promo_items.basic}
                    zoom
                /> */}
            </section>

            <Breadcrumb {...props} />
            <TituloNota titulo={headlines.basic} />

            <Sections taxonomy={taxonomy} destacado={true} />
            <BajadaNota subheadlines={subheadlines.basic} />
            <Tags tags={tags} destacado={false} />
            <AuthorNota authors={credits.by} />
            <Sections
                taxonomy={props.globalContent.taxonomy}
                destacado={true}
            />
            <Tags tags={tags} destacado={false} />
        </div>
    );
};
