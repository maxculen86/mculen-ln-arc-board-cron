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
                }
            }
        });
    }

    render() {
        try {
            if (this.state) {
                const { authorSource } = this.state || {};
                return authorSource;
            }
            return '';
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Columnista);
