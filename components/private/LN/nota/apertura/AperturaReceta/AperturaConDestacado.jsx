import React from 'react';
import PropTypes from 'fusion:prop-types';
import Tags from '../tags';
import Sections from '../sections';
import DetalleReceta from '../detalleReceta';

import '../../../../../../resources/dist/css/ln/layouts/grid.css';
import ComTitle from '../../../../common/com-title';
import Media from '../../../common/media';

const AperturaConDestacado = props => {
    const {
        globalContent: {
            promo_items: promoItems,
            taxonomy,
            taxonomy: { tags }
        },
        outputType
    } = props;

    return (
        <>
            <div className="col-desksm-8">
                <Media
                    mediaData={promoItems.basic}
                    outputType={outputType}
                    colNumber={8}
                    isApertura
                />
            </div>
            <div className="col-desksm-4 cont-aper">
                <Sections taxonomy={taxonomy} destacado />
                {!!promoItems && !!promoItems.receta && (
                    <DetalleReceta receta={promoItems.receta} />
                )}
                {!!tags && tags.length > 0 && (
                    <>
                        <ComTitle
                            size="--threexs"
                            tag="h4"
                            content="Recetas con:"
                        />
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
            primary_section: PropTypes.string,
            sections: PropTypes.object,
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
    }).isRequired,
    outputType: PropTypes.string.isRequired
};

export default AperturaConDestacado;
