import Consumer from 'fusion:consumer';

class JuegoFeature {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const {
                customFields: { sectionId, subscriber }
            } = this.props;
            return { closed: subscriber, id: sectionId };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(JuegoFeature);
