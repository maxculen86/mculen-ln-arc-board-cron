import {
    videoCommon as Video,
    videos as Videos
} from '../../../../../../../../components/private/LN/api/v1/common/video/index';
import VideoArticle from '../../../../../../../../__mocks__/data/nota/cuerpo/video/video.json';

describe('Json video common', () => {
    it('Si se envia un valor null', () => {
        const resp = Video(null);
        const respVideos = Videos(null);
        expect(resp).toBe(null);
        expect(respVideos).toBe(null);
    });

    it('Render video common', () => {
        const resp = Video(VideoArticle[0].streams);
        expect(resp['_t']).toBe('mmf');
        expect(resp.width).toBe(VideoArticle[0].streams[1].width);
        expect(resp.height).toBe(VideoArticle[0].streams[1].height);
        expect(resp.url).toBe(VideoArticle[0].streams[1].url);
    });

    it('Render videos comun', () => {
        const resp = Videos(VideoArticle[0].streams);
        expect(resp.length).toBe(VideoArticle[0].streams.length);
        expect(resp[0]['_t']).toBe('mmf');
        expect(resp[0].width).toBe(VideoArticle[0].streams[0].width);
        expect(resp[0].height).toBe(VideoArticle[0].streams[0].height);
        expect(resp[0].url).toBe(VideoArticle[0].streams[0].url);
        expect(resp[1]['_t']).toBe('mmf');
        expect(resp[1].width).toBe(VideoArticle[0].streams[1].width);
        expect(resp[1].height).toBe(VideoArticle[0].streams[1].height);
        expect(resp[1].url).toBe(VideoArticle[0].streams[1].url);
    });

    it('Render video sin contenido stream', () => {
        const respStreamEmpty = Video(VideoArticle[2].streams);
        expect(respStreamEmpty).toBe(null);

        const respNoStream = Video(VideoArticle[5].streams);
        expect(respNoStream).toBe(null);
    });
});
