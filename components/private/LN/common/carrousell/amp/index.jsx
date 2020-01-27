import React from 'react';
import Image from '../../media/imageBase';

const index = props => {
    const { data } = props;
    console.log(
        '######################  CARROUSELL AMP ################# :',
        data.content_elements
    );
    return (
        <>
            <div>ACA TOY</div>
            <amp-carousel
                width="450"
                height="300"
                layout="responsive"
                type="slides"
            >
                {data.content_elements.map((v, i) => (
                    <Image image={v} href={v.url} />
                ))}
            </amp-carousel>
        </>
    );
};

index.arcType = 'gallery';

export default index;
