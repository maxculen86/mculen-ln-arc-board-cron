import {
    setHeight,
    updateHeight,
    setStrFocal,
    setCropMethod
} from '../../../../../../components/private/common/utils/image/resizer';

jest.mock('thumbor', () => {
    return jest.fn().mockImplementation();
});

const thumborMock = {
    smartCrop: jest.fn(),
    filter: jest.fn()
};

describe('Common - Resizer', () => {
    describe('Common - Resizer - updateHeight fn', () => {
        const opt = {
            width: 768,
            height: 513
        };
        it('Should return new height for vertical images, according to proportion', () => {
            const height = updateHeight(2880, 1944, opt);
            expect(height).toBe(1137);
        });
        it('Should return same height for horizontal images', () => {
            const opt = {
                width: 768,
                height: 513
            };
            const height = updateHeight(1944, 2880, opt);
            expect(height).toBe(513);
        });
        it('Should return same height for images with proportion set', () => {
            opt.proportion = '2:3';
            const height = updateHeight(2880, 1944, opt);
            expect(height).toBe(513);
        });
    });
    it('should return height according proportion', () => {
        const height = setHeight(1200, 800, '3:2');
        expect(height).toBe(800);
    });

    it('should return the correct focal string', () => {
        const focalStr = setStrFocal(500, 450);
        expect(focalStr).toBe('495x455:505x445');
    });

    it('should use smartCrop', () => {
        const mockValues = {
            resizeOptions: {
                width: 298,
                height: 200,
                media: '(min-width: 1280px)',
                useFullSize: true,
                proportion: '3:2'
            },
            originalWidth: 2000,
            originalHeight: 1333,
            focalPoint: [],
            smartCropExcluded: false
        };

        setCropMethod({ thumbor: thumborMock, ...mockValues });
        expect(thumborMock.smartCrop).toBeCalledTimes(1);
    });

    it('should use filter focal', () => {
        const mockValues = {
            resizeOptions: {
                width: 298,
                height: 200,
                media: '(min-width: 1280px)',
                useFullSize: true,
                proportion: '3:2',
                isNotSmart: true
            },
            originalWidth: 2000,
            originalHeight: 1333,
            focalPoint: [500, 200],
            smartCropExcluded: false
        };

        setCropMethod({ thumbor: thumborMock, ...mockValues });
        expect(thumborMock.filter).toBeCalledTimes(1);
    });
});
