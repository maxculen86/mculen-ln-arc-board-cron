import React from 'react';

const index = props => {
    //console.log("PROPS DE CARROUSELL AMP:", props);
    const { data } = props;
    console.log('dentro del componente carrousell AMP');
    /* return (
        <amp-carousel width="450" height="300" layout="responsive" type="slides">
            {data.content_elements.map((v, i) => (
                <amp-img
                    mediaData={v}
                    galleryOrder={i}
                    totalGallery={data.content_elements.length}
                />
            ))}
        </amp-carousel>
    ); */
    return <div>Soy el carrousell AMP</div>;
};

index.arcType = 'gallery';

export default index;
