import { getArticleHref } from '../../../../../../../components/private/LN10/home/components/CommonCollection/_helper';
import { SITE_FOODIT } from 'fusion:environment';

describe('getArticleHref function', () => {
    test('returns correct href when isFoodit is false', () => {
        const article = { website_url: '/article/123' };
        const href = '/link/to/article/';
        const isFoodit = false;
        const expected = '/link/to/article//article/123';
        const result = getArticleHref(article, href, isFoodit);
        expect(result).toEqual(expected);
    });

    test('returns correct href when isFoodit is true', () => {
        const article = { website_url: '/article/456' };
        const href = '/link/to/article/';
        const isFoodit = true;
        const expected = `${SITE_FOODIT}/link/to/article//article/456`;
        const result = getArticleHref(article, href, isFoodit);
        expect(result).toEqual(expected);
    });

    test('returns correct href when article does not have website_url', () => {
        const article = {};
        const href = '/link/to/article/';
        const isFoodit = false;
        const expected = '/link/to/article/';
        const result = getArticleHref(article, href, isFoodit);
        expect(result).toEqual(expected);
    });
});
