// TODO: usar este como carrousell y renombrar
import React, { useState } from 'react';
import Carrousell from '../../../../common/carousell';
import GalleryItem from './galleryItem';

const index = props => {
    const { data, withZoom } = props;
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };
    return (
        <Carrousell itsGallery active={active}>
            {data.content_elements.map((v, i) => (
                <GalleryItem
                    mediaData={v}
                    galleryOrder={i}
                    totalGallery={data.content_elements.length}
                    withZoom={withZoom}
                    itsGallery
                    handleClick={handleClick}
                    active={active}
                />
            ))}
        </Carrousell>
    );
};

index.arcType = 'gallery';

export default index;
