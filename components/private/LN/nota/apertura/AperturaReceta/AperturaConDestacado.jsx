import React from 'react';
import PropTypes from 'fusion:prop-types';
import Tags from '../tags';
import Sections from '../sections';
import Destacado from '../destacado';
import DetalleReceta from '../detalleReceta';

import '../../../../../../resources/dist/css/ln/layouts/grid.css';

const AperturaConDestacado = props => {
    const {
        globalContent: {
            promo_items: promoItems,
            taxonomy,
            taxonomy: { tags }
        }
    } = props;

    return (
        <>
            <Destacado {...props} />
            <div className="col-desksm-4 cont-aper">
                <Sections taxonomy={taxonomy} destacado />
                {!!promoItems && !!promoItems.receta && (
                    <DetalleReceta receta={promoItems.receta} />
                )}
                {!!tags && tags.length > 0 && (
                    <>
                        <h4 className="com-subtitle_list">Recetas con:</h4>
                        <Tags tags={tags} destacado={false} />
                    </>
                )}
            </div>
        </>
    );
};

AperturaConDestacado.propTypes = {
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

export default AperturaConDestacado;
