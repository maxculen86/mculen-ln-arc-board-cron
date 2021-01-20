import env from '../../../../../../__mocks__/fusion:environment';
import Nota from '../../../../../../components/private/LN/api/v1/nota';
import article from '../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';

describe('Test json integracion Article', () => {
    it('Test snapshot article', () => {
        const resp = Nota(article);

        expect(resp).toMatchSnapshot();
    });
});
