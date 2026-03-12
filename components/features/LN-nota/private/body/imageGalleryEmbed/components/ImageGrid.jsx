import React from 'react';
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

export default ImageGrid;
