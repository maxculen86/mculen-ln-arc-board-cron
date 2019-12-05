import Nota from '../../../../../../components/private/LN/api/nota';
import article from '../../../../../../__mocks__/data/articles/newsNoteWithCompleteAttrs.json';

describe('Test json integracion Article', () => {
    it('Test snapshot article', () => {
        const resp = Nota(article.globalContent);

        expect(resp).toMatchSnapshot();
    });
});
