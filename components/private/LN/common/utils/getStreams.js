import compare from '../../../common/utils/compare';

const getStreams = (streams = [], operator = '<') =>
    (streams.length &&
        streams.reduce((prev, curr) =>
            compare(prev.height, curr.height, operator) ? prev : curr
        )) ||
    null;

export default getStreams;
