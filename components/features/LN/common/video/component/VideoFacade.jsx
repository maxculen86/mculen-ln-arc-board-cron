import React from 'react';
import PlayButton from './PlayButton';
import Image from '../../../../ui/ln/image/default';
import { transformImages } from '../utils/videoDataUtils';

function VideoFacade({
    mediaId,
    images = [],
    fallbackSrc = '',
    alt = '',
    loading = 'lazy',
    fetchPriority = 'low',
    subtype = ''
}) {
    const imageSources = transformImages(images, subtype);
    // TODO IMPORTAR CLASES DS
    return (
        <div className="relative" id={`facade-${mediaId}`}>
            <PlayButton />
            <Image
                sources={imageSources.length > 0 ? [imageSources[0]] : []}
                src={fallbackSrc}
                alt={alt}
                loading={loading}
                fetchPriority={fetchPriority}
            />
        </div>
    );
}

export default VideoFacade;
