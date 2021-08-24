import Consumer from 'fusion:consumer';

class Services {
    constructor(props) {
        this.props = props;
        // Regex actual: ^\/api\/v([1]+)\/servicios
    }

    render() {
        const { globalContent } = this.props;
        try {
            return globalContent;
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Services);
