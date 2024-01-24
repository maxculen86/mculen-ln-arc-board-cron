import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';

class CajaJuegos {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const items = this.props.children;

            if (
                this.props.customFields &&
                this.props.customFields.hideCaja == null
            ) {
                this.props.customFields.hideCaja = false;
            }

            return {
                information: {
                    ...this.props.customFields,
                    url: get(this.props.customFields, 'link', null)
                },
                items
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaJuegos);
