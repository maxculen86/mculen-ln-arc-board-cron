import React from 'react';
import PropTypes from 'fusion:prop-types';
import TituloNota from './tituloNota';
import Breadcrumb from './breadcrumb';
import Tags from './tags';
import Sections from './sections';
import BajadaNota from './bajadaNota';
import AuthorNota from './authorNota';
import ArticleImage from '../articleImage';

const AperturaReceta = props => {
    const {
        globalContent: {
            taxonomy,
            taxonomy: { tags },
            headlines,
            subheadlines,
            credits: { by }
        }
    } = props;
    const destacado = true;
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
            <Tags tags={tags} destacado={false} />
            <TituloNota titulo={headlines} />
            <Sections taxonomy={taxonomy} destacado={destacado} />
            <BajadaNota subheadlines={subheadlines} />
            <AuthorNota authors={by} />
        </div>
    );
};

AperturaReceta.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    description: PropTypes.string,
                    slug: PropTypes.string,
                    text: PropTypes.string
                })
            ).isRequired
        }),
        headlines: PropTypes.object.isRequired,
        subheadlines: PropTypes.object.isRequired,
        credits: PropTypes.shape({
            by: PropTypes.array
        }).isRequired
    }).isRequired
};

export default AperturaReceta;
