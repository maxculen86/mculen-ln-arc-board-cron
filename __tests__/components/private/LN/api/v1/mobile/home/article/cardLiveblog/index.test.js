import CardLiveblog from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/cardLiveblog';
import article from '../../../../../../../../../../__mocks__/data/LN10_CardLiveblog/DODDGBRGDFESPCHYA7CYYYYCDU.json';

describe('Test-CardLiveblog when size is M', () => {
    it('ok', () => {
        const resp = CardLiveblog(article);
        expect(resp.timeline).toBeNull();
        expect(Object.keys(resp).sort()).toEqual(
            [
                'authors',
                'autores',
                'badge',
                'badgeStyle',
                'bajada',
                'chapita',
                'distributor',
                'isListenable',
                'enviarApps',
                'openingMode',
                'fechaPublicacion',
                'id',
                'imagen',
                'marquesina',
                'opinion',
                'seccionPadre',
                'sitioId',
                'timeline',
                'templateId',
                'titulo',
                'url',
                'video',
                'videoData',
                'videoYouTube',
                'videos',
                'volanta',
                'rating'
            ].sort()
        );
    });

    it('Should return bajada when hideDescription property is false', () => {
        // ARRANGE
        article.additionalProperties['hideDescription'] = false;

        // ACT
        const resp = CardLiveblog(article);

        // ASSERT
        expect(resp).not.toBeUndefined();
        expect(resp).toHaveProperty('bajada');
    });

    it('Should return null when hideDescription property is true', () => {
        // ARRANGE
        article.additionalProperties['hideDescription'] = true;

        // ACT
        const resp = CardLiveblog(article);

        // ASSERT
        expect(resp).not.toBeUndefined();
        expect(resp).toHaveProperty('bajada');
        expect(resp.bajada).toBeNull();
    });
});

describe('Test-CardLiveblog when size is XL', () => {
    it('ok', () => {
        const newArticle = JSON.parse(JSON.stringify(article));
        newArticle.additionalProperties.diseno.size = 'XL';
        const liveblogs = newArticle.content_elements.filter(
            el => el.type === 'custom_embed' && el.subtype === 'custom-liveblog'
        );
        const resp = CardLiveblog(newArticle);

        expect(resp.timeline).not.toBeNull();
        expect(resp.timeline.length).toBe(3);
        expect(resp.timeline[0].title).toBe(liveblogs[0].embed.config.title);
        expect(resp.timeline[0].time).toBe(liveblogs[0].embed.config.time);
        expect(resp.timeline[1].title).toBe(liveblogs[1].embed.config.title);
        expect(resp.timeline[1].time).toBe(liveblogs[1].embed.config.time);
        expect(resp.timeline[2].title).toBe(liveblogs[2].embed.config.title);
        expect(resp.timeline[2].time).toBe(liveblogs[2].embed.config.time);
    });
});

describe('Time Test for liveblog', () => {
    function timeIterator(timeline) {
        for (let index = 0; index < timeline.length; index++) {
            const subtitleTime = timeline[index].time;

            if (subtitleTime !== subtitleTime.split(':').slice(0, 2).join(':'))
                return false;
        }
        return true;
    }
    it('should return time in format hh:mm', () => {
        const newArticle = JSON.parse(JSON.stringify(article));

        const resp = CardLiveblog(newArticle);

        expect(timeIterator(newArticle, resp.timeline)).toBeTruthy();
    });
});
