import CardLiveblog from '../../../../../../../../../../components/private/LN/api/v2/mobile/home/article/cardLiveblog';
import article from '../../../../../../../../../../__mocks__/data/LN10_CardLiveblog/DODDGBRGDFESPCHYA7CYYYYCDU.json';

describe('Test-CardLiveblog', () => {
    it('ok', () => {
        const resp = CardLiveblog(article);
        expect(resp.subtitles).not.toBeNull();
        expect(resp.subtitles.length).toBe(3);
        expect(resp.subtitles[0].title).toBe(
            article.content_elements[0].embed.config.title
        );
        expect(resp.subtitles[0].time).toBe(
            article.content_elements[0].embed.config.time
        );
        expect(resp.subtitles[1].title).toBe(
            article.content_elements[2].embed.config.title
        );
        expect(resp.subtitles[1].time).toBe(
            article.content_elements[2].embed.config.time
        );
        expect(resp.subtitles[2].title).toBe(
            article.content_elements[4].embed.config.title
        );
        expect(resp.subtitles[2].time).toBe(
            article.content_elements[4].embed.config.time
        );
    });
});
