import React from 'react';
import PropTypes from 'prop-types';

const WithSkeletonBannerWithoutHide = ({ slotId }) =>
    ['cabezal_dsk', 'cabezal_tab', 'sticky1_mob'].indexOf(slotId) !== -1 ? (
        <div className="mod-banner --top" />
    ) : null;

WithSkeletonBannerWithoutHide.propTypes = {
    slotId: PropTypes.string.isRequired
};

export default WithSkeletonBannerWithoutHide;
