import Consumer from 'fusion:consumer';

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
                filter: `{
                    slug name image {url}
                }`,
                transform(data) {
                    return {
                        autor: [data._id, data.slug, data.name, data.image, 1]
                    };
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
