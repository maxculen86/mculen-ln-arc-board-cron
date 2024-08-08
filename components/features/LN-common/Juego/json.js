import Consumer from 'fusion:consumer';

class JuegoFeature {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const {
                customFields: { sectionId, subscriber, isNewGame }
            } = this.props;
            const badge = isNewGame === 'SI' ? 'NUEVO' : null;
            return { closed: subscriber, id: sectionId, badge };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(JuegoFeature);
