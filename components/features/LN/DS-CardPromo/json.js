import Consumer from 'fusion:consumer';

class DSCardPromo {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const {
                customFields: { sectionId, subscriber, isNew }
            } = this.props;
            const badge = isNew === 'NUEVO' ? isNew : null;
            return { closed: subscriber, id: sectionId, badge };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(DSCardPromo);
