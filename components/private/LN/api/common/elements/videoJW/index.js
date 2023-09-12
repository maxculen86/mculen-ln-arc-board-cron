const generateVideoJW = stream => {
    return {
        _t: 'mmf',
        width: stream.width,
        height: stream.height,
        url: stream.file
    };
};

export const videoJWCommon = streams => {
    const orderedStreams = streams
        ? streams
              .filter(v => v.type === 'video/mp4')
              .sort((a, b) => {
                  return a.width < b.width ? 1 : -1;
              })
        : [];
    if (orderedStreams.length === 0) return null;

    return generateVideoJW(orderedStreams[0]);
};

export const videosJW = streams => {
    if (!streams) return null;
    return streams
        .filter(v => v.type === 'video/mp4')
        .map(s => generateVideoJW(s));
};
