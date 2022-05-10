import Consumer from 'fusion:consumer';
import { authorHomeMobile } from '../../../private/LN/api/v1/common/author';

class Columnista {
    constructor(props) {
        this.props = props;
        const { customFields } = props;
        const { id: authorSlug } = customFields;

        this.fetchContent({
            authorSource: {
                source: 'authorSource',
                query: {
                    _id: authorSlug
                },
                transform(data) {
                    const autor = data;
                    if (data) {
                        autor.image = {
                            ...autor.image,
                            resized_urls: [{ resizedUrl: autor.image.url }]
                        };
                    }
                    return authorHomeMobile(autor);
                }
            }
        });
    }

    render() {
        try {
            const { authorSource } = this.state || {};
            return authorSource;
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Columnista);
