// TODO: usar este como carrousell y renombrar
import React from 'react';
import Carrousell from '../../../common/carousell';
import Media from './galleryItem';

export default function index(galleryData) {
    return (
        <Carrousell>
            {galleryData.content_elements.map((v, i) => (
                <Media
                    mediaData={v}
                    galleryOrder={i}
                    totalGallery={galleryData.content_elements.length}
                />
            ))}
        </Carrousell>
    );
}
