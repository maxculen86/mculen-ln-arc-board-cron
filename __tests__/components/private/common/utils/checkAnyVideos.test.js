import checkAnyVideos from '../../../../../components/private/common/utils/checkAnyVideos';

import articleWithContentElementVideo from '../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNI';
import articleWithSubtypeVideoJW from '../../../../../__mocks__/data/articles/articleWithSubtypeVideoJW';
import articleWithAperturaVideo from '../../../../../__mocks__/data/articles/articleWithAperturaVideo';
import articleWIthAperturaStorytellingVideo from '../../../../../__mocks__/data/articles/articleWIthAperturaStorytellingVideo';
import articleWithAperturaMultimediaVideo from '../../../../../__mocks__/data/articles/articleWithAperturaMultimediaVideo';
import articleWithAperturaVideoJW from '../../../../../__mocks__/data/articles/articleWithAperturaVideoJW';
import articleWithoutVideos from '../../../../../__mocks__/data/articles/2CIOHVMKJBHKDMMHH2WBIZGJWE';

describe('Components - private - common - utils - checkAnyVideos', () => {
    const cases = [
        [
            'should return true if there are any content elements with type video',
            articleWithContentElementVideo
        ],
        [
            'should return true if there are any content elements with subtype video_jw',
            articleWithSubtypeVideoJW
        ],
        [
            'should return true if there are any videos in apertura basic',
            articleWithAperturaVideo
        ],
        [
            'should return true if there are any videos in apertura storytelling',
            articleWIthAperturaStorytellingVideo
        ],
        [
            'should return true if there are any videos in apertura multimedia',
            articleWithAperturaMultimediaVideo
        ],
        [
            'should return true if there are any videos in apertura video jw',
            articleWithAperturaVideoJW
        ],
        [
            'should return false if there are not any videos',
            articleWithoutVideos,
            false
        ]
    ];

    test.each(cases)('%s', (_, globalContent, expectedResult = true) => {
        expect(checkAnyVideos(globalContent)).toBe(expectedResult);
    });
});
