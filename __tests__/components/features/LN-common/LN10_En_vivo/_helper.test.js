import { useContent } from 'fusion:content';
import {
    findError,
    getArticle,
    calculateTimePublish,
    convertMillisecondsToMinutes,
    validateId,
    getNotesLists,
    setTopicsCustomFields,
    getTopicsFromCustomFields
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

    describe('Tests function getArticle', () => {
        const articleMock = {
            _id: 'GD7P4ZTE2FFBDAVBMLAK7V3Y6M',
            canonical_url: '/revista-living/prueba-logos-nid28052020/',
            headlines: {
                mobile: 'Prueba logos',
                basic: 'Esta es una nota de prueba de logos'
            },
            last_updated_date: '2023-01-02T22:00:17.701Z'
        };

        const group = 1;
        const noteId = 'AKJSDBNUASIFW1';
        const customTitle = '';
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
            expect(
                getArticle({ group, noteId, title: customTitle })
            ).toStrictEqual({
                error: false,
                group: 1,
                id: noteId,
                timeSinceUpdate: false,
                title: 'Prueba logos',
                url: '/revista-living/prueba-logos-nid28052020/'
            });
        });

        test('should return the error property to true when a note id exists but the content source response is not defined', () => {
            useContent.mockImplementation(() => undefined);
            const result = getArticle(group, noteId, customTitle);
            expect(result).toStrictEqual({
                error: '',
                group: 1,
                id: '',
                timeSinceUpdate: false,
                title: '',
                url: ''
            });
        });

        test('It should return the data of the note with the custom title', () => {
            useContent.mockImplementation(() => articleMock);
            const customTitle = 'Prueba logos';

            expect(getArticle(group, noteId, customTitle)).toStrictEqual({
                error: '',
                group: 1,
                id: '',
                timeSinceUpdate: false,
                title: customTitle,
                url: '/revista-living/prueba-logos-nid28052020/'
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

    describe('Function getNotesLists', () => {
        it('should return an empty array when listCustomFields is empty', () => {
            const result = getNotesLists([]);

            expect(result).toEqual([]);
        });

        it('should return an empty array when listCustomFields contains undefined values', () => {
            const listCustomFields = [
                [undefined, undefined, 1],
                [undefined, undefined, 2]
            ];

            const result = getNotesLists(listCustomFields);

            expect(result).toEqual([]);
        });
    });

    describe('test topics functions', () => {
        const mock = {
            weather: {
                dataService: {
                    locations: [
                        {
                            current_temp: 26.9,
                            location_id: 'ciudad-de-buenos-aires',
                            location_name: 'Buenos Aires',
                            weather: {
                                id: 'sun-cloudy'
                            }
                        },
                        {
                            current_temp: 33.2,
                            location_id: 'san-fernando-del-valle-de-catamarca',
                            location_name: 'Catamarca',
                            weather: {
                                id: 'sun-cloudy'
                            }
                        }
                    ]
                }
            },
            customFields: {
                'title 0': 'First Topic',
                'link 0': 'https://www.lanacion.com.ar/'
            },
            customFieldsMultipleTopics: {
                'title 0': 'First Topic',
                'link 0': 'https://www.lanacion.com.ar/first/',
                'title 1': 'Second Topic',
                'link 1': 'https://www.lanacion.com.ar/second/',
                'title 2': 'Third Topic',
                'link 2': 'https://www.lanacion.com.ar/third/'
            }
        };

        it('should returns topics array with specific data', () => {
            const topics = getTopicsFromCustomFields(mock.customFields);
            const [currentTopic] = topics;

            expect(currentTopic.title).toEqual(mock.customFields['title 0']);
            expect(currentTopic.link).toEqual(mock.customFields['link 0']);

            expect(topics).toHaveLength(1);
            expect(Object.keys(topics[0])).toEqual([
                'title',
                'link',
                'dataEvent',
                'dataSection'
            ]);
        });

        it('should returns topics array with multiple custom fields', () => {
            const topics = getTopicsFromCustomFields(
                mock.customFieldsMultipleTopics
            );

            topics.forEach((topic, index) => {
                expect(topic.title).toEqual(
                    mock.customFieldsMultipleTopics[`title ${index}`]
                );
                expect(topic.link).toEqual(
                    mock.customFieldsMultipleTopics[`link ${index}`]
                );
            });

            expect(topics).toHaveLength(3);
        });

        const verifyCustomFields = maxLength => {
            const topicsCustomFields = setTopicsCustomFields(maxLength);
            const keys = Object.keys(topicsCustomFields);
            const iterator = [...new Array(maxLength || 5).keys()];

            expect(Object.keys(topicsCustomFields)).toHaveLength(
                (maxLength || 5) * 2
            );

            iterator.forEach(index => {
                expect(keys.includes(`title ${index}`)).toBeTruthy();
                expect(keys.includes(`link ${index}`)).toBeTruthy();
            });
        };

        it('should returns custom fields with default max length', () => {
            verifyCustomFields();
        });

        it('should returns custom fields with another length', () => {
            verifyCustomFields(4);
        });
    });
});
