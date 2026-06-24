import compare from '../../../common/utils/compare';

const getSourcesJw = (streams = [], operator = '<') => {
    const filteredStreams = streams.filter(stream => stream.height);

    if (filteredStreams.length === 0) {
        return null;
    }

    return filteredStreams.reduce((prev, curr) =>
        compare(prev.height, curr.height, operator) ? prev : curr
    );
};
export default getSourcesJw;
