const videoCommon = video => {
    const { _id: id, streams } = video;

    const orderedStreams = streams
        .filter(v => v.stream_type === 'mp4')
        .sort((a, b) => {
            return a.width > b.width ? 1 : -1;
        });
    if (orderedStreams.length === 0) return null;
    return {
        id,
        url: orderedStreams[0].url
    };
};

export default videoCommon;
