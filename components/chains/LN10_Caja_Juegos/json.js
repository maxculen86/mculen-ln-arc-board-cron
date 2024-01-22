import Consumer from 'fusion:consumer';

class CajaJuegos {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const items = this.props.children;
            return { items };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaJuegos);
