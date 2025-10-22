const generateVideoJW = stream => ({
    _t: 'mmf',
    width: stream.width,
    height: stream.height,
    url: stream.file
});

export const videoJWCommon = streams => {
    const orderedStreams = streams
        ? streams
              .filter(v => v.type === 'video/mp4')
              .sort((a, b) => (a.width < b.width ? 1 : -1))
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

export const videoJWHomeMobile = streams => {
    if (!streams) return null;
    return generateVideoJW(
        streams.find(v => v.type === 'video/mp4' && v.width === 480)
    );
};

export const videoJWM3u8 = streams => {
    if (!streams) return null;
    const objVideo = streams.find(
        v => v.type === 'application/vnd.apple.mpegurl'
    );

    return objVideo && objVideo.file;
};
