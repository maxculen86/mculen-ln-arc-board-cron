import React from 'react';
import PropTypes from 'fusion:prop-types';
import AperturaConDestacado from './AperturaConDestacado';
import AperturaSinDestacado from './AperturaSinDestacado';

import '../../../../../../resources/dist/css/ln/layouts/grid.css';

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
            className={`row aper-receta w-100 ${
                hasMultimedia ? '' : 'sin-foto'
            }`}
        >
            {hasMultimedia ? (
                <AperturaConDestacado {...props} />
            ) : (
                <AperturaSinDestacado
                    tags={tags}
                    taxonomy={taxonomy}
                    receta={receta}
                />
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
        promo_items: PropTypes.shape({
            receta: PropTypes.object,
            basic: PropTypes.object
        })
    })
};

export default aperturaReceta;
