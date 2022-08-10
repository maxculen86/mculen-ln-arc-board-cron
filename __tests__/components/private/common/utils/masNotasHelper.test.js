import {
    getTitle,
    getSectionTitle,
    validateMasNotas,
    getLink
} from '../../../../../components/private/common/utils/masNotasHelper';
import mockArticles from '../../../../../__mocks__/data/masNotas/articles.json';

describe('Mas Notas Helper Function Tests', () => {
    it('should test getSectionTitle function', () => {
        expect(getSectionTitle(true, false)).toStrictEqual(
            'Otras noticias de&nbsp;'
        );
        expect(getSectionTitle(false, true)).toStrictEqual(
            'Más recetas de&nbsp;'
        );
        expect(getSectionTitle(false, false)).toStrictEqual(
            'Más notas de&nbsp;'
        );
    });

    it('should test getTitle function', () => {
        expect(
            getTitle(true, false, { text: 'Noticias', path: 'noticias' }, true)
        ).toStrictEqual(
            "Otras noticias de&nbsp;<a href='/tema/noticias/' class='com-link'>Noticias</a>"
        );

        expect(
            getTitle(false, true, { text: 'Recetas', path: 'recetas' }, true)
        ).toStrictEqual(
            "Más recetas de&nbsp;<a href='/tema/recetas/' class='com-link'>Recetas</a>"
        );

        expect(
            getTitle(
                true,
                false,
                { text: 'Tag prueba', path: 'tag-prueba' },
                true
            )
        ).toStrictEqual(
            "Otras noticias de&nbsp;<a href='/tema/tag-prueba/' class='com-link'>Tag prueba</a>"
        );

        expect(
            getTitle(false, false, { text: 'Dolar', path: 'dolar' }, true)
        ).toStrictEqual(
            `Más notas de&nbsp;<a href='/tema/dolar/' class='com-link'>Dolar</a>`
        );

        expect(
            getTitle(false, false, { text: 'Politica', path: '/politica' })
        ).toStrictEqual(
            `Últimas notas de <a href='/politica/' class='com-link'> Politica</a>`
        );

        expect(getTitle('3', '1', undefined, undefined)).toStrictEqual(
            `Últimas notas de <a href='/ultimas-noticias/' class='com-link'> La Nación</a>`
        );
    });

    it('should test validateMasNotas function', () => {
        expect(
            validateMasNotas(['article1', 'article2', 'article3'], 3)
        ).toBeNull();

        expect(
            validateMasNotas(['article1', 'article2', 'article3'], 2)
        ).toStrictEqual({
            type: 'warning',
            message: 'La cantidad minima de notas debe ser de 3 notas.'
        });

        expect(validateMasNotas([], 4)).toStrictEqual({
            type: 'warning',
            message: 'No se encontraron notas.'
        });
    });

    it('should test getLink function', () => {
        const articles = mockArticles.content_elements;
        expect(getLink(false, undefined, articles)).toStrictEqual({});

        expect(getLink(true, undefined, articles)).toStrictEqual({});

        expect(
            getLink(true, 'alberto-fernandez-tid849', articles)
        ).toStrictEqual({
            path: 'alberto-fernandez-tid849',
            text: 'Alberto Fernández'
        });

        expect(getLink(false, '/economia', articles)).toStrictEqual({
            path: '/economia',
            text: 'economia'
        });
    });
});
