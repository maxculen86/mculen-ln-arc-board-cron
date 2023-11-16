import getSourcesJw from '../../../../../../components/private/LN/common/utils/getSourcesJw';

describe('components - private - LN - common - utils - getSourcesJw', () => {
    const testStreams = [
        {
            file: 'https://cdn.jwplayer.com/videos/sThbpj0B-kTExGaWf.mp4',
            type: 'video/mp4',
            height: 720,
            width: 1280,
            label: '720p',
            bitrate: 2000000,
            filesize: 1024000,
            framerate: 30
        },
        {
            file: 'https://cdn.jwplayer.com/videos/sThbpj0B-kTExGaWf.mp4',
            type: 'video/mp4',
            height: 1,
            width: 1280,
            label: '720p',
            bitrate: 2000000,
            filesize: 1024000,
            framerate: 30
        },
        {
            file: 'https://cdn.jwplayer.com/videos/sThbpj0B-hz5z2Tv4.m4a',
            type: 'audio/mp4',
            label: 'AAC Audio',
            bitrate: 128000,
            filesize: 512000
        },
        {
            file: 'https://example.com/video.mp4',
            type: 'video/mp4',
            label: 'No Height',
            bitrate: 1500000,
            filesize: 800000
        }
    ];

    const testStreamsWithoutHeigth = [
        {
            file: 'https://cdn.jwplayer.com/videos/sThbpj0B-hz5z2Tv4.m4a',
            type: 'audio/mp4',
            label: 'AAC Audio',
            bitrate: 128000,
            filesize: 512000
        },
        {
            file: 'https://example.com/video.mp4',
            type: 'video/mp4',
            label: 'No Height',
            bitrate: 1500000,
            filesize: 800000
        }
    ];

    it('should return the source with the highest resolution when operator is ">"', () => {
        const result = getSourcesJw(testStreams, '>');
        expect(result).toEqual(testStreams[0]);
    });

    it('should return the source with the lowest resolution when operator is "<"', () => {
        const result = getSourcesJw(testStreams, '<');
        expect(result).toEqual(testStreams[1]);
    });

    it('should return null when no valid video sources are provided', () => {
        const result = getSourcesJw(testStreamsWithoutHeigth, '>');
        expect(result).toBeNull();
    });
});
