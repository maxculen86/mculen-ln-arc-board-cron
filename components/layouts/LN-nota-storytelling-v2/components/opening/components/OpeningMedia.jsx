import React from 'react';
import ImageUI from '../../../../../features/ui/ln/image/default';

const COVER_CLASS = 'w-full h-full object-cover opacity-60';

function OpeningMedia({
    videoUrl,
    posterUrl,
    src,
    srcset,
    sizes,
    width,
    height,
    altText
}) {
    if (!videoUrl && !src) return null;

    if (videoUrl) {
        return (
            <video
                className={COVER_CLASS}
                src={videoUrl}
                poster={posterUrl}
                autoPlay
                loop
                muted
                playsInline
            />
        );
    }

    return (
        <ImageUI
            alt={altText}
            src={src}
            srcSet={srcset}
            sizes={sizes}
            width={width}
            height={height}
            renderImgOnly
            classnames={{ image: COVER_CLASS }}
            fetchPriority="high"
            loading="eager"
        />
    );
}

export default OpeningMedia;
