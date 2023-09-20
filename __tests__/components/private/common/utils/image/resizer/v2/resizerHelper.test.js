import * as resizerHelper from '../../../../../../../../components/private/common/utils/image/resizer/v2/resizerHelper';

jest.mock('fusion:environment', () => {
    return {
        SITE_LANACION: 'https://sandbox.lanacion.com.ar/',
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com/resizer/',
        API_ENV: 'prod'
    };
});

describe('Common - Resizer', () => {
    // https://sandbox.lanacion.com.ar/resizer/v2/J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933c5b63e67a9d263f2c20ac045aa3c992ab691cbcc7fff9&width=309&height=206&quality=80&smart=false
    describe('buildQueryParams', () => {
        const arcImage = {
            _id: 'J43DRG7ZGZCANB6PYJG2VQ35QY',
            additional_properties: {
                originalUrl:
                    'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/Wilbert.jpg'
            },
            auth: {
                1: '1f6894f8d079227a933'
            }
        };

        test('Should return empty string without arcImage data', () => {
            expect(resizerHelper.buildQueryParams({})).toEqual('');
        });

        test('Should return string with auth, width, height, quality and smart params', () => {
            const queryParams = resizerHelper.buildQueryParams({
                newWidth: 1200,
                newHeight: 1200,
                filterQuality: 70,
                arcImage
            });
            expect(queryParams).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&width=1200&height=1200&quality=70&smart=false'
            );
        });

        test('Should return string with auth params', () => {
            expect(
                resizerHelper.buildQueryParams({
                    arcImage
                })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&quality=70&smart=false'
            );
        });

        test('Should return string with Width params', () => {
            expect(
                resizerHelper.buildQueryParams({ newWidth: 1200, arcImage })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&width=1200&quality=70&smart=false'
            );
        });

        test('should return string with all params but without Width param', () => {
            expect(
                resizerHelper.buildQueryParams({ newWidth: [], arcImage })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&quality=70&smart=false'
            );
        });

        test('should return string with Height params', () => {
            expect(
                resizerHelper.buildQueryParams({ newHeight: 1200, arcImage })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&height=1200&quality=70&smart=false'
            );
        });

        test('should return string with height params but without focal if both height and width are not provided', () => {
            expect(
                resizerHelper.buildQueryParams({
                    arcImage,
                    newHeight: 1200,
                    focalPoint: [10, 15]
                })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&height=1200&quality=70&smart=false'
            );
        });
        test('should return string with height, width and focal params (only focal set when height and width are provided)', () => {
            expect(
                resizerHelper.buildQueryParams({
                    arcImage,
                    newHeight: 1200,
                    newWidth: 800,
                    smartCropExcluded: true,
                    focalPoint: [10, 15]
                })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&width=800&height=1200&quality=70&smart=false&focal=10,15'
            );
        });
        test('should return string with smartCrop true when focalPoint its not provided or invalid', () => {
            expect(
                resizerHelper.buildQueryParams({
                    arcImage,
                    newHeight: 1200,
                    newWidth: 800,
                    smartCropExcluded: true,
                    focalPoint: []
                })
            ).toEqual(
                'J43DRG7ZGZCANB6PYJG2VQ35QY.jpg?auth=1f6894f8d079227a933&width=800&height=1200&quality=70&smart=true'
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

    describe('Common - Resizer - autoHeight fn', () => {
        it('return correct proportional height from original height and width for vertical images', () => {
            const height = resizerHelper.autoHeight(2000, 1000, 500);
            expect(height).toBe(1000);

            const height2 = resizerHelper.autoHeight(2880, 1944, 320);
            expect(height2).toBe(474);
        });
        it('Should return correct proportional height from original height and width for horizontal images', () => {
            const height = resizerHelper.autoHeight(1000, 2000, 1000);
            expect(height).toBe(500);

            const height2 = resizerHelper.autoHeight(1944, 2880, 320);
            expect(height2).toBe(216);
        });
        it('Should return null if originalHeight originalWidth or newWidth are not valid numbers', () => {
            expect(resizerHelper.autoHeight('2', 1944, 288)).toBe(0);
            expect(resizerHelper.autoHeight({}, {}, {})).toBe(0);
        });
        it('Should not return NaN values', () => {
            expect(resizerHelper.autoHeight(0, 0, 0)).toBe(0);
        });
    });

    it('should return height according proportion', () => {
        const height = resizerHelper.setHeight(1200, 800, '3:2');
        expect(height).toBe(800);
    });

    it('should return the correct focal string', () => {
        const focalStr = resizerHelper.setStrFocal(500, 450);
        expect(focalStr).toBe('495,455:505,445');
    });

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

        resizerHelper.setCropMethod({ ...mockValues });
    });

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

        resizerHelper.setCropMethod({ ...mockValues });
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
    describe('isResizerV2 function', () => {
        const v1Url =
            'https://resizer.glanacion.com/resizer/nvXI-Drw6YuzQFcRuFJ4q_7PhU8=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3IFEHM7KAFCWRJQIO4B36IHNLU.jpg';
        const v2Url =
            'https://resizer.glanacion.com/resizer/v2/574B3ES775FGPMKR7SZ6TMTPVA.JPG?auth=67e2472eccb2fcf95e748698005353559059303fbfff9c7df6d0d6d7a60619c9&width=768&quality=80&smart=false';

        it('Should return false for v1 urls', () => {
            expect(resizerHelper.isResizerV2(v1Url)).toBeFalsy();
        });
        it('Should return false for any other string urls', () => {
            expect(resizerHelper.isResizerV2('')).toBeFalsy();
            expect(resizerHelper.isResizerV2('prueba')).toBeFalsy();
        });
        it('Should return false for invalid paramethers', () => {
            expect(resizerHelper.isResizerV2()).toBeFalsy();
            expect(resizerHelper.isResizerV2(null)).toBeFalsy();
            expect(resizerHelper.isResizerV2({})).toBeFalsy();
        });
        it('Should return true for v2 urls', () => {
            expect(resizerHelper.isResizerV2(v2Url)).toBeTruthy();
        });
    });

    describe('isResizerV1 function', () => {
        const v1Url =
            'https://resizer.glanacion.com/resizer/nvXI-Drw6YuzQFcRuFJ4q_7PhU8=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3IFEHM7KAFCWRJQIO4B36IHNLU.jpg';
        const v2Url =
            'https://resizer.glanacion.com/resizer/v2/574B3ES775FGPMKR7SZ6TMTPVA.JPG?auth=67e2472eccb2fcf95e748698005353559059303fbfff9c7df6d0d6d7a60619c9&width=768&quality=80&smart=false';
        const externalUrl =
            'https://s3.amazonaws.com/arc-authors/lanacionar/2089284.png';
        it('Should return true for v1 urls', () => {
            expect(resizerHelper.isResizerV1(v1Url)).toBeTruthy();
        });
        it('Should return false for any other string urls', () => {
            expect(resizerHelper.isResizerV1('')).toBeFalsy();
            expect(resizerHelper.isResizerV1('prueba')).toBeFalsy();
        });
        it('Should return false for invalid paramethers', () => {
            expect(resizerHelper.isResizerV1()).toBeFalsy();
            expect(resizerHelper.isResizerV1(null)).toBeFalsy();
            expect(resizerHelper.isResizerV1({})).toBeFalsy();
        });
        it('Should return false for v2 urls', () => {
            expect(resizerHelper.isResizerV1(v2Url)).toBeFalsy();
        });
        it('Should return false for external urls', () => {
            expect(resizerHelper.isResizerV1(externalUrl)).toBeFalsy();
        });
    });
});
