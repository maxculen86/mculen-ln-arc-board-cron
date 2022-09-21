import {
    getEndpointAudioNews,
    parseDate,
    calculateTime
} from '../../../../../components/private/common/audioNews/helpers';

jest.mock('fusion:environment', () => {
    return {
        AUDIO_NEWS_URL:
            'https://qa-audionews.lanacion.com.ar/api/v1/audio/status/'
    };
});

describe('getEndpointAudioNews - parseDate', () => {
    const publishDate = '2022-09-15T23:57:45.682Z';
    const noteId = 'CV2AWECQORF4HLDVMFFJCLQ234';
    describe('Tests function getEndpointAudioNews', () => {
        test('should return null when publishDate is not defiend', () => {
            const publishDate = null;
            expect(getEndpointAudioNews(publishDate, noteId)).toBeNull();
        });

        test('should return null when noteId is not defiend', () => {
            const noteId = null;
            expect(getEndpointAudioNews(publishDate, noteId)).toBeNull();
        });

        test('should return null when noteId and publishDate is not defiend', () => {
            const noteId = null;
            const publishDate = null;

            expect(getEndpointAudioNews(publishDate, noteId)).toBeNull();
        });

        test('should return the armed url', () => {
            expect(getEndpointAudioNews(publishDate, noteId)).toStrictEqual(
                'https://qa-audionews.lanacion.com.ar/api/v1/audio/status/20220915235745/CV2AWECQORF4HLDVMFFJCLQ234/'
            );
        });
    });

    describe('Tests function parseDate', () => {
        test('should return null when date is not defiend', () => {
            const publishDate = null;
            expect(parseDate(publishDate)).toBeNull();
        });

        test('should return the url without symbols or letters or the last four characters.', () => {
            expect(parseDate(publishDate)).toStrictEqual('20220915235745');
        });
    });

    describe('Tests function calculateTime', () => {
        test('should 00:00 when seconds is not defined', () => {
            const seconds = null;
            expect(calculateTime(seconds)).toStrictEqual('00:00');
        });

        test('should return 1:40 minutes', () => {
            const seconds = 100;
            expect(calculateTime(seconds)).toStrictEqual('01:40');
        });

        test('should return 10 seconds', () => {
            const seconds = 10.5;
            expect(calculateTime(seconds)).toStrictEqual('00:10');
        });
    });
});
