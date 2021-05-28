import Article from '../../../../../../../components/private/LN/api/v1/home/article';
import colecction from '../../../../../../../__mocks__/data/collection/OCTOV4V54FCFLJHOVB5IAJKHHM.json';
import article1 from '../../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import article2 from '../../../../../../../__mocks__/data/articles/3SHTRO3NKBCN7L3JITCDQYSJLM.json';
import article3 from '../../../../../../../__mocks__/data/articles/3THDAILWTVHARHBYA5AEVL7OAU.json';
import get from '../../../../../../../components/private/common/utils/get';
describe('components - private - LN - api - v1 - home - article.js', () => {
    let articlesfromCajaManual = [];
    let articlesfromCajaCollections = [];
    const configurations = {
        arcSite: 'la-nacion-ar'
    };

    it('Testeo articulo Caja Manual OK', () => {
        articlesfromCajaManual = [];
        articlesfromCajaManual.push(article1);
        articlesfromCajaManual.push(article2);
        articlesfromCajaManual.push(article3);

        const notas = Article(articlesfromCajaManual, configurations);
        expect(notas[0].id).toBe('2KOBND62KNFVVBFQZOADNN6WNY');
        expect(notas[0].templateId).toBe('1');
        expect(notas[0].sitioId).toBe(null);
        expect(notas[0].url).toBe(
            '/deportes/prueba-ios-y-android-cuerpo-nid12052020/'
        );
        expect(notas[0].titulo).toBe('Prueba iOS y Android cuerpo');
        expect(notas[0].volanta).toBe('Esto es una volanta.');
        expect(notas[0].bajada).toBe(
            'Esto es una bajada. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod...'
        );
        expect(notas[0].chapita).toBe(null);
        expect(notas[0].autor.id).toBe(4189);
        expect(notas[0].autor.slug).toBe('max-fisher-4189');
        expect(notas[0].autor.valor).toBe('Max Fisher');
        expect(notas[0].autor.tipo).toBe(1);
        expect(notas[0].autor.imagen).toBe(null);
        expect(notas[0].autor.mail).toBe(undefined);
        expect(notas[0].autor.twitter).toBe(undefined);
        expect(notas[0].marquesina).toBe('Por Max Fisher');
        expect(notas[0].seccionProducto).toBe(null);
        expect(notas[0].seccionPadre).toBe(null);
    });
    it('Testeo articulo Caja Manual con un articulo null', () => {
        articlesfromCajaManual = [];
        articlesfromCajaManual.push(article1);
        articlesfromCajaManual.push(null);
        articlesfromCajaManual.push(article3);

        const notas = Article(articlesfromCajaManual, configurations);
        expect(notas.length).toBe(2);
        expect(notas[0].id).toBe('2KOBND62KNFVVBFQZOADNN6WNY');
        expect(notas[1].id).toBe('3THDAILWTVHARHBYA5AEVL7OAU');
    });

    it('Testeo articulo Caja Collection Ok', () => {
        const elements = get(colecction, 'content_elements', []);
        try {
            const notas = Article(elements, configurations);
            expect(notas[1].id).toBe('5OUY7OCFZNFLLBM6XM4CTSIUWQ');
        } catch (err) {
            expect(err.message).toBe(
                "Cannot read property 'match' of undefined"
            );
        }
    });
});
