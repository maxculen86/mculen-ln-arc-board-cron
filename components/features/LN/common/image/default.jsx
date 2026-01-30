import React from 'react';
import { getEpigrafe } from '../../../../private/LN/common/utils/mediaHelper';
import { getImageData } from './_helpers/getImageData';
import ImageMedia from '../../../ui/ln/image/default';

function Image({ data, showCaption = true, fetchPriority, loading }) {
    const { caption, credit } = getEpigrafe(data);
    const { src, width, height, alt, pictureSources } = getImageData(data);

    return (
        <>
            <ImageMedia
                width={width}
                alt={alt}
                height={height}
                src={src}
                sources={pictureSources}
                loading={loading}
                fetchPriority={fetchPriority}
            />
            {showCaption && (
                <>
                    <div>{caption}</div>
                    <div>{credit}</div>
                </>
            )}
        </>
    );
}

Image.arcType = 'image';

export default Image;
