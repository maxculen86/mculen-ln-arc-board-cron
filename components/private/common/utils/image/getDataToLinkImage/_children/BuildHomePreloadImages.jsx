import React from 'react';
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

export default BuildHomePreloadImages;
