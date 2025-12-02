import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { extractGalleryEmbedData, getAspectRatioClass } from './_helper';
import { isFotoAl100 } from '../../../body/_utils/helpers';
import {
    galleryContainerVariant,
    galleryEmbedItemVariant,
    galleryGridVariant
} from './styles';
import ImageGallery from './components/ImageGallery';

function ImageGalleryEmbed(props) {
    const { globalContent = {} } = useAppContext() || {};
    const { subtype, type } = globalContent;

    if (!isFotoAl100(subtype, type)) return null;

    const { data = {} } = props;
    const galleryData = extractGalleryEmbedData(data);
    const {
        diagram,
        galleryImages,
        caption,
        isFotoAl100: isFotoAl100Flag
    } = galleryData;

    if (!galleryData || !diagram) {
        return null;
    }

    const viewProps = {
        galleryImages,
        caption,
        gridClass: galleryGridVariant({ diagram }),
        containerClass: galleryContainerVariant({ isFotoAl100Flag }),
        embedItemClass: galleryEmbedItemVariant({ isFotoAl100Flag }),
        aspectRatio: getAspectRatioClass(diagram)
    };

    return <ImageGallery {...viewProps} />;
}

ImageGalleryEmbed.arcType = 'gallery-embed';

ImageGalleryEmbed.propTypes = {
    data: PropTypes.shape({
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
                        resized_urls: PropTypes.array
                    })
                )
            })
        })
    })
};

ImageGalleryEmbed.defaultProps = {
    data: {}
};

export default ImageGalleryEmbed;
