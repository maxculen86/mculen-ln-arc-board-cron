import React from 'react';
import GalleryEmbedCommon from '../../../common/galleryEmbed/default';
import { WrapperBody } from '../../../common/wrapperBody/default';

function GalleryEmbed({ data = {} }) {
    return (
        <WrapperBody variant="full-screen">
            <GalleryEmbedCommon data={data} />
        </WrapperBody>
    );
}
GalleryEmbed.arcType = 'gallery-embed';

export default GalleryEmbed;
