import React from 'react';
import PropTypes from 'fusion:prop-types';
import Tags from './tags';
import Sections from './sections';
import Destacado from './destacado';
import DetalleReceta from './detalleReceta';

import '../../../../../resources/dist/css/ln/layouts/grid.css';

const aperturaReceta = props => {
    const {
        globalContent: {
            promo_items: { receta, basic },
            taxonomy,
            taxonomy: { tags }
        }
    } = props;

    const hasMultimedia = !!(basic && basic._id);

    return (
        <div
            className={`row aper-receta w-100 hlp-marginBottom-40 ${
                hasMultimedia ? '' : 'sin-foto'
            }`}
        >
            {hasMultimedia ? (
                <>
                    <Destacado {...props} />
                    <div className="col-desksm-4 cont-aper">
                        <Sections taxonomy={taxonomy} destacado />
                        {receta && <DetalleReceta receta={receta} />}
                        <h4 class="com-subtitle_list">Recetas con:</h4>
                        <Tags tags={tags} destacado={false} />
                    </div>
                </>
            ) : (
                <div className="col-desksm-12 cont-aper">
                    <div className="row">
                        <div className="col-desksm-3">
                            {receta && <DetalleReceta receta={receta} />}
                        </div>
                        <div className="col-desksm-9">
                            <Sections taxonomy={taxonomy} destacado />
                            <h4 class="com-subtitle_list">Recetas con:</h4>
                            <Tags tags={tags} destacado={false} />
                        </div>
                    </div>
                </div>
            )}
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
        promo_items: PropTypes.shape({
            receta: PropTypes.object,
            basic: PropTypes.object
        }),
        content_elements: PropTypes.array.isRequired,
        display_date: PropTypes.string.isRequired
    }).isRequired
};

export default aperturaReceta;
