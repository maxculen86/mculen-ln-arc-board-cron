// TODO: usar este como carrousell y renombrar
import React from 'react';
import Carrousell from '../../../common/carousell';
import Media from './mediaWithCredits';

export default function index(galleryData) {
    return (
        <Carrousell>
            {galleryData.content_elements.map(v => (
                <Media mediaData={v} />
            ))}
        </Carrousell>
    );
}
