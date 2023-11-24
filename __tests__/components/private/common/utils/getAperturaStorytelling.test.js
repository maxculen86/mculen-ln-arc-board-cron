import getAperturaStorytelling from '../../../../../components/private/common/utils/getAperturaStorytelling';
import videoArticle from '../../../../../__mocks__/data/articlesFoodit/SubtypeStorytelling/FMLGIYTL2ZBCRAKQTSO27CCQ6U.json';
import get from '../../../../../components/private/common/utils/get';

describe('getAperturaStorytelling', () => {
    const videoJW = get(videoArticle, 'promo_items.video_jw');
    const basicImageDsk = get(videoArticle, 'promo_items.basic');
    const basicImageMobile = get(
        videoArticle,
        'promo_items.storytelling_mobile'
    );

    it('should handle videoJW and basicImageMobile for desktop device', () => {
        const result = getAperturaStorytelling(
            videoJW,
            {},
            basicImageMobile,
            'desktop'
        );

        expect(result.videoUrl).toBe(
            'https://cdn.jwplayer.com/videos/zvCisQNF-K8B0kybS.mp4'
        );
        expect(result.posterUrl).toBe(
            'https://cdn.jwplayer.com/v2/media/zvCisQNF/poster.jpg?width=720'
        );
        expect(result.resizedUrls.length).toBeGreaterThan(0);
    });

    it('should handle only basicImageMobile', () => {
        const result = getAperturaStorytelling(
            {},
            {},
            basicImageMobile,
            'mobile'
        );

        expect(result.videoUrl).toBe('');
        expect(result.defaultUrl).toBe(
            'https://sandbox.lanacion.com.ar/resizer/v2/goldbitcoincryptocurrencyonbackgroundofchartdiagr-EILWU6JH7NDNDLVCVEVQHB33UU.jpg?auth=029fd2a3936e51c0946368e50f33e01208bc0dd7cfa04e309c214a721e7faab2&width=420&height=630&quality=70&smart=true'
        );
        expect(result.resizedUrls.length).toBeGreaterThan(0);
    });

    it('should handle only basicImageDsk', () => {
        const result = getAperturaStorytelling(
            {},
            basicImageDsk,
            {},
            'desktop'
        );

        expect(result.videoUrl).toBe('');
        expect(result.defaultUrl).toBe(
            'https://sandbox.lanacion.com.ar/resizer/v2/comid-YXS2J3YI7ZFWJC5I3ECOTV45O4.jpg?auth=603dc01e35a4ae0b09e2cc65bfa5aaf7aac6f255a9fc709b9764e6feae89b64e&width=1200&height=800&quality=70&smart=true'
        );
        expect(result.resizedUrls.length).toBeGreaterThan(0);
    });

    it('should handle empty inputs', () => {
        const result = getAperturaStorytelling({}, {}, {}, 'desktop');

        expect(result.videoUrl).toBe('');
        expect(result.defaultUrl).toBe('');
        expect(result.resizedUrls).toEqual([]);
    });
});
