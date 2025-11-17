import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Text } from '@ln/contenidos-ui-text';
import { cx } from '@ln/ds-cva';
import ImageGrid from './ImageGrid';

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
                'gallery-embed grid grid-cols-8 grid-cols-12_m grid-cols-16_lg',
                containerClass
            )}
            style={{ marginBottom: '148px', marginTop: '32px' }}
        >
            <div className={embedItemClass}>
                <div data-tw>
                    <div className={gridClass}>
                        {galleryImages.map(image => (
                            <ImageGrid
                                key={image.url}
                                image={image}
                                alt={caption}
                                aspectRatio={aspectRatio}
                            />
                        ))}
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

ImageGallery.propTypes = {
    galleryImages: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            height: PropTypes.number,
            width: PropTypes.number,
            resized_urls: PropTypes.array
        })
    ).isRequired,
    caption: PropTypes.string.isRequired,
    gridClass: PropTypes.string.isRequired,
    containerClass: PropTypes.string.isRequired,
    embedItemClass: PropTypes.string.isRequired,
    aspectRatio: PropTypes.string.isRequired
};
