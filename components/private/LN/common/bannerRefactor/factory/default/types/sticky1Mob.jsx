/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types     */

import React from 'react';
import PropTypes from 'fusion:prop-types';
import Ads from '../../../ads';

const Sticky1Mob = props => {
    const {
        slotId: id,
        slotName,
        dimensions,
        device,
        dfpId,
        targeting,
        sticky,
        background,
        show,
        bidding
    } = props;

    const ad = (
        <Ads
            id={id}
            slotName={slotName}
            dimensions={dimensions}
            targeting={targeting}
            bidding={bidding}
            dfpId={dfpId}
            background={background ? '--bg-banner' : ''}
        />
    );

    return (
        <div className={`--bg-banner --${device}`}>
            <div id="sticky1_mob" className="banner">
                {ad}
            </div>
        </div>
    );
};

Sticky1Mob.propTypes = {
    slotId: PropTypes.string.isRequired,
    device: PropTypes.string.isRequired,
    dfpId: PropTypes.string.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        .isRequired,
    slotName: PropTypes.string.isRequired,
    targeting: PropTypes.shape({
        seccion: PropTypes.string,
        sitio: PropTypes.string
    }).isRequired,
    bidding: PropTypes.object.isRequired,
    background: PropTypes.string
};

export default Sticky1Mob;
