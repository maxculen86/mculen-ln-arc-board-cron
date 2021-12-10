import Consumer from 'fusion:consumer';
import get from 'lodash.get';

class Services {
    constructor(props) {
        this.props = props;
        // Regex actual: ^\/api\/v([1]+)\/servicios
    }

    render() {
        const { globalContent } = this.props;
        try {
            const dolarCotization = globalContent.data.map(value => {
                const type = get(value, 'sourceName', '');
                if (type && type === 'dccl')
                    return {
                        ...value,
                        compra: '-'
                    };

                return value;
            });
            return { ...globalContent, data: dolarCotization };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Services);
