import { pickPreferredMp4 } from '../../../../../components/features/LN-10/itemCarrusel/_helper';

const sourcesMock = [
    {
        file: 'https://cdn.jwplayer.com/manifests/ERN8otZP.m3u8',
        type: 'application/vnd.apple.mpegurl'
    },
    {
        file: 'https://cdn.jwplayer.com/videos/ERN8otZP-kTExGaWf.mp4',
        type: 'video/mp4',
        height: 180,
        width: 320,
        label: '180p',
        bitrate: 268903,
        filesize: 81108131,
        framerate: 25
    },
    {
        file: 'https://cdn.jwplayer.com/videos/ERN8otZP-K8B0kybS.mp4',
        type: 'video/mp4',
        height: 270,
        width: 480,
        label: '270p',
        bitrate: 397512,
        filesize: 119899857,
        framerate: 25
    },
    {
        file: 'https://cdn.jwplayer.com/videos/ERN8otZP-46NIuRKO.mp4',
        type: 'video/mp4',
        height: 720,
        width: 1280,
        label: '720p',
        bitrate: 1221282,
        filesize: 368369365,
        framerate: 25
    },
    {
        file: 'https://cdn.jwplayer.com/videos/ERN8otZP-hz5z2Tv4.m4a',
        type: 'audio/mp4',
        label: 'AAC Audio',
        bitrate: 113401,
        filesize: 34204858
    },
    {
        file: 'https://cdn.jwplayer.com/videos/ERN8otZP-SomplJdm.mp4',
        type: 'video/mp4',
        height: 1080,
        width: 1920,
        label: '1080p',
        bitrate: 2681133,
        filesize: 808696992,
        framerate: 25
    },
    {
        file: 'https://cdn.jwplayer.com/videos/ERN8otZP-FnZGUVnC.mp4',
        type: 'video/mp4',
        height: 360,
        width: 640,
        label: '360p',
        bitrate: 462287,
        filesize: 139437386,
        framerate: 25
    },
    {
        file: 'https://cdn.jwplayer.com/videos/ERN8otZP-0G6Pwvlw.mp4',
        type: 'video/mp4',
        height: 540,
        width: 960,
        label: '540p',
        bitrate: 797176,
        filesize: 240448473,
        framerate: 25
    }
];

describe('pickPreferredMp4', () => {
    it('returns 540p when available', () => {
        expect(pickPreferredMp4(sourcesMock)).toBe(
            'https://cdn.jwplayer.com/videos/ERN8otZP-0G6Pwvlw.mp4'
        );
    });

    it('returns 360p when 540p is not available', () => {
        const sourcesWithout540 = sourcesMock.filter(
            source => source?.label !== '540p'
        );

        expect(pickPreferredMp4(sourcesWithout540)).toBe(
            'https://cdn.jwplayer.com/videos/ERN8otZP-FnZGUVnC.mp4'
        );
    });

    it('falls back to first mp4 source when preferred labels are missing', () => {
        const sourcesWithoutPreferred = sourcesMock.filter(
            source => !['540p', '360p'].includes(source?.label)
        );

        expect(pickPreferredMp4(sourcesWithoutPreferred)).toBe(
            'https://cdn.jwplayer.com/videos/ERN8otZP-kTExGaWf.mp4'
        );
    });

    it('returns empty string when there are no valid mp4 sources', () => {
        const nonMp4Sources = sourcesMock.filter(
            source => source?.type !== 'video/mp4'
        );

        expect(pickPreferredMp4(nonMp4Sources)).toBe('');
    });
});
