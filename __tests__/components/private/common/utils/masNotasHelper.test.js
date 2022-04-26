import {
    getTitle,
    getSectionTitle,
    getQuery
} from '../../../../../components/private/common/utils/masNotasHelper';

describe('Mas Notas Helper Function Tests', () => {
    it('should test getSectionTitle function', () => {
        const noteTypeTitles = {
            '1': 'Otras noticias de&nbsp;',
            '7': 'Más recetas de&nbsp;',
            '2': 'Más notas de&nbsp;'
        };
        Object.keys(noteTypeTitles).forEach(title =>
            expect(getSectionTitle(title)).toStrictEqual(noteTypeTitles[title])
        );
    });
    it('should test getTitle function', () => {
        expect(
            getTitle('1', '1', { text: 'Noticias', path: '/noticias' })
        ).toStrictEqual(
            "Otras noticias de&nbsp;<a href='/tema//noticias/' class='com-link'>Noticias</a>"
        );
        expect(
            getTitle('1', '7', { text: 'Recetas', path: '/recetas' })
        ).toStrictEqual(
            "Más recetas de&nbsp;<a href='/tema//recetas/' class='com-link'>Recetas</a>"
        );
        expect(
            getTitle('0', '1', { text: 'Noticias', path: '/noticias' })
        ).toStrictEqual('Últimas Noticias');
        expect(
            getTitle('0', '7', { text: 'Recetas', path: '/recetas' })
        ).toStrictEqual('Últimas Recetas');
    });
    it('should test getQuery function', () => {
        expect(
            getQuery('1', '3', { sectionId: 'autos' }, 'hoy')
        ).toStrictEqual({ tagId: 'hoy' });
        expect(
            getQuery(
                '0',
                '1',
                {
                    '0': { sectionId: 'autos', subtype: '1' },
                    default: { sectionId: 'hoy' }
                },
                'hoy'
            )
        ).toStrictEqual({ sectionId: 'hoy' });
    });
});
