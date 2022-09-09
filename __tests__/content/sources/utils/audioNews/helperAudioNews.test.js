import isNoteListenable from '../../../../../content/sources/utils/audioNews/helper';
import responseArticleSource from '../../../../../__mocks__/data/articles/responseArticleSource.json';

describe('Test - isNoteListenable', () => {
    const data = {
        ...responseArticleSource,
        source: {
            ...responseArticleSource.source,
            system: 'composer'
        },
        taxonomy: {
            primary_section: {
                _id: '/deportes'
            }
        },
        subtype: '1'
    };

    test('Should return true when the origin source is composer and the subtype and section are enabled.', () => {
        expect(isNoteListenable(data)).toStrictEqual(true);
    });

    test('Should return false when the subtype is not enabled.', () => {
        const resp = {
            ...data,
            subtype: '10'
        };
        expect(isNoteListenable(resp)).toStrictEqual(false);
    });

    test('should return false when the origin source is not composer', () => {
        const resp = {
            ...data,
            source: {
                ...data.source,
                system: 'LN-9'
            }
        };

        expect(isNoteListenable(resp)).toStrictEqual(false);
    });

    test('should return false when the note section is not enabled', () => {
        const resp = {
            ...data,
            taxonomy: {
                primary_section: {
                    _id: '/economia'
                }
            }
        };

        expect(isNoteListenable(resp)).toStrictEqual(false);
    });

    test('Should return false when data is not defined', () => {
        expect(isNoteListenable(undefined)).toStrictEqual(false);
    });

    test('should return true even if the section has children.', () => {
        const resp = {
            ...data,
            taxonomy: {
                primary_section: {
                    _id: '/deportes/futbol'
                }
            }
        };
        expect(isNoteListenable(resp)).toStrictEqual(true);
    });
});
