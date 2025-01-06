import {
    getKeywords,
    getNextUri
} from '../../../../../../components/features/LN-Api/ImagesKeywords/helpers/helper';

describe('getNextUri', () => {
    it('should add the constant when no number is present at the end of the URL', () => {
        const query = {
            uri: '/api/mobile/v1/imagenes/bykeywords/Messi,Maradona/'
        };
        expect(getNextUri(query)).toBe(
            '/api/mobile/v1/imagenes/bykeywords/Messi,Maradona/100/?outputType=json'
        );
    });

    it('should add the constant to the existing number when a number is present in URL', () => {
        const query = {
            uri: '/api/mobile/v1/imagenes/bykeywords/Messi,Maradona/100/'
        };
        expect(getNextUri(query)).toBe(
            '/api/mobile/v1/imagenes/bykeywords/Messi,Maradona/200/?outputType=json'
        );
    });

    it('should handle URLs without a next page', () => {
        const query = {
            uri: '/api/mobile/v1/imagenes/bykeywords/Messi,Maradona'
        };
        expect(getNextUri(query)).toBe(
            '/api/mobile/v1/imagenes/bykeywords/Messi,Maradona/100/?outputType=json'
        );
    });

    it('should handle URLs without a trailing slash but with a number by adding the constant and appending `?outputType=json`', () => {
        const query = {
            uri: '/api/mobile/v1/imagenes/bykeywords/Messi,Maradona/200'
        };
        expect(getNextUri(query)).toBe(
            '/api/mobile/v1/imagenes/bykeywords/Messi,Maradona/300/?outputType=json'
        );
    });
});

describe('getKeywords', () => {
    it('should decode a URI-encoded string and return an array of keywords', () => {
        const query = { keywords: 'Messi%2CMaradona' };
        expect(getKeywords(query)).toEqual(['Messi', 'Maradona']);
    });

    it('should handle multiple keywords separated by commas', () => {
        const query = { keywords: 'Messi,Maradona,football' };
        expect(getKeywords(query)).toEqual(['Messi', 'Maradona', 'football']);
    });

    it('should return an empty array if the keywords string is empty', () => {
        const query = { keywords: '' };
        expect(getKeywords(query)).toEqual(['']);
    });
});
