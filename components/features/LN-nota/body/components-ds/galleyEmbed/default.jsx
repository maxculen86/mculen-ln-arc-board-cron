import React from 'react';
import GalleryEmbedCommon from '../../../../LN/common/galleryEmbed/default';

function GalleryEmbed({ data = {} }) {
    return (
        <div data-tw style={{ display: 'contents' }} className="mb-16">
            <GalleryEmbedCommon data={data} />
        </div>
    );
}
GalleryEmbed.arcType = 'gallery-embed';

export default GalleryEmbed;
