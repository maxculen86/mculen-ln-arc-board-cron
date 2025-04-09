import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import get from '../../../../private/common/utils/get';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';

function VideoShareMedia({ id, isScriptLoaded, ...r }) {
    if (isScriptLoaded) return <div id={id} {...r} />;

    const { globalContent } = useAppContext();

    const allImages = get(globalContent, `promo_items.basic.resized_urls`, []);
    const { resizedUrl } = getShortestImage(allImages);

    return (
        <div className="flex flex-column w-100 h-100 ratio-6-19 jc-center ai-center">
            <Adaptableimage
                src={resizedUrl}
                alt="Video thumbnail"
                className="w-100 h-100"
                style={{ objectFit: 'contain' }}
                sources={getImagesToLoadWithPicture(allImages)}
            />
        </div>
    );
}

VideoShareMedia.propTypes = {
    id: PropTypes.string.isRequired,
    isScriptLoaded: PropTypes.bool.isRequired
};

export default memo(VideoShareMedia);
