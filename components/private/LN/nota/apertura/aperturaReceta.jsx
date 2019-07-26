import React, { Fragment } from 'react';
import PropTypes from 'fusion:prop-types';
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
            subheadlines,
            credits: { by },
            imageResizePresets,
            promo_items
        }
    } = props;
    const destacado = true;
    return (
        <Fragment>
            <section className="col-desksm-8 cont-figure">
                {/* TODO: reemplazar por destacado.jsx */}
                <ArticleImage
                    imageResizePresets={imageResizePresets}
                    image={promo_items.basic}
                    zoom
                />
            </section>
            <div className="col-desksm-4 cont-aper">
                <Sections taxonomy={taxonomy} destacado={destacado} />
                {/* Porciones y tiempo */}
                <Tags tags={tags} destacado={false} />
            </div>
            <BajadaNota subheadlines={subheadlines} />
            <AuthorNota authors={by} />
        </Fragment>
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
        }).isRequired,
        imageResizePresets: PropTypes.object.isRequired,
        promo_items: PropTypes.object.isRequired
    }).isRequired
};

export default AperturaReceta;
