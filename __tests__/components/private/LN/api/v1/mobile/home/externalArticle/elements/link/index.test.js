import getExternalArticleLink from '../../../../../../../../../../../components/private/LN/api/v1/mobile/home/externalArticle/elements/link';
import LNApiErrorArticles from '../../../../../../../../../../../components/private/LN/api/common/article/models/exceptions/lnApiErrorArticles';
import { debug } from 'request-promise-native';

describe('components - private - LN - api - v1 - mobile - home - externalArticle - elements - link', () => {
    const testData = [
        [{ additionalProperties: { link: 'Test Article' } }, 'Test Article'],
        [{ additionalProperties: { link: null } }, LNApiErrorArticles],
        [{ additionalProperties: { link: undefined } }, LNApiErrorArticles],
        [{ additionalProperties: { link: '' } }, LNApiErrorArticles],
        [{ additionalProperties: {} }, LNApiErrorArticles],
        [{}, LNApiErrorArticles],
        ['not an object', LNApiErrorArticles]
    ];

    it.each(testData)(
        'getExternalArticleLink should return %p when article is %p',
        (article, expectedResult) => {
            if (expectedResult === LNApiErrorArticles) {
                expect(() => getExternalArticleLink(article)).toThrow(
                    LNApiErrorArticles
                );
            } else {
                expect(getExternalArticleLink(article)).toBe(expectedResult);
            }
        }
    );
});
