import React from 'react';
import { cx } from '@ln/ds-cva';
import Image from '../../../../ui/ln/image/default';
import { getImagesToLoadWithPicture } from '../../../../../private/LN/common/utils/mediaHelper';

function RenderMediaItem({ element, aspectRatio }) {
    const { mp4, poster, alt, url, resized_urls: resizedUrls } = element || {};
    const imageAlt =
        typeof alt === 'string' ? alt.trim() : 'Imagen de la galería';

    if (element?.type === 'video') {
        return (
            <video
                src={mp4}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                className={cx(
                    'w-full h-full object-cover bg-neutral-50',
                    aspectRatio
                )}
                aria-hidden="true"
            />
        );
    }

    return (
        <div>
            <Image
                alt={imageAlt}
                src={url}
                className={cx('object-cover', aspectRatio)}
                sources={getImagesToLoadWithPicture(false, resizedUrls)}
            />
        </div>
    );
}

export default RenderMediaItem;
