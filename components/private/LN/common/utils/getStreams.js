/* eslint-disable no-eval */

const getStreams = (streams = [], quality = '<') =>
    (streams.length &&
        streams.reduce((prev, curr) =>
            eval(`${prev.height} ${quality} ${curr.height}`) ? prev : curr
        )) ||
    null;

export default getStreams;
