const generateVideo = stream => {
    return {
        _t: 'mmf',
        width: stream.width,
        height: stream.height,
        url: stream.url
    };
};

export const videoCommon = streams => {
    const orderedStreams = streams
        ? streams
              .filter(v => v.stream_type === 'mp4')
              .sort((a, b) => {
                  return a.width > b.width ? 1 : -1;
              })
        : [];
    if (orderedStreams.length === 0) return null;

    return generateVideo(orderedStreams[0]);
};

export const videos = streams => {
    if (!streams) return null;
    return streams.map(s => generateVideo(s));
};
