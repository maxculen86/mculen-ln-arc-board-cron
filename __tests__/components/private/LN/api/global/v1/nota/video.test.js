import Video from '../../../../../../../components/private/LN/api/global/v1/nota/video';
import VideoArticle from '../../../../../../__mocks__/data/nota/cuerpo/video/video.json';

describe('Test unitarios de videos en nota', () => {
    it('Testeo de video si se le envia un valor null', () => {
        const resp = Video(null);
        expect(resp).toBe(null);
    });

    it('Testo de video si se le envia contenido Stream en null', () => {
        const respStreamEmpty = Video(VideoArticle[2]);
        expect(respStreamEmpty).toBe(null);

        const respNoStream = Video(VideoArticle[5]);
        expect(respNoStream).toBe(null);
    });

    it('Testo de los datos del video sin epigrafe', () => {
        const resp = Video(VideoArticle[4]);
        expect(resp.epigrafe).toBeUndefined();
    });

    it('Testo de los datos del video sin publicidad', () => {
        const resp = Video(VideoArticle[1]);
        expect(resp.showAd).toBe('0');
    });

    it('Testo de los datos del video sin miniatura', () => {
        const respNotExist = Video(VideoArticle[3]);
        expect(respNotExist.multimedioImagen).toBeUndefined();

        const respEmpty = Video(VideoArticle[6]);
        expect(respEmpty.multimedioImagen).toBeUndefined();
    });

    it('Testo de los datos del video', () => {
        const resp = Video(VideoArticle[0]);
        expect(resp['_t']).toBe('vid');
        expect(resp.id).toBe(VideoArticle[0]._id);
        expect(resp.duracion).toBe(VideoArticle[0].duration);
        expect(resp.showAd).toBe('1');
        expect(resp.tituloHome).toBe(VideoArticle[0].headlines.basic);
        expect(resp.epigrafe).toBe(VideoArticle[0].subheadlines.basic);

        expect(resp.multimedioImagen['_t']).toBe('mmi');
        expect(resp.multimedioImagen.orden).toBe(0);
        expect(resp.multimedioImagen.src).toBe(
            VideoArticle[0].promo_items.basic.url
        );

        expect(resp.multimedioFile['_t']).toBe('mmf');
        expect(resp.multimedioFile.width).toBe(
            VideoArticle[0].streams[1].width
        );
        expect(resp.multimedioFile.height).toBe(
            VideoArticle[0].streams[1].height
        );
        expect(resp.multimedioFile.url).toBe(VideoArticle[0].streams[1].url);
    });
});
