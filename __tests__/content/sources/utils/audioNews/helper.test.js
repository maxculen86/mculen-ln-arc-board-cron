import isNoteListenable from '../../../../../content/sources/utils/audioNews/helper';
import responseArticleSource from '../../../../../__mocks__/data/articles/responseArticleSource.json';

describe('Test - isNoteListenable', () => {
    const data = {
        ...responseArticleSource,
        source: {
            ...responseArticleSource.source,
            system: 'composer'
        },
        label: {
            republicar_audio: {
                display: true
            }
        },
        taxonomy: {
            primary_section: {
                _id: '/espectaculos'
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
            subtype: '9'
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

    test('Should return false when data is not defined', () => {
        expect(isNoteListenable(undefined)).toStrictEqual(false);
    });

    test('should return true even if the section has children.', () => {
        const resp = {
            ...data,
            taxonomy: {
                primary_section: {
                    _id: '/espectaculos/cartelera-de-cine/'
                }
            }
        };
        expect(isNoteListenable(resp)).toStrictEqual(true);
    });

    test('should return false when the prop republicar_audio is not defiend ', () => {
        const resp = {
            ...data,
            label: {},
            taxonomy: {
                primary_section: {
                    _id: '/espectaculos/cartelera-de-cine/'
                }
            }
        };
        expect(isNoteListenable(resp)).toStrictEqual(false);
    });
});
