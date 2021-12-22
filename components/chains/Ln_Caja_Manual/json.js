//LN_Caja_Manual
import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';

class CajaManual {
    constructor(props) {
        this.props = props;

        const imageId = get(props, 'customFields.imageId', '');
        const idCollection = get(props, 'customFields.idCollection', '');

        imageId &&
            this.fetchContent({
                containerImage: {
                    source: 'relatedImageSource',
                    query: {
                        id: imageId.trim(),
                        published: true,
                        imageConfig: 'techoImagen',
                        'arc-site': 'la-nacion-ar',
                        nid: `idCollection: ${idCollection}`,
                        boxType: 'CajaManual'
                    }
                }
            });
    }

    render() {
        try {
            const { containerImage } = this.state || {};
            const { children, customFields } = this.props;

            const layout = get(customFields, 'layout', null);
            let storiesQuantity = 0;
            if (layout) {
                storiesQuantity = parseInt(
                    layout.charAt(layout.length - 1),
                    10
                );

                storiesQuantity = storiesQuantity || children.length;
            }

            const sources = children.reduce((result, article) => {
                if (
                    article &&
                    (storiesQuantity === 0 || result.length < storiesQuantity)
                ) {
                    return result.concat(article);
                }
                return result;
            }, []);

            if (!sources.length) {
                return null;
            }

            return {
                information: { ...customFields, image: containerImage },
                articles: sources
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaManual);
