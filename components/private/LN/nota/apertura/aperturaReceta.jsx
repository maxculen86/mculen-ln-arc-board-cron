import React from 'react';
import PropTypes from 'fusion:prop-types';
import Tags from './tags';
import Sections from './sections';
import Destacado from './destacado';
import DetalleReceta from './detalleReceta';

import '../../../../../assets/bundles/css/ln/layouts/grid.css';

const aperturaReceta = props => {
    const {
        globalContent: {
            promo_items: { receta },
            taxonomy,
            taxonomy: { tags }
        }
    } = props;

    return (
        <div
            className={`row aper-receta w-100 hlp-marginBottom-40 ${
                !props.globalContent.promo_items.basic._id ? '' : 'sin-foto'
            }`}
        >
            {props.globalContent.promo_items.basic._id && (
                <Destacado {...props} />
            )}
            <div
                className={`col-desksm-${
                    props.globalContent.promo_items.basic._id ? '4' : '12'
                } cont-aper`}
            >
                <div className="row">
                    <div className="col-desksm-3">
                        {receta && <DetalleReceta receta={receta} />}
                    </div>
                    <div className="col-desksm-9">
                        <Sections taxonomy={taxonomy} destacado />
                        <Tags tags={tags} destacado={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

aperturaReceta.propTypes = {
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
        promo_items: PropTypes.shape({
            receta: PropTypes.object
        }),
        content_elements: PropTypes.array.isRequired,
        display_date: PropTypes.string.isRequired
    }).isRequired
};

export default aperturaReceta;
