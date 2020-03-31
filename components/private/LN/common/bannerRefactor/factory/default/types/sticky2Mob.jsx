import React from 'react';
import Ads from '../../../ads';

const Sticky2Mob = props => {
    const {
        slotId: id,
        slotName,
        dimensions,
        device,
        dfpId,
        targeting,
        background,
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
        <div className={`--bg-banner --${device} --sticky`}>
            <div id="sticky2_mob" className="banner">
                {ad}
            </div>
        </div>
    );
};

export default Sticky2Mob;
