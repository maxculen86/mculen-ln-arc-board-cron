import { useContent } from 'fusion:content';
import useGetMediaData from '../../../../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/useGetMediaData';
import useGetVideoPosterResized from '../../../../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/useGetVideoPosterResizer';
import articleMock from '../../../../../../../../../__mocks__/data/articles/3SHTRO3NKBCN7L3JITCDQYSJLM.json';
import resultVideoWithResizerV1 from '../../../../../../../../../__mocks__/data/videos/getDataToLinkImage/responseGetVideoPosterResized.json';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock(
    '../../../../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/useGetVideoPosterResizer',
    () => jest.fn()
);

describe('Tests hook useGetMediaData', () => {
    const props = {
        isInApertura: true,
        imageConfig: '',
        isHideImage: true,
        isHomeLN10: true,
        isAdmin: false,
        imageID: 'imageID',
        videoID: 'videoID',
        noteID: 'noteID'
    };
    test('should return video data', () => {
        useContent.mockReturnValueOnce(articleMock);
        useGetVideoPosterResized.mockImplementation(
            () => resultVideoWithResizerV1
        );

        expect(useGetMediaData(props)).toStrictEqual(resultVideoWithResizerV1);
    });

    test('should return article', () => {
        useContent.mockReturnValueOnce(articleMock);
        useGetVideoPosterResized.mockImplementation(() => undefined);
        expect(useGetMediaData(props)).toStrictEqual(articleMock);
    });
});
