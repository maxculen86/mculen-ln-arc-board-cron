import React from 'react';
import { cx } from '@ln/ds-cva';
import Image from '../../../../ui/ln/image/default';
import { getImagesToLoadWithPicture } from '../../../../../private/LN/common/utils/mediaHelper';

function RenderMediaItem({ element, aspectRatio }) {
    const { mp4, poster, alt, url, resized_urls: resizedUrls } = element || {};

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
                    'w-full h-full object-contain bg-neutral-50',
                    aspectRatio
                )}
                aria-hidden="true"
            />
        );
    }

    return (
        <div>
            <Image
                alt={alt || 'Imagen de la galería'}
                src={url}
                className={cx('object-cover', aspectRatio)}
                sources={getImagesToLoadWithPicture(false, resizedUrls)}
            />
        </div>
    );
}

export default RenderMediaItem;
