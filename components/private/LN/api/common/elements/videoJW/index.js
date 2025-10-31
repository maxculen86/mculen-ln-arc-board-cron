import { enumTypeError } from '../../enums/enumTypeError';

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
    try {
        if (!streams) return null;
        const mp4Streams = streams
            .filter(v => v?.type === 'video/mp4' && v?.width && v.width <= 480)
            .sort((a, b) => (a.width < b.width ? 1 : -1));

        if (mp4Streams.length === 0) return null;

        return generateVideoJW(mp4Streams[0]);
    } catch (error) {
        console.warn(
            JSON.stringify(
                {
                    name: 'BackendLnWarn',
                    customErrorType: 'BackendLnWarn',
                    customType: enumTypeError.storyContentError,
                    log_details: {
                        message: `videoJWHomeMobile - ${error?.message ?? error}`,
                        content: streams
                    }
                },
                null,
                2
            )
        );
        return null;
    }
};

export const videoJWM3u8 = streams => {
    if (!streams) return null;
    const objVideo = streams.find(
        v => v.type === 'application/vnd.apple.mpegurl'
    );

    return objVideo && objVideo.file;
};
