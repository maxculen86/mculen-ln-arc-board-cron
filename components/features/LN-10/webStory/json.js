import Consumer from 'fusion:consumer';
import { getChainConfig } from '../article/common/_helper-WebApi';
import { validateProps } from '../../../private/LN/api/global/components/features/article/LN10/props/validateProps';
import filterImage from '../../../../content/filters/LN/home/imageFilter';
import { filterWebStoriesRenderables } from '../../../chains/LN10_Caja_WebStories/common/_helper-WebApi';

class WebStoryFeature {
    constructor(props) {
        this.state = {};
        const {
            customFields: { imageId },
            id: featureId,
            renderables = []
        } = props;

        this.configs =
            getChainConfig({
                featureId,
                renderables: filterWebStoriesRenderables(renderables)
            }) || {};

        this.props = validateProps(props, this.configs);

        imageId &&
            imageId.trim() &&
            this.fetchContent({
                webstoryImageLN10: {
                    source: 'relatedImageSource',
                    query: {
                        imageConfig: 'webStories',
                        id: imageId.trim(),
                        onlyOneApeturaValidateForWWW: false,
                        isAdmin: false
                    },
                    filter: filterImage
                }
            });
    }

    render() {
        try {
            const { index } = this.configs;
            const { webstoryImageLN10 } = this.state || {};
            const { customFields } = this.props;
            const { imageId } = customFields;

            if (!webstoryImageLN10 && !imageId) return null;

            if (!customFields.link) return null;

            const additionalProperties = {
                ...customFields,
                imagen: webstoryImageLN10 || null,
                variant: 'webstories',
                imageId
            };

            return {
                _id: `webstory${index + 1}`,
                website_url: customFields.link,
                additionalProperties
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(WebStoryFeature);
