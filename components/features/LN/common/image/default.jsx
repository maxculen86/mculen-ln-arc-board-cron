import React from 'react';
import { getEpigrafe } from '../../../../private/LN/common/utils/mediaHelper';
import { getImageData } from './_helpers/getImageData';
import ImageMedia from '../../../ui/ln/image/default';

function Image({ data, showCaption = true, fetchPriority, loading }) {
    const { caption, credit } = getEpigrafe(data);
    const { src, width, height, alt, pictureSources } = getImageData(data);

    return (
        <>
            <div className="aspect-3/2 border-1 border-neutral-200 -mx-16 md:mx-0 w-[calc(100%+2rem)] md:w-full max-md:max-w-none">
                <ImageMedia
                    width={width}
                    alt={alt}
                    height={height}
                    src={src}
                    sources={pictureSources}
                    loading={loading}
                    fetchPriority={fetchPriority}
                />
            </div>
            {showCaption && (
                <figcaption className="py-8">
                    <span className="font-normal text-base-default text-16 text-center leading-[110%] tracking-[-0.3px]">
                        {caption}
                    </span>
                    <span className="pl-8 font-normal text-base-light text-16 text-center leading-[110%] tracking-[-0.3px]">
                        {credit}
                    </span>
                </figcaption>
            )}
        </>
    );
}

Image.arcType = 'image';

export default Image;
