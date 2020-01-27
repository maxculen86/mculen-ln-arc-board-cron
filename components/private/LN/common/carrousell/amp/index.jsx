import React from 'react';
import PropTypes from 'fusion:prop-types';

const index = props => {
    const { data } = props;

    // TODO: ask the markup team for sizes
    return (
        <>
            <amp-carousel width="450" height="300" layout="fixed" type="slides">
                {data.content_elements.map(image => (
                    <amp-img
                        media={image.resized_urls.media}
                        src={image.url}
                        width={image.width}
                        height={image.height}
                        layout="responsive"
                        alt={image.caption}
                    />
                ))}
            </amp-carousel>
        </>
    );
};

index.arcType = 'gallery';

index.propTypes = {
    data: PropTypes.shape({
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string,
                width: PropTypes.number,
                height: PropTypes.number,
                caption: PropTypes.string,
                resized_urls: PropTypes.shape({
                    media: PropTypes.string
                })
            }).isRequired
        )
    }).isRequired
};

export default index;
