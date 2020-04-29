import React from 'react';
import PropTypes from 'fusion:prop-types';
import Ads from '../../../ads';

const index = React.forwardRef((props, ref) => {
    const {
        slotId: id,
        slotName,
        dimensions,
        dfpId,
        targeting,
        sticky,
        background,
        show,
        bidding,
        device
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
    console.log('al return papa');

    return (
        <>
            <div className={`--bg-banner --${device}`} ref={ref}>
                <div id={id} className="banner">
                    {ad}
                </div>
            </div>
        </>
    );
});

index.propTypes = {
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

export default index;
