import getImage from '../../../../../../components/private/common/utils/image/getImage';
import { useContent } from 'fusion:content';
import articleMock from '../../../../../../__mocks__/data/articles/3SHTRO3NKBCN7L3JITCDQYSJLM.json';
jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

describe('Common - getImage', () => {
    const id = 'H53R624KARDARCICFNEC7ZC7YA';
    const sourceType = ['relatedImageSource', 'articleSourceNota'];
    const imageConfig = ['bomba', 'focalLeft3'];
    const isHideImage = false;

    it('when property is empty, return {}', () => {
        expect(getImage({})).toEqual({});
    });

    it('when id is empty, return {}', () => {
        const id = '';
        expect(
            getImage({
                sourceType: sourceType[0],
                imageConfig: imageConfig[0],
                isHideImage
            })
        ).toEqual({});
    });

    it('when sourceType is empty, return {}', () => {
        const sourceType = '';
        expect(
            getImage({ id, imageConfig: imageConfig[0], isHideImage })
        ).toEqual({});
    });

    it('when isHideImage is true, return {}', () => {
        const isHideImage = true;
        expect(
            getImage({
                id,
                sourceType: sourceType[0],
                imageConfig: imageConfig[0],
                isHideImage
            })
        ).toEqual({});
    });

    it('when all property is correct, return { Article JSON }', () => {
        useContent.mockReturnValueOnce(articleMock);
        const isHideImage = false;
        expect(
            getImage({
                id,
                sourceType: sourceType[0],
                imageConfig: imageConfig[0],
                isHideImage
            })
        ).toEqual(articleMock);
    });
});
