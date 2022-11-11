import { authorCommon as acuAuthor } from '../../../../../../../components/private/LN/api/v1/common/author/index';
import article from '../../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';
import { getAutorId } from '../../../../../../../components/private/common/utils/getElementId';
import authorsData from '../../../../../../../__mocks__/data/author/author.json';

describe('Json imagen en acumulado', () => {
    test('Render imagen correcto', () => {
        const authors = article.content_elements[1].credits.by;
        const resp = authors.map(a => acuAuthor(a));

        for (let index = 0; index < resp.length; index++) {
            const author = resp[index];
            const originalData = authors[index];
            expect(author.id).toBe(getAutorId(originalData._id));
            expect(author.valor).toBe(originalData.name);
            if (author.imagen) {
                expect(author.imagen.src).toBe(
                    originalData.image.resized_urls[0].resizedUrl
                );
            }
            expect(author.tipo).toBe(originalData.type === 'author' ? 1 : 2);
        }
    });

    test('tipo de autor', () => {
        const authors = article.content_elements[12].credits.by;
        const resp = authors.map(a => acuAuthor(a));
        expect(resp[0].tipo).toBe(1);
    });

    test('Imagen de autor en null', () => {
        const authors = article.content_elements[0].credits.by;
        const resp = authors.map(a => acuAuthor(a));
        expect(resp[0].imagen).toBe(null);
    });

    test('Areas de interes', () => {
        const author = authorsData[0];
        const resp = acuAuthor(author);
        expect(resp.intereses).toEqual('Deportes, Fútbol');
    });

    test('Areas de interes null', () => {
        const author = authorsData[1];
        const resp = acuAuthor(author);
        expect(resp.intereses).toBeUndefined();
    });

    test('Rol', () => {
        const author = authorsData[0];
        const resp = acuAuthor(author);

        expect(Object.keys(resp).sort()).toEqual(
            ['id', 'imagen', 'intereses', 'rol', 'slug', 'tipo', 'valor'].sort()
        );
        expect(resp.rol).toEqual('PARA LA NACION');
    });

    test('Rol null', () => {
        const author = authorsData[1];
        const resp = acuAuthor(author);

        expect(Object.keys(resp).sort()).toEqual(
            ['id', 'imagen', 'intereses', 'rol', 'slug', 'tipo', 'valor'].sort()
        );

        expect(resp.rol).toBeNull();
    });
});
