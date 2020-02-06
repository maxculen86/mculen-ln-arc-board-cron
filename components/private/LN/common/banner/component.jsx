import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArcAd from './arcWrapper';

import '../../../../../resources/dist/css/ln/layouts/grid.css';

// TODO: test pendientes hasta tener el html final. Falta definicion de div contenedor cuando es background.
// Falta la clase si es desktop, tablet, mobile. Confirmar.
const bannerComponent = ({
    slotId,
    dfpId,
    slotName,
    dimensions,
    targeting,
    bidding,
    sticky,
    background,
    device,
    extraClasses,
    outputType
}) => {
    console.log('BANNER PROPS: ', slotId, dfpId, slotName, targeting);
    // TODO: Borrar estos comentarios feos
    let ad = (
        <ArcAd
            className={`--${device}${
                sticky ? ' --sticky' : ''
            } ${extraClasses || ''}`}
            id={slotId}
            dfpId={dfpId}
            slotName={slotName}
            dimensions={dimensions}
            targeting={targeting}
            bidding={bidding}
        />
    );

    if (background) {
        ad = <div className="banner w-100 --bg-banner hlp-none">{ad}</div>;
    }

    if (outputType === 'amp') {
        /**
         * Para armar JSON con targeting:
         * Tomar en consideración :
         * - TAGS de la nota
         * - SECTIONS de la nota
         * - Que carajos es espacio patrocinado ?
         * - Debo tomar en cuenta personas ? En ARC se setean ?
         * - Que es topico ? Donde esta eso en ARC ?
         * - Probar poner te_CATEGORIA o te_TAG
         */
        ad = (
            <div className="content-sticky w-100 --bg-banner hlp-desksm-none">
                <amp-ad
                    id="sticky_amp"
                    type="doubleclick"
                    class="banner"
                    width={dimensions.width}
                    height={dimensions.height}
                    data-slot={`/133919216/AMP/ROS/${slotId}`}
                    json={`'{"targeting":{"tags": ["ca_turismo|ca_comun|"], "tags_nuevos":["ca_turismo","ca_comun",""] }`}
                />
            </div>
        );
    }

    return ad;
};

bannerComponent.propTypes = {
    slotId: PropTypes.string.isRequired,
    dfpId: PropTypes.number.isRequired,
    slotName: PropTypes.string.isRequired,
    // TODO: ver como verifiar que sean de estos tipos pero sin hacer shape ya que no importa en este paso que tienen esas props adentro
    dimensions: PropTypes.array.isRequired,
    targeting: PropTypes.object.isRequired,
    bidding: PropTypes.object.isRequired
};

export default bannerComponent;
