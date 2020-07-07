import ArticleEmbed from '../../../../../../../__mocks__/data/nota/cuerpo/embed/embed.json';
import Embed from '../../../../../../../components/private/LN/api/v1/nota/cuerpo/embed';

describe('Test de las embebidos en el cuerpo de una nota', () => {
    it('Test de embebidos si es null', () => {
        const resp = Embed(null);
        expect(resp).toBe(null);
    });

    it('Test de embebidos html null', () => {
        const resp = Embed(ArticleEmbed[8]);
        expect(resp).toBe(null);
    });

    it('Test de embebidos sin un type valido', () => {
        const resp = Embed(ArticleEmbed[9]);
        expect(resp).toBe(null);
    });

    it('Valores de embebidos Twitter', () => {
        const resp = Embed(ArticleEmbed[0]);
        expect(resp['valor']['id']).toBe(ArticleEmbed[0].subtype);
        expect(resp['valor']['src']).toBe(
            'https://twitter.com/realDonaldTrump/status/1265601611310739456?ref_src=twsrc%5Etfw'
        );
    });

    it('Valores de embebidos Youtube', () => {
        const resp = Embed(ArticleEmbed[1]);
        expect(resp['valor']['id']).toBe(ArticleEmbed[1].subtype);
        expect(resp['valor']['src']).toBe(
            'https://www.youtube.com/embed/ZJD2y7u1mQA?feature=oembed'
        );
    });

    it('Valores de embebidos Vimeo', () => {
        const resp = Embed(ArticleEmbed[2]);
        expect(resp['valor']['id']).toBe(ArticleEmbed[2].subtype);
        expect(resp['valor']['src']).toBe(
            'https://player.vimeo.com/video/43203878?app_id=122963'
        );
    });

    it('Valores de embebidos Dailymotion', () => {
        const resp = Embed(ArticleEmbed[3]);
        expect(resp['valor']['id']).toBe(ArticleEmbed[3].subtype);
        expect(resp['valor']['src']).toBe(
            'https://www.dailymotion.com/embed/video/x589c8d'
        );
    });

    it('Valores de embebidos Instagram', () => {
        const resp = Embed(ArticleEmbed[4]);
        expect(resp['valor']['id']).toBe(ArticleEmbed[4].subtype);
        expect(resp['valor']['src']).toBe(
            'https://www.instagram.com/p/CA5tjVtlEOs/?utm_source=ig_embed&amp;utm_campaign=loading'
        );
    });

    it('Valores de embebidos Facebook Video', () => {
        const resp = Embed(ArticleEmbed[5]);
        expect(resp['valor']['id']).toBe('facebook-post');
        expect(resp['valor']['src']).toBe(
            'https://www.facebook.com/Foofightersmex/videos/552654842354859'
        );
    });

    it('Valores de embebidos Facebook Post', () => {
        const resp = Embed(ArticleEmbed[6]);
        expect(resp['valor']['id']).toBe('facebook-post');
        expect(resp['valor']['src']).toBe(
            'https://www.facebook.com/premierleague/posts/3629332593757796'
        );
    });

    it('Valores de embebidos Spotify', () => {
        const resp = Embed(ArticleEmbed[7]);
        expect(resp['valor']['id']).toBe(ArticleEmbed[7].subtype);
        expect(resp['valor']['src']).toBe(
            'https://open.spotify.com/embed/track/2vg16RThWkdrrohdk4wq25?si=ADUCgXpPQ1muQsxZHMSyxQ'
        );
    });

    it('Check respuesta general de los embebidos', () => {
        const resp = Embed(ArticleEmbed[7]);
        expect(resp['_t']).toBe('p');
    });
});
