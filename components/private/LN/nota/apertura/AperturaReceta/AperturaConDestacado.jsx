import React from 'react';
import PropTypes from 'prop-types';
import Tags from '../tags';
import Sections from '../sections';
import DetalleReceta from '../detalleReceta';

import '../../../../../../resources/dist/css/ln/layouts/grid.css';
import Media from '../../../common/media';
import replaceUrlResizerToWWW from '../../../../../../content/sources/utils/replaceUrlResizerToWWW';
import get from '../../../../common/utils/get';

const AperturaConDestacado = props => {
    const {
        globalContent: {
            promo_items: promoItems,
            taxonomy,
            taxonomy: { tags }
        },
        outputType
    } = props;

    const promoItemsBasicWithWWW = replaceUrlResizerToWWW(
        get(promoItems, 'basic', {})
    );

    return (
        <>
            <div className="col-desksm-8">
                <Media
                    mediaData={promoItemsBasicWithWWW}
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
                    <Tags tags={tags} destacado={false} showItems={3} />
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
