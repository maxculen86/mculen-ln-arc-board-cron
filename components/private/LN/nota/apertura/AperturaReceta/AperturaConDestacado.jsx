import React from 'react';
import Tags from '../tags';
import Sections from '../sections';
import DetalleReceta from '../detalleReceta';
import Media from '../../../common/media';
import { replaceUrlResizerToWWW } from '../../../../common/utils/image/resizer/v2/resizerHelper';
import get from '../../../../common/utils/get';

function AperturaConDestacado(props) {
    const {
        globalContent: {
            promo_items: promoItems,
            taxonomy,
            taxonomy: { tags }
        },
        globalContent,
        outputType,
        layout: layoutPageBuilder
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
                    // TODO: Una vez que se habilite todo el sitio a carga de imagen con picture, estas props no seran necesarias.
                    layoutPageBuilder={layoutPageBuilder}
                    globalContent={globalContent}
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
}

export default AperturaConDestacado;
