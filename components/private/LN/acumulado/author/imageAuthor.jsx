import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComImage from '../../../common/com-image';

// src="https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/nMbuBq0SHLPv9uoOJsHiZBeyoYw=/768x513/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg"
// srcset="https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/ezY1Y2EPJ03-B3VE7w9-BkdbE7M=/878x585/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg 878w, https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/6dIOTcXXWdSxIlsyai8ipYO2xng=/1120x746/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg 1120w, https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/ggRLo5On47hTa_NwiK6ro9kBLHo=/768x512/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg 768w, https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/xA7kNFjlRPlM9W2b3WcgWpoMvvg=/350x233/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg 350w, https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/TDfmYuDyT8YmvJSFgN6abplHYMM=/310x206/smart/filters:quality(70)/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/2TEGAEFZO5B3DLRIP7P47ZTCPY.jpg 310w"

const ImageAuthor = ({ outputType, url, name }) => {
    return (
        <figure className="mod-figure --horizontal">
            <div className="mod-picture ">
                <ComImage
                    src={url}
                    srcset={url}
                    srcsetAMP={url}
                    alt={name}
                    amp={outputType === 'amp'}
                    width="280"
                    height="280"
                />
            </div>
        </figure>
    );
};

ImageAuthor.propTypes = {
    url: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired
};

export default ImageAuthor;

/*
<img
    decoding="async"
    sizes="(max-width: 320px) 320px, 100vw"
    alt="ver que onda"
    src={url}
    srcSet={url}
    className="i-amphtml-fill-content i-amphtml-replaced-content"
/>

*/
