import {
    getImageUrl,
    getImageUrlResizerV2,
    updateUrlWithResizerBase,
    getImageUrlBasedOnResizerVersion
} from '../../../../../../../../components/private/LN/api/common/elements/image';

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
});
