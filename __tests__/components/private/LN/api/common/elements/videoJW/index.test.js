import { videoJWHomeMobile } from '../../../../../../../../components/private/LN/api/common/elements/videoJW';

describe('LN - api - commmon - elements - videoJw - videoJWHomeMobile function', () => {
    it('should return null if streams is null or undefined', () => {
        expect(videoJWHomeMobile(null)).toBeNull();
        expect(videoJWHomeMobile(undefined)).toBeNull();
    });

    it('should return null if there are no mp4 streams with <= 480', () => {
        const streams = [
            { type: 'video/mp4', width: 720 },
            { type: 'video/webm', width: 360 }
        ];
        expect(videoJWHomeMobile(streams)).toBeNull();
    });

    it('should return the largest mp4 stream within the range <= 480', () => {
        const streams = [
            { type: 'video/mp4', width: 360, file: '360.mp4', height: 200 },
            { type: 'video/mp4', width: 480, file: '480.mp4', height: 300 },
            { type: 'video/mp4', width: 240, file: '240.mp4', height: 100 }
        ];

        const expected = { _t: 'mmf', width: 480, height: 300, url: '480.mp4' };

        const result = videoJWHomeMobile(streams);

        expect(result).toEqual(expected);
    });

    it('should ignore streams without defined width', () => {
        const streams = [
            { type: 'video/mp4', file: 'no-width.mp4' },
            { type: 'video/mp4', width: 480, file: 'ok.mp4' }
        ];

        const result = videoJWHomeMobile(streams);

        expect(result).toEqual({ _t: 'mmf', width: 480, url: 'ok.mp4' });
    });

    it('should return null if stream list is empty', () => {
        const result = videoJWHomeMobile([]);
        expect(result).toBeNull();
    });
});
