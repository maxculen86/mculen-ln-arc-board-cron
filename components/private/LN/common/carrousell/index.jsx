// TODO: usar este como carrousell y renombrar
import React from 'react';
import Carrousell from '../../../common/carousell';
import Media from './galleryItem';

const index = props => {
    console.log('props ****************-----************', props);
    const { data } = props;
    return (
        <Carrousell>
            {data.content_elements.map((v, i) => (
                <Media
                    mediaData={v}
                    galleryOrder={i}
                    totalGallery={data.content_elements.length}
                />
            ))}
        </Carrousell>
    );
};

index.arcType = 'gallery';

export default index;
