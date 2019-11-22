import React, { useState } from 'react';
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
    extraClasses
}) => {
    const [showBanner, setShowBanner] = useState(false);

    const onLoad = show => {
        debugger;
        console.log('show: ', show);
        setShowBanner(show);
    };
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
            onLoad={onLoad}
        />
    );

    console.log('showBanner: ', showBanner);

    if (background && showBanner) {
        ad = <div className={`banner w-100 --bg-banner`}>{ad}</div>;
    }

    return showBanner ? ad : <></>;
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
