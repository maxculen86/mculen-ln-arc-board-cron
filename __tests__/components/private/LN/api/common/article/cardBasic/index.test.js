import CardBasic from '../../../../../../../../components/private/LN/api/common/article/cardBasic';
import LNApiErrorArticles from '../../../../../../../../components/private/LN/api/common/article/models/exceptions/lnApiErrorArticles';

jest.mock('fusion:environment', () => ({
    CLL_HTMLFREE_DOMAIN: 'https://canchallena.lanacion.com.ar/especiales'
}));

describe('CardBasic real integration', () => {
    const baseArticle = {
        _id: 'article123',
        canonical_url: '/some-url',
        subtype: 'basic',
        label: { volanta: { text: 'volanta text' } },
        configurations: { arcSite: 'site1' },
        additionalProperties: {
            lead: 'lead text',
            authors: 'signature',
            opinion: true
        },
        headlines: { basic: 'Titulo de nota' },
        credits: {
            by: [
                {
                    name: 'Author 1',
                    type: 'author',
                    additional_properties: {
                        original: {
                            voice: 1234
                        }
                    }
                }
            ]
        },
        taxonomy: { sections: [{ name: 'Opinion', slug: '/opinion' }] },
        publish_date: '2025-08-29T12:00:00Z',
        videoData: { src: 'video.mp4' },
        isListenable: false
    };

    it('Should correctly transform a valid article', () => {
        const result = CardBasic(baseArticle);
        expect(result.id).toBe('article123');
    });

    it('Should throw LNApiErrorArticles if article has no id', () => {
        const article = { ...baseArticle };
        delete article._id;

        expect(() => CardBasic(article)).toThrow(LNApiErrorArticles);
    });

    it('Should throw an error if article has no url', () => {
        const article = { ...baseArticle };
        delete article.canonical_url;
        delete article.website_url;

        expect(() => CardBasic(article)).toThrow(
            `La nota con el id: ${baseArticle._id} no posee el valor canonical_url/website_url`
        );
    });

    it('Should throw an error if article has no title', () => {
        const article = { ...baseArticle };
        delete article.headlines;

        expect(() => CardBasic(article)).toThrow(
            `La nota con el id: ${baseArticle._id}: No posee el valor Titulo`
        );
    });

    it('Should transform authors and remove "voice" when not listenable', () => {
        const article = {
            ...baseArticle,
            isListenable: false
        };

        const result = CardBasic(article);

        expect(result.authors[0].voice).toBeUndefined();
    });

    it('Should keep "voice" in authors when article is listenable', () => {
        const article = {
            ...baseArticle,
            isListenable: true
        };

        const result = CardBasic(article);

        expect(result.authors[0].voice).toEqual(1234);
    });

    it('Should return domain when subtype is HTMLLIBRECLL', () => {
        const article = {
            ...baseArticle,
            subtype: '15'
        };

        const result = CardBasic(article);

        expect(result.domain).toContain(
            'canchallena.lanacion.com.ar/especiales'
        );
    });

    it('Should include comments when article has comments', () => {
        const article = {
            ...baseArticle,
            comentarios: {
                abiertoComentarios: true,
                permitirComentarios: true
            }
        };

        expect(CardBasic(article).comentarios).toEqual({
            abiertoComentarios: true,
            permitirComentarios: true
        });
    });

    it('Should omit comments when article has no comments', () => {
        expect(CardBasic(baseArticle)).not.toHaveProperty('comentarios');
    });
});
