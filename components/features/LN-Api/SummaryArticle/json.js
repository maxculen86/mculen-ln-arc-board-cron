import Consumer from 'fusion:consumer';

const Summary = (props = {}) => {
    try {
        const { globalContent = {} } = props;
        return globalContent;
    } catch (err) {
        return { Success: false, Message: err.message };
    }
};

export default Consumer(Summary);
