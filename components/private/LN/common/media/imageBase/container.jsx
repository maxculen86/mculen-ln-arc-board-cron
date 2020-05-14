import Consumer from 'fusion:consumer';
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ImageBase from './component';
import AmpImage from '../../ampImage';

class ImageArticle extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { image, zoom, href, outputType, active } = this.props;
        const { alt_text: altText, caption } = image;
        const altBasic = altText || caption || '';
        if (!image.url) return null;
        const amp = outputType === 'amp';

        const sources =
            image.resized_urls && image.resized_urls.filter(v => !!v.option);
        const sourcesZoom =
            image.resized_urls_zoom &&
            image.resized_urls_zoom.filter(v => !!v.option);

        return (
            <>
                <ImageBase
                    active={active}
                    urlDefault={image.url}
                    sources={sources || []}
                    altText={altBasic}
                    zoom={zoom}
                    sourcesZoom={sourcesZoom || []}
                    href={href}
                    width={image.width}
                    height={image.height}
                    amp={amp}
                />
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
        resized_urls_zoom: PropTypes.array.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        alt_text: PropTypes.string,
        caption: PropTypes.string
    }).isRequired,
    zoom: PropTypes.bool,
    active: PropTypes.bool.isRequired,
    href: PropTypes.string
};

export default Consumer(ImageArticle);
