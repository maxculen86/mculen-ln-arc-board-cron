import React from 'react';
import { getImageData } from '../../../../features/LN/common/image/_helpers/getImageData';
import ImageUI from '../../../../features/ui/ln/image/default';

export function MediaItemImage({ data }) {
    const { src, width, height, alt, pictureSources } = getImageData(data);
    return (
        <div className="aspect-3/2 max-md:border-x-0 border-1 border-neutral-200 -mx-16 md:mx-0 w-[calc(100%+2rem)] md:w-full max-md:max-w-none">
            <ImageUI
                src={src}
                width={width}
                height={height}
                alt={alt}
                sources={pictureSources}
                loading="eager"
                fetchPriority="high"
            />
        </div>
    );
}
