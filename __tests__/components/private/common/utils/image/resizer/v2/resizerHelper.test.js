import * as resizerHelper from '../../../../../../../../components/private/common/utils/image/resizer/v2/resizerHelper';

jest.mock('thumbor', () => {
    return jest.fn().mockImplementation();
});

jest.mock('fusion:environment', () => {
    return {
        SITE_LANACION: 'https://sandbox.lanacion.com.ar/',
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com/resizer/'
    };
});

const thumborMock = {
    smartCrop: jest.fn(),
    filter: jest.fn()
};

describe('Common - Resizer', () => {
    // https://sandbox.lanacion.com.ar/resizer/v2/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933c5b63e67a9d263f2c20ac045aa3c992ab691cbcc7fff9&width=309&height=206&quality=80&smart=false
    describe('buildQueryParams', () => {
        const imgAuth = '1f6894f8d079227a933';

        test('should return string with auth params', () => {
            expect(resizerHelper.buildQueryParams({})).toEqual('');
        });

        test('should return string with auth params', () => {
            const queryParams = resizerHelper.buildQueryParams({
                imgAuth,
                newWidth: 1200,
                newHeight: 1200,
                filterQuality: 88,
                smartCropExcluded: false,
                focalPoint: [1, 2]
            });
            expect(queryParams).toEqual(
                'auth=1f6894f8d079227a933&width=1200&height=1200&quality=88&smart=false'
            );
        });

        test('should return string with auth params', () => {
            expect(
                resizerHelper.buildQueryParams({
                    imgAuth: '1f6894f8d079227a933'
                })
            ).toEqual('auth=1f6894f8d079227a933');
        });

        test('should return string with Width params', () => {
            expect(resizerHelper.buildQueryParams({ newWidth: 1200 })).toEqual(
                '&width=1200'
            );
        });

        test('should return string with Width params', () => {
            expect(resizerHelper.buildQueryParams({ newWidth: [] })).toEqual(
                ''
            );
        });

        test('should return string with Width params', () => {
            expect(resizerHelper.buildQueryParams({ newHeight: 1200 })).toEqual(
                '&height=1200'
            );
        });
    });
    describe('Common - Resizer - updateHeight fn', () => {
        const opt = {
            width: 768,
            height: 513
        };
        it('Should return new height for vertical images, according to proportion', () => {
            const height = resizerHelper.updateHeight(2880, 1944, opt);
            expect(height).toBe(1137);
        });
        it('Should return same height for horizontal images', () => {
            const opt = {
                width: 768,
                height: 513
            };
            const height = resizerHelper.updateHeight(1944, 2880, opt);
            expect(height).toBe(513);
        });
        it('Should return same height for images with proportion set', () => {
            opt.proportion = '2:3';
            const height = resizerHelper.updateHeight(2880, 1944, opt);
            expect(height).toBe(513);
        });
    });

    it('should return height according proportion', () => {
        const height = resizerHelper.setHeight(1200, 800, '3:2');
        expect(height).toBe(800);
    });

    it('should return the correct focal string', () => {
        const focalStr = resizerHelper.setStrFocal(500, 450);
        expect(focalStr).toBe('495x455:505x445');
    });

    // TODO: Fix test que retorne las proporciones, quitar llamado de thumbor
    test('should use smartCrop', () => {
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

        resizerHelper.setCropMethod({ thumbor: thumborMock, ...mockValues });
        expect(thumborMock.smartCrop).toBeCalledTimes(1);
    });

    // TODO: Fix test que retorne las proporciones, quitar llamado de thumbor
    test('should use filter focal', () => {
        const mockValues = {
            defaultResizeWithSmart: {
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

        resizerHelper.setCropMethod({ thumbor: thumborMock, ...mockValues });
        expect(thumborMock.filter).toBeCalledTimes(1);
    });

    describe('baseUrl function', () => {
        const siteLanacion = 'https://sandbox.lanacion.com.ar/';
        const resizerUrlPublic = 'https://resizer.glanacion.com/resizer/';

        const baseUrlCases = [
            [
                'When isAdmin false and isInApertura true should return https://sandbox.lanacion.com.ar/',
                {
                    testArguments: [{ isAdmin: false, isInApertura: true }],
                    testResult: siteLanacion
                }
            ],
            [
                'When isAdmin true and isInApertura true should return https://resizer.glanacion.com/resizer/',
                {
                    testArguments: [{ isAdmin: true, isInApertura: true }],
                    testResult: resizerUrlPublic
                }
            ],
            [
                'When isAdmin true and isInApertura false should return https://resizer.glanacion.com/resizer/',
                {
                    testArguments: [{ isAdmin: true, isInApertura: false }],
                    testResult: resizerUrlPublic
                }
            ],
            [
                'When isAdmin false and isInApertura false should return https://resizer.glanacion.com/resizer/',
                {
                    testArguments: [{ isAdmin: false, isInApertura: false }],
                    testResult: resizerUrlPublic
                }
            ]
        ];

        test.each(baseUrlCases)(
            '%s',
            (message, { testArguments, testResult }) => {
                const result = resizerHelper.baseUrl(...testArguments);
                expect(result).toEqual(testResult);
            }
        );
    });
});
