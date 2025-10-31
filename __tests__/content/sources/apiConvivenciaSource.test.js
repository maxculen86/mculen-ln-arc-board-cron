import { fetch } from '../../../content/sources/apiConvivenciaSource';

global.fetch = jest.fn(() => {
    return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ video_id: '12345' })
    });
});

describe('fetch function', () => {
    it('should return the video ID when the HTTP request is successful', async () => {
        const query = { uri: '/example-uri' };
        const result = await fetch(query);
        expect(result).toEqual({ idJw: '12345' });
    });
});
