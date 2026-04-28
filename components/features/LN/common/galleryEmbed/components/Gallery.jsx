import React from 'react';
import { cx } from '@ln/ds-cva';
import RenderMediaItem from './RenderMediaItem';

function Gallery({
    galleryImages,
    caption,
    gridClass,
    containerClass,
    embedItemClass,
    aspectRatio
}) {
    return (
        <section
            className={cx(
                'gallery-embed grid grid-cols-8 mb-64 md:grid-cols-12 md:gap-24 xl:grid-cols-16 xl:gap-32 mt-32',
                containerClass
            )}
            aria-labelledby="gallery-caption"
        >
            <div className={embedItemClass}>
                <div className={gridClass}>
                    {galleryImages.map((element, index) => (
                        <RenderMediaItem
                            key={element?._id || `gallery-image-${index}`}
                            element={element}
                            aspectRatio={aspectRatio}
                        />
                    ))}
                </div>
                <div className="px-16 py-8 md:text-center">
                    <span
                        className="text-16 tracking-[-0.32px]"
                        id="gallery-caption"
                    >
                        {caption}
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Gallery;
