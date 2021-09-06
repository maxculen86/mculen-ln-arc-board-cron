import React from 'react';
import PropTypes from 'prop-types';

const DivBannerAMP = ({ bannerConfiguration }) => {
    const {
        slotId,
        slotName,
        dimensions,
        sticky,
        targeting
    } = bannerConfiguration;

    const comp = (
        <amp-ad
            id={`${slotId}`}
            type="doubleclick"
            class="banner"
            width={dimensions[0][0]}
            height={dimensions[0][1]}
            data-slot={slotName}
            json={`${targeting}`}
        />
    );

    return (
        <div className={`row ${sticky ? 'sticky-amp' : ''}`}>
            {/* <div className="col-12"> */}
            <div
                className={`mod-banner --bg-banner ${
                    sticky ? 'hlp-desksm-none' : ''
                }`}
            >
                {sticky ? (
                    <amp-sticky-ad layout="nodisplay">{comp}</amp-sticky-ad>
                ) : (
                    comp
                )}
            </div>
            {/* </div> */}
        </div>
    );
};

DivBannerAMP.propTypes = {
    bannerConfiguration: PropTypes.shape({
        slotId: PropTypes.string.isRequired,
        dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
            .isRequired,
        slotName: PropTypes.string.isRequired,
        targeting: PropTypes.shape({
            seccion: PropTypes.string,
            sitio: PropTypes.string
        }).isRequired,
        sticky: PropTypes.bool
    }).isRequired
};

export default DivBannerAMP;
