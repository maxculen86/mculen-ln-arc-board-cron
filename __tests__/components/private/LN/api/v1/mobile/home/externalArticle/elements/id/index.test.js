import getExternalArticleId from "../../../../../../../../../../../components/private/LN/api/v1/mobile/home/externalArticle/elements/id";
import LNApiErrorArticles from "../../../../../../../../../../../components/private/LN/api/common/article/models/exceptions/lnApiErrorArticles";

describe('components - private - LN - api - v1 - mobile - home - externalArticle - elements - id', () => {
    
      const testData = [
        [{ _id: "123" },'123'],
        [{ _id: "" }, LNApiErrorArticles],
        [{ _id: undefined }, LNApiErrorArticles],
        [{ _id: null }, LNApiErrorArticles],
        [{}, LNApiErrorArticles],
        ['not an object', LNApiErrorArticles]
    ];

    it.each(testData)(
        'getExternalArticleId should return %p when article is %p',
        (article, expectedResult) => {
            if (expectedResult === LNApiErrorArticles) {
                expect(() => getExternalArticleId(article)).toThrow(
                    LNApiErrorArticles
                );
            } else {
                expect(getExternalArticleId(article)).toBe(expectedResult);
            }
        }
    );   
});
