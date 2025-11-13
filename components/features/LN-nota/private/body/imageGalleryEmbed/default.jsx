import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { isFotoAl100 } from '../../../body/_utils/helpers';
import { filterGalleryEmbeds, extractGalleryEmbedData } from './_helper';

function ImageGalleryEmbed() {
    const { globalContent = {} } = useAppContext() || {};
    const {
        content_elements: contentElements = [],
        subtype,
        type
    } = globalContent;

    if (!isFotoAl100(subtype, type)) return null;

    const galleryData = extractGalleryEmbedData(
        filterGalleryEmbeds(contentElements)
    );

    if (!galleryData.length) return null;

    return (
        <div className="gallery-embed">
            {galleryData.map(({ galleryId, caption, diagram }) => (
                <div className="gallery-embed__item">
                    <p>
                        <strong>Gallery ID:</strong> {galleryId}
                    </p>
                    <p>
                        <strong>Caption:</strong> {caption}
                    </p>
                    <p>
                        <strong>Diagram:</strong> {diagram}
                    </p>
                </div>
            ))}
        </div>
    );
}

ImageGalleryEmbed.arcType = 'gallery-embed';

ImageGalleryEmbed.propTypes = {
    globalContent: PropTypes.shape({
        subtype: PropTypes.string,
        type: PropTypes.string,
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                subtype: PropTypes.string,
                type: PropTypes.string,
                embed: PropTypes.shape({
                    config: PropTypes.shape({
                        galleryId: PropTypes.string,
                        caption: PropTypes.string,
                        diagram: PropTypes.string,
                        galleryImages: PropTypes.arrayOf(
                            PropTypes.shape({
                                url: PropTypes.string,
                                height: PropTypes.number,
                                width: PropTypes.number,
                                resized_url: PropTypes.string
                            })
                        )
                    })
                })
            })
        )
    }).isRequired
};

export default ImageGalleryEmbed;
