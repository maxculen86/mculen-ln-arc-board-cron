import React from 'react';
import PropTypes from 'fusion:prop-types';
import AmpImage from '../../ampImage';

const index = props => {
    const { data } = props;

    // TODO: ask the markup team for sizes ( they should probably come from a configuration file or as props, who knows ... )
    return (
        <>
            <amp-carousel
                width="750"
                height="500"
                layout="responsive"
                type="slides"
            >
                {data.content_elements.map(image => {
                    const sources =
                        image.resized_urls &&
                        image.resized_urls.filter(v => !!v.option);
                    return (
                        <AmpImage
                            alt={image.caption || ''}
                            height={image.height}
                            width={image.width}
                            url={image.url}
                            sources={sources}
                            layout="responsive"
                        />
                    );
                })}
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
