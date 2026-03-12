import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { cx } from '@ln/ds-cva';
import ImageGrid from './ImageGrid';

const renderGalleryMediaItem = (element, { caption, aspectRatio }) => {
    const isVideo = element?.type === 'video';

    if (isVideo) {
        return (
            <video
                src={element?.mp4}
                poster={element?.poster}
                autoPlay
                muted
                loop
                playsInline
                className={cx(
                    'w-full h-full object-contain bg-neutral-light-50',
                    aspectRatio
                )}
            />
        );
    }

    return (
        <ImageGrid
            key={element.url}
            image={element}
            alt={caption}
            aspectRatio={aspectRatio}
        />
    );
};

function ImageGallery({
    galleryImages,
    caption,
    gridClass,
    containerClass,
    embedItemClass,
    aspectRatio
}) {
    return (
        <div
            className={cx(
                'gallery-embed grid grid-cols-8 mb-80 grid-cols-12_m grid-cols-16_lg',
                containerClass
            )}
            style={{ marginTop: '32px' }}
        >
            <div className={embedItemClass}>
                <div data-tw>
                    <div className={gridClass}>
                        {galleryImages.map(element =>
                            renderGalleryMediaItem(element, {
                                caption,
                                aspectRatio
                            })
                        )}
                    </div>
                </div>
                <div className="px-16 py-8 text-center_m">
                    <Text
                        className="text-16 text-light-700"
                        style={{ letterSpacing: '-0.32px' }}
                    >
                        {caption}
                    </Text>
                </div>
            </div>
        </div>
    );
}

export default ImageGallery;
