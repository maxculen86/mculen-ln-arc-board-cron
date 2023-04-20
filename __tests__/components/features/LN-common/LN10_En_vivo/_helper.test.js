import { useContent } from 'fusion:content';
import {
    findError,
    GetArticle,
    calculateTimePublish,
    convertMillisecondsToMinutes,
    validateId
} from '../../../../../components/features/LN-common/LN10_En_Vivo/_helpers';

describe('Tests - helpers - feature - EnVivo', () => {
    describe('Tests function findError', () => {
        test('should return an error property of true', () => {
            const articles = [
                {
                    id: 'BAWOBUYWA',
                    title: 'Dolar hoy',
                    url: '/economia/dolar-hoy',
                    timeSinceUpdate: 30,
                    group: 1
                },
                {
                    id: 'BAWOBUYWA',
                    title: '',
                    url: '',
                    error: true,
                    group: 1
                }
            ];
            expect(findError(articles)).toStrictEqual({
                message: 'El ID de la nota 1 (ID: BAWOBUYWA) es incorrecto',
                type: 'warning'
            });
        });

        test('should return false when the articles is not defined', () => {
            expect(findError(undefined)).toBeFalsy();
        });
    });

    describe('Tests function GetArticle', () => {
        const articleMock = {
            _id: 'GD7P4ZTE2FFBDAVBMLAK7V3Y6M',
            canonical_url: '/revista-living/prueba-logos-nid28052020/',
            headlines: {
                mobile: 'Prueba logos',
                basic: 'Esta es una nota de prueba de logos'
            },
            last_updated_date: '2023-01-02T22:00:17.701Z'
        };

        const noteId = 'AKJSDBNUASIFW1';
        const customTitle = '';
        const group = 1;
        const result = {
            error: false,
            group: 1,
            id: 'AKJSDBNUASIFW1',
            timeSinceUpdate: false,
            title: 'Prueba logos',
            url: '/revista-living/prueba-logos-nid28052020/'
        };

        test('It should return an object with the transformed note data.', () => {
            useContent.mockImplementation(() => articleMock);
            expect(GetArticle(noteId, customTitle, group)).toStrictEqual(
                result
            );
        });

        test('should return the error property to true when a note id exists but the content source response is not defined', () => {
            useContent.mockImplementation(() => undefined);
            expect(GetArticle(noteId, customTitle, group)).toStrictEqual({
                ...result,
                error: true,
                title: '',
                url: ''
            });
        });

        test('It should return the data of the note with the custom title', () => {
            useContent.mockImplementation(() => articleMock);
            const customTitle = 'Prueba titulo custom';

            expect(GetArticle(noteId, customTitle, group)).toStrictEqual({
                ...result,
                title: customTitle
            });
        });
    });

    describe('Function validateId', () => {
        test('should return false when the id is a empty string', () => {
            expect(validateId('')).toBeFalsy();
        });

        test('should return false when the id is not defined', () => {
            expect(validateId(undefined)).toBeFalsy();
        });

        test('should return false when the id is a string with a space', () => {
            expect(validateId(' ')).toBeFalsy();
        });

        test('should return the id when the value is correct', () => {
            expect(validateId('JSAFBDUSIQ')).toStrictEqual('JSAFBDUSIQ');
        });
    });

    describe('Fuction convertMillisecondsToMinutes', () => {
        const miliseconds = 120000;

        test('should return 2 min', () => {
            expect(convertMillisecondsToMinutes(miliseconds)).toStrictEqual(2);
        });

        test('should return false when milliseconds is not defined', () => {
            expect(convertMillisecondsToMinutes(undefined)).toBeFalsy();
        });
    });

    describe('Tests function calculateTimePublish', () => {
        const mockCurrentlDate = new Date('Tue Jan 03 2023 19:00:00 GMT-0300');

        test('should return a string with the calculation of the time elapsed from the date of publication of the note to the current date.', () => {
            expect(
                calculateTimePublish(
                    '2023-01-03T22:18:17.701Z',
                    mockCurrentlDate
                )
            ).toStrictEqual('Hace 18 min');

            expect(
                calculateTimePublish(
                    '2023-01-03T22:01:16.701Z',
                    mockCurrentlDate
                )
            ).toStrictEqual('Hace 1 min');
        });

        test('should return false when the difference between the publication date and the current one is greater than 45 min.', () => {
            expect(
                calculateTimePublish(
                    '2023-01-03T22:46:16.701Z',
                    mockCurrentlDate
                )
            ).toStrictEqual(false);
        });
        test('should return false when the difference between the publication date and the current one is equal to 45 min.', () => {
            expect(
                calculateTimePublish(
                    '2023-01-03T22:45:16.701Z',
                    mockCurrentlDate
                )
            ).toStrictEqual(false);
        });
    });
});
