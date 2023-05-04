import CardLiveblog from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/cardLiveblog';
import article from '../../../../../../../../../../__mocks__/data/LN10_CardLiveblog/DODDGBRGDFESPCHYA7CYYYYCDU.json';

describe('Test-CardLiveblog when size is M', () => {
    it('ok', () => {
        const resp = CardLiveblog(article);
        expect(resp.subtitles).toBeNull();
        expect(Object.keys(resp).sort()).toEqual(
            [
                'autor',
                'autores',
                'badge',
                'badgeStyle',
                'bajada',
                'chapita',
                'enviarApps',
                'fechaPublicacion',
                'id',
                'imagen',
                'marquesina',
                'opinion',
                'seccionPadre',
                'sitioId',
                'subtitles',
                'templateId',
                'titulo',
                'url',
                'video',
                'videoYouTube',
                'videos',
                'volanta'
            ].sort()
        );
    });
});

describe('Test-CardLiveblog when size is XL', () => {
    it('ok', () => {
        const newArticle = JSON.parse(JSON.stringify(article));
        newArticle.additionalProperties.diseno.size = 'XL';
        const resp = CardLiveblog(newArticle);
        expect(resp.subtitles).not.toBeNull();
        expect(resp.subtitles.length).toBe(3);
        expect(resp.subtitles[0].title).toBe(
            newArticle.content_elements[0].embed.config.title
        );
        expect(resp.subtitles[0].time).toBe(
            newArticle.content_elements[0].embed.config.time
        );
        expect(resp.subtitles[1].title).toBe(
            newArticle.content_elements[2].embed.config.title
        );
        expect(resp.subtitles[1].time).toBe(
            newArticle.content_elements[2].embed.config.time
        );
        expect(resp.subtitles[2].title).toBe(
            newArticle.content_elements[4].embed.config.title
        );
        expect(resp.subtitles[2].time).toBe(
            newArticle.content_elements[4].embed.config.time
        );
    });
});

describe('Time Test for liveblog', () => {
    function timeIterator(subtitles) {
        for (let index = 0; index < subtitles.length; index++) {
            const subtitleTime = subtitles[index].time;

            if (
                subtitleTime !==
                subtitleTime
                    .split(':')
                    .slice(0, 2)
                    .join(':')
            )
                return false;
        }
        return true;
    }
    it('should return time in format hh:mm', () => {
        const newArticle = JSON.parse(JSON.stringify(article));

        const resp = CardLiveblog(newArticle);

        expect(timeIterator(newArticle, resp.subtitles)).toBeTruthy();
    });
});
