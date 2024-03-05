import { fetch } from '../../../content/sources/apiConvivenciaSource';
import getProperties from 'fusion:properties';

jest.mock('request-promise-native', () => jest.fn());

describe('fetch function', () => {
    it('should return the video ID when the HTTP request is successful', async () => {
        const successfulResponse = { video_id: '12345' };
        const request = require('request-promise-native');
        request.mockResolvedValue(JSON.stringify(successfulResponse));

        const query = { uri: '/example-uri' };
        const result = await fetch(query);
        expect(result).toEqual({ idJw: '12345' });
    });
});
