import Consumer from 'fusion:consumer';
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ImageBase from './component';
import AmpImage from '../../ampImage';

class ImageArticle extends React.Component {
    componentDidMount() {}

    render() {
        const { image, altText, zoom, href, outputType } = this.props;

        if (!image.url) return null;
        const amp = outputType === 'amp';

        const sources =
            image.resized_urls && image.resized_urls.filter(v => !!v.option);

        return (
            <>
                {amp ? (
                    <AmpImage
                        sources={sources}
                        url={image.url}
                        alt={altText || ''}
                        width={image.width}
                        height={image.height}
                    />
                ) : (
                    <ImageBase
                        urlDefault={image.url}
                        sources={sources || []}
                        altText={altText}
                        zoom={zoom}
                        href={href}
                        width={image.width}
                        height={image.height}
                    />
                )}
            </>
        );
    }
}

ImageArticle.propTypes = {
    outputType: PropTypes.string.isRequired,
    image: PropTypes.shape({
        type: PropTypes.oneOf(['image']),
        url: PropTypes.string,
        resized_urls: PropTypes.array.isRequired,
        width: PropTypes.number,
        height: PropTypes.number
    }).isRequired,
    altText: PropTypes.string,
    zoom: PropTypes.bool,
    href: PropTypes.string
};

export default Consumer(ImageArticle);
