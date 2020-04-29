// TODO: usar este como carrousell y renombrar
import React from 'react';
import Carrousell from '../../../../common/carousell';
import GalleryItem from './galleryItem';

const index = props => {
    const { data, withZoom } = props;
    return (
        <Carrousell>
            {data.content_elements.map((v, i) => (
                <GalleryItem
                    mediaData={v}
                    galleryOrder={i}
                    totalGallery={data.content_elements.length}
                    withZoom={withZoom}
                    itsGallery
                />
            ))}
        </Carrousell>
    );
};

index.arcType = 'gallery';

export default index;
