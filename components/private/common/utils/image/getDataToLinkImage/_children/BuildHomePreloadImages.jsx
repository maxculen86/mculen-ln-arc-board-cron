import React from 'react';
import PropTypes from 'prop-types';
import { LinkImagePreload } from '../../../../../LN/common/utils/mediaHelper';
import useGetMediaApertura from '../_helper/_homeHelper';

function BuildHomePreloadImages({ renderables, arcSite, isAdmin, layout }) {
    const resizedUrls = useGetMediaApertura({
        arcSite,
        isAdmin,
        renderables,
        layout
    });

    return (
        Array.isArray(resizedUrls) &&
        resizedUrls.length > 0 && <LinkImagePreload resizedUrls={resizedUrls} />
    );
}

BuildHomePreloadImages.propTypes = {
    renderables: PropTypes.arrayOf(PropTypes.node),
    arcSite: PropTypes.string,
    isAdmin: PropTypes.bool,
    layout: PropTypes.string
}.isRequired;

export default BuildHomePreloadImages;
