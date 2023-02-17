import CardLiveblog from '../../../../../../../../../../components/private/LN/api/v2/mobile/home/article/cardLiveblog';
import article from '../../../../../../../../../../__mocks__/data/articles/2CIOHVMKJBHKDMMHH2WBIZGJWE.json';

describe('Test-CardLiveblog', () => {
    it('ok', () => {
        const resp = CardLiveblog(article);
    });
});
