import React from 'react';
import { useAppContext } from 'fusion:context';
import { extractGalleryEmbedData, getAspectRatioClass } from './helpers';

import {
    galleryContainerVariant,
    galleryEmbedItemVariant,
    galleryGridVariant
} from './styles';
import Gallery from './components/Gallery';
import { isFotoAl100orStorytelling } from '../../../../private/common/utils/subtypes/subtypeHelper';

function GalleryEmbed(props) {
    const { globalContent = {} } = useAppContext() || {};
    const { subtype } = globalContent;

    if (!isFotoAl100orStorytelling(subtype)) return null;

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
    return <Gallery {...viewProps} />;
}

export default GalleryEmbed;
