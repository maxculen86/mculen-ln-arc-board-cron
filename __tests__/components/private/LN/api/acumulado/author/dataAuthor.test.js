import dataAuthor from '../../../../../../../__mocks__/data/author/author.json';
import articlesAuthor from '../../../../../../../__mocks__/data/author/articlesbyAuthor.json';
import AcuIndex from '../../../../../../../components/private/LN/api/v1/accumulated';
import { authorAcu } from '../../../../../../../components/private/LN/api/common/author/index';
describe('Json que valida data del Autor', () => {
    it('Test de Autor', () => {
        const resp = authorAcu(dataAuthor[0]);
        expect(resp.id).toBe(9110);
        expect(resp.valor).toBe('Vinciane Smeets');
        expect(resp.imagen).toBe(
            '/resizer/sZs50EMtDoyumsGsL1Hlp6g08S0=/280x0/filters:quality(100)/bucket.glanacion.com/anexos/fotos/33/3121633.png'
        );
        expect(resp.mail).toBe('');
        expect(resp.twitter).toBe('');
    });

    it('Test de Autor sin Imagen', () => {
        const resp = authorAcu(dataAuthor[1]);
        expect(resp.imagen).toBe(null);
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

            const resp = authorAcu(dataAuthorMock);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe('Nombre de Autor Inexistente');
        }
    });
});
