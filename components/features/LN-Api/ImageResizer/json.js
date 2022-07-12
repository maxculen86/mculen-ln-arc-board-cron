import Consumer from 'fusion:consumer';
import browser from '../../../private/common/utils/browser';
import ImageV1 from '../../../private/LN/api/v1/common/story/image';

// Responde al resolver que permite pasar las versiones existentes
// Regex actual: ^\/api\/(?:mobile\/)?v([1-2]+)\/images\/(byId\/(.+)\/$)
class ImageResizer {
    constructor(props) {
        this.props = props;

        const {
            globalContent: { url }
        } = props;
        const regexUpperExtension = /\b[A-Z]+\b/g;
        const modifiedUrl = url.replace(regexUpperExtension, match => {
            return match.toLowerCase();
        });
        this.fetch(modifiedUrl);
        this.apiData = {
            global: {
                1: ImageV1
            },
            mobile: {
                1: ImageV1
            }
        };
    }

    fetch(imageUrl) {
        this.fetchContent({
            imageResizeSource: {
                source: 'imageResizeSource',
                query: {
                    url: imageUrl
                }
            }
        });
    }

    render() {
        try {
            const { imageResizeSource } = this.state;
            const { globalContent } = this.props;
            const indexImage = this.apiData[
                browser.getApiType(this.props.requestUri)
            ][browser.getApiVersion(this.props.requestUri)];

            return indexImage({
                ...globalContent,
                resized_urls: imageResizeSource
            });
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ImageResizer);
