import Video from '../../../../../../../components/private/LN/api/common/video/index';
import VideoArticle from '../../../../../../../__mocks__/data/nota/cuerpo/video/video.json';

describe('Json video common', () => {
    it('Si se envia un valor null', () => {
        const resp = Video(null);
        expect(resp).toBe(null);
    });

    it('Render video common', () => {
        const resp = Video(VideoArticle[0].streams);
        expect(resp['_t']).toBe('mmf');
        expect(resp.width).toBe(VideoArticle[0].streams[1].width);
        expect(resp.height).toBe(VideoArticle[0].streams[1].height);
        expect(resp.url).toBe(VideoArticle[0].streams[1].url);
    });

    it('Render video sin contenido stream', () => {
        const respStreamEmpty = Video(VideoArticle[2].streams);
        expect(respStreamEmpty).toBe(null);

        const respNoStream = Video(VideoArticle[5].streams);
        expect(respNoStream).toBe(null);
    });
});
