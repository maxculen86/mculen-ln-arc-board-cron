/* eslint-disable react/prop-types */

import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';

class CajaManual {
    constructor(props) {
        this.props = props;

        const imageId = get(props, 'customFields.imageId', '');

        if (imageId) {
            this.fetchContent({
                containerImage: {
                    source: 'relatedImageSource',
                    query: {
                        id: imageId,
                        published: true,
                        imageConfig: 'm',
                        'arc-site': 'la-nacion-ar'
                    }
                }
            });
        }
    }

    render() {
        try {
            const { containerImage } = this.state || {};
            const { children, customFields } = this.props;

            const sources = children.reduce((result, article) => {
                if (article) {
                    return result.concat(article);
                }
                return result;
            }, []);

            if (!sources.length) {
                return null;
            }

            return {
                information: { ...customFields, containerImage },
                articles: sources
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaManual);
