import React from 'react';
import { cx } from '@ln/ds-cva';
import { getEpigrafe } from '../../../../private/LN/common/utils/mediaHelper';
import { getImageData } from './_helpers/getImageData';
import ImageUI from '../../../ui/ln/image/default';
import { Caption } from '../caption/default';
import { WrapperBody } from '../wrapperBody/default';

function Image({ data, fetchPriority, loading }) {
    const { caption, credit } = getEpigrafe(data, true);
    const { src, width, height, alt, pictureSources } = getImageData(data);

    const isVertical = height > width;
    const _className = cx(
        'max-md:border-x-0 border-1 border-neutral-200 w-full',
        isVertical ? 'aspect-3/4 max-w-480' : 'aspect-3/2'
    );

    return (
        <WrapperBody variant="medium">
            <figure>
                <div className="w-full flex justify-center bg-neutral-50">
                    <div className={_className}>
                        <ImageUI
                            objectFit="cover"
                            width={width}
                            alt={alt}
                            height={height}
                            src={src}
                            sources={pictureSources}
                            loading={loading}
                            fetchPriority={fetchPriority}
                        />
                    </div>
                </div>
                <Caption caption={caption} credit={credit} />
            </figure>
        </WrapperBody>
    );
}

Image.arcType = 'image';

export default Image;
