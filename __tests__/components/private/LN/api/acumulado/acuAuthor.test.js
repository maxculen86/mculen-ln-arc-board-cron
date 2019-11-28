import acuAuthor from '../../../../../../components/private/LN/api/acumulado/acuAuthor';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';

describe('Json imagen en acumulado', () => {
    test('Render imagen correcto', () => {
        const authors = article.globalContent.credits.by;
        const resp = authors.map(a => acuAuthor(a));

        for (let index = 0; index < resp.length; index++) {
            const author = resp[index];
            const originalData = authors[index];
            expect(author.id).toBe(originalData._id);
            expect(author.name).toBe(originalData.name);
            if (author.image) {
                expect(author.image.src).toBe(
                    originalData.image.resized_urls[0].resizedUrl
                );
            }
            expect(author.type).toBe(originalData.type === 'author' ? 1 : 2);
        }
    });
});
