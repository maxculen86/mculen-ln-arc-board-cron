import Consumer from 'fusion:consumer';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import { getChainConfig } from '../article/common/_helper-WebApi';
import withResizerV2 from '../../../private/common/utils/image/enableResizerV2';
import { validateProps } from '../../../private/LN/api/global/components/features/article/LN10/props/validateProps';
import filterImage from '../../../../content/filters/LN/home/imageFilter';

class WebStoryFeature {
    constructor(props) {
        this.state = {};
        const {
            customFields: { imageId },
            id: featureId,
            renderables = [],
            layout: layoutPageBuilder
        } = props;

        const { layoutsName = {} } = siteConfig || {};
        this.configs = getChainConfig({ featureId, renderables }) || {};

        this.shouldUseV2 =
            withResizerV2 && layoutPageBuilder === layoutsName.HomeLN10;

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
                        isAdmin: false,
                        shouldUseV2: this.shouldUseV2
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

            if (!webstoryImageLN10) {
                return null;
            }

            const additionalProperties = {
                ...customFields,
                imagen: webstoryImageLN10 || null,
                variant: 'webstories',
                imageId
            };

            return {
                _id: `webstory${index}`,
                additionalProperties
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(WebStoryFeature);
