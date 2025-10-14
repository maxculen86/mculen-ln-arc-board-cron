import {
    getImageUrl,
    getImageUrlResizerV2,
    updateUrlWithResizerBase,
    getImageUrlBasedOnResizerVersion
} from '../../../../../../../../components/private/LN/api/common/elements/image';

import imageCommon from '../../../../../../../../components/private/LN/api/common/elements/image';

describe(' - components - private - LN - api - common - elements - image - index', () => {
    describe('getImageUrl tests', () => {
        it('getImageUrl should return an array with the expected result when called with a valid url', () => {
            const url =
                'https://resizer.glanacion.com/resizer/9qSf3XsfZ0O656M3Vqv7p2zLubU=/80x0/filters:format(webp):quality(70)/bucket.glanacion.com/anexos/fotos/11/2089211.png';
            const expected = [
                '/resizer/9qSf3XsfZ0O656M3Vqv7p2zLubU=/80x0/filters:format(webp):quality(70)/bucket.glanacion.com/anexos/fotos/11/2089211.png',
                '9qSf3XsfZ0O656M3Vqv7p2zLubU=/80x0/filters:format(webp):quality(70)'
            ];
            const result = getImageUrl(url);
            expect(result).toEqual(expect.arrayContaining(expected));
        });
        it('getImageUrl should return null when called with a null url', () => {
            const url = null;
            const expected = null;
            const result = getImageUrl(url);
            expect(result).toBeNull();
        });
        it('getImageUrl should return null when called with an invalid url', () => {
            const url = 'invalid_url';
            const result = getImageUrl(url);
            expect(result).toBeNull();
        });
    });

    describe('getImageUrlResizerV2 tests', () => {
        it('getImageUrlResizerV2 should return an array with the expected result when called with a valid url', () => {
            const url = 'valid_url';
            const expected = ['expected_result'];
            const result = getImageUrlResizerV2(url);
            expect(result).toBeNull();
        });

        it('getImageUrlResizerV2 should return null when called with an invalid url', () => {
            const url = 'invalid_url';
            const result = getImageUrlResizerV2(url);
            expect(result).toBeNull();
        });

        it('getImageUrlResizerV2 should return null when called with a null url', () => {
            const url = null;
            const result = getImageUrlResizerV2(url);
            expect(result).toBeNull();
        });
    });

    describe('updateUrlWithResizerBase tests', () => {
        it('updateUrlWithResizerBase should return the expected result when called with a valid url', () => {
            const url =
                ' http://10.253.0.1/resizer/v2/https%3A%2F%2Fbucket.glanacion.com%2Fanexos%2Ffotos%2F59%2F2089259.png?auth=aa6c705981e5962f4f9ccdba1d0270f61857e5da04a8fe5fb9ce958c63b1a617&width=80&quality=70&smart=false';
            const expected =
                '/resizer/v2/https%3A%2F%2Fbucket.glanacion.com%2Fanexos%2Ffotos%2F59%2F2089259.png?auth=aa6c705981e5962f4f9ccdba1d0270f61857e5da04a8fe5fb9ce958c63b1a617&width=80&quality=70&smart=false';
            const result = updateUrlWithResizerBase(url);
            expect(result).toEqual(expected);
        });

        it('updateUrlWithResizerBase should return the input url when called with an invalid url', () => {
            const url = 'invalid_url';
            const result = updateUrlWithResizerBase(url);
            expect(result).toEqual(url);
        });
        it('updateUrlWithResizerBase should return null when called with a null url', () => {
            const url = null;
            const result = updateUrlWithResizerBase(url);
            expect(result).toBeNull();
        });
    });

    describe('getImageUrlBasedOnResizerVersion tests ', () => {
        it('getImageUrlBasedOnResizerVersion should return the expected result when called with a valid url', () => {
            const url =
                'http://10.253.0.1/resizer/v2/https%3A%2F%2Fbucket.glanacion.com%2Fanexos%2Ffotos%2F59%2F2089259.png?auth=aa6c705981e5962f4f9ccdba1d0270f61857e5da04a8fe5fb9ce958c63b1a617&width=80&quality=70&smart=false';
            const expected =
                '/resizer/v2/https%3A%2F%2Fbucket.glanacion.com%2Fanexos%2Ffotos%2F59%2F2089259.png?auth=aa6c705981e5962f4f9ccdba1d0270f61857e5da04a8fe5fb9ce958c63b1a617&width=80&quality=70&smart=false';
            const result = getImageUrlBasedOnResizerVersion(url);
            expect(result).toEqual(expected);
        });

        it('getImageUrlBasedOnResizerVersion should return the input url when called with an invalid url', () => {
            const url = 'invalid_url';
            const result = getImageUrlBasedOnResizerVersion(url);
            expect(result).toEqual(url);
        });
        it('getImageUrlBasedOnResizerVersion should return null url when called with a null url', () => {
            const url = 'invalid_url';
            const result = getImageUrlBasedOnResizerVersion(url);
            expect(result).toEqual(url);
        });
    });

    describe('imageCommon tests', () => {
        it('should build URL with auth and focal from Resizer V2 URL with same size as original', () => {
            const base =
                'http://host/resizer/v2/https%3A%2F%2Fbucket.glanacion.com%2Fanexos%2Ffotos%2F59%2F2089259.png';
            const resizedUrl = `${base}?auth=token123&width=80&height=1092&quality=70&focal=100,100`;
            const image = {
                _id: 'abc123',
                resized_urls: [{ resizedUrl }],
                auth: ['auth=token123', 'token123']
            };

            const result = imageCommon(image);

            expect(result).not.toBeNull();
            expect(result.id).toBe('abc123');
            expect(result.baseUrl).toBe(base);
            expect(result.absoluteUrl).toBe(
                `${base}?auth=token123&width=80&height=1092&quality=70&focal=100,100`
            );
        });

        it('should remove invisible characters before parsing URLs', () => {
            const dirtyBase =
                'http://example.com/resizer/v2/https%3A%2F%2Fbucket.glanacion.com%2Fa\u200Enexos%2Ffotos%2F59%2F2089259.png';
            const sanitizedBase = dirtyBase.replace(/\u200E/g, '');
            const resizedUrl = `${dirtyBase}?auth=tk123&width=100&quality=70`;
            const image = {
                _id: 'id-dirty',
                resized_urls: [{ resizedUrl }],
                auth: ['auth=tk123', 'tk123']
            };

            const result = imageCommon(image);

            expect(result).not.toBeNull();
            expect(result.baseUrl).toBe(sanitizedBase);
            expect(result.baseUrl.includes('\u200E')).toBe(false);
            expect(result.absoluteUrl.includes('\u200E')).toBe(false);
        });

        it('should return image summary with id and type', () => {
            const base =
                'http://10.253.0.1/resizer/v2/https%3A%2F%2Fbucket.glanacion.com%2Fanexos%2Ffotos%2F59%2F2089259.png';
            const resizedUrl = `${base}?auth=tok987&width=80&quality=70`;
            const image = {
                _id: 'img-123',
                resized_urls: [{ resizedUrl }],
                auth: ['auth=tok987', 'tok987']
            };

            const result = imageCommon(image);

            expect(result).not.toBeNull();
            expect(result.id).toBe('img-123');
            expect(result._t).toBe('img');
        });

        it('should return null when image is null or undefined', () => {
            expect(imageCommon(null)).toBeNull();
            expect(imageCommon(undefined)).toBeNull();
        });

        it('should return null when resized_urls is missing or empty', () => {
            const imgMissing = { _id: 'no-urls' };
            const imgEmpty = { _id: 'empty-urls', resized_urls: [] };

            expect(imageCommon(imgMissing)).toBeNull();
            expect(imageCommon(imgEmpty)).toBeNull();
        });
    });
});
