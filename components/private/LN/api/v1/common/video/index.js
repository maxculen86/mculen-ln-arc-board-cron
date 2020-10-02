const videoCommon = streams => {
    const orderedStreams = streams
        ? streams
              .filter(v => v.stream_type === 'mp4')
              .sort((a, b) => {
                  return a.width < b.width ? 1 : -1;
              })
        : [];
    if (orderedStreams.length === 0) return null;

    return {
        _t: 'mmf',
        width: orderedStreams[0].width,
        height: orderedStreams[0].height,
        url: orderedStreams[0].url
    };
};

export default videoCommon;
