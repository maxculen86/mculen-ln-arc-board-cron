import Consumer from 'fusion:consumer';

class Navigation {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const { globalContent } = this.props;
            return globalContent;
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Navigation);
