import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { cx } from '@ln/ds-cva';
import { getImagesToLoadWithPicture } from '../../../../../../private/LN/common/utils/mediaHelper';

function ImageGrid({ image, alt, aspectRatio }) {
    return (
        <div>
            <Adaptableimage
                alt={alt}
                src={image.url}
                className={cx('w-full h-full object-cover', aspectRatio)}
                sources={getImagesToLoadWithPicture(false, image.resized_urls)}
            />
        </div>
    );
}

ImageGrid.propTypes = {
    image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        resized_urls: PropTypes.object
    }).isRequired,
    alt: PropTypes.string.isRequired,
    aspectRatio: PropTypes.string.isRequired
};

export default ImageGrid;
