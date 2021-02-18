import env from '../../../../../../../__mocks__/fusion:environment';
import dataAuthor from '../../../../../../../__mocks__/data/author/author.json';
import articlesAuthor from '../../../../../../../__mocks__/data/author/articlesbyAuthor.json';
import AcuIndex from '../../../../../../../components/private/LN/api/v1/acumulado';
import Author from '../../../../../../../components/private/LN/api/v1/common/authorAcu';
describe('Json que valida data del Autor', () => {
    it('Test de Autor', () => {
        const resp = Author(dataAuthor);
        expect(resp.id).toBe(9110);
        expect(resp.nombre).toBe('Vinciane Smeets');
        expect(resp.imagen).toBe(null);
        expect(resp.mail).toBe('');
        expect(resp.twitter).toBe('');
    });
    it('Test de Autor null', () => {
        try {
            const resp = Author(null);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe("Cannot read property '_id' of null");
        }
    });
    test('Test de Autor con id null', () => {
        try {
            const dataAuthorMock = {
                author_type: 'Estándar',
                byline: 'Vinciane Smeets',
                name: 'Vinciane Smeets',
                node_type: 'author',
                role: 'PARA LA NACION',
                slug: 'vinciane-smeets-9110'
            };

            const resp = Author(dataAuthorMock);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe('id de autor inexistente');
        }
    });

    test('Test de Autor con name null', () => {
        try {
            const dataAuthorMock = {
                author_type: 'Estándar',
                byline: 'Vinciane Smeets',
                longBio: '',
                node_type: 'author',
                role: 'PARA LA NACION',
                slug: 'vinciane-smeets-9110',
                _id: 'vinciane-smeets-9110'
            };

            const resp = Author(dataAuthorMock);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe('nombre de autor inexistente');
        }
    });
});
