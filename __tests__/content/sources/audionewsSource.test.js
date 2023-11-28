import 'regenerator-runtime/runtime';
import audionewsSource from '../../../content/sources/audionewsSource';

jest.mock('fusion:environment', () => {
    return {
        AUDIONEWS_URL: 'api_url/'
    };
});

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: method => {
            const path = method.uri;

            if (path.includes('123ASD123ASD')) {
                return Promise.resolve({
                    ...{
                        statusCode: 200,
                        body: {
                            audio_status: 'audio_sarasa',
                            audio_url: 'url'
                        }
                    }
                });
            }

            throw new Error('Error al obtener el audio de la nota');
        }
    };
});

describe('Audionews content sources Unit Tests', () => {
    const { fetch: fetchContent } = audionewsSource;

    it('Should return a response OK', done => {
        const query = { id: '123ASD123ASD', date: '2022-09-29T20:37:24.108Z' };

        const mockResp = {
            statusCode: 200,
            body: {
                audio_status: 'audio_sarasa',
                audio_url: 'url'
            }
        };

        fetchContent(query)
            .then(response => {
                expect(response).toEqual(mockResp);
            })
            .then(done);
    });

    it('Should reject by has not field id', async () => {
        const query = {};

        try {
            audionewsSource.fetch(query);
        } catch (err) {
            expect(err.message).toBe('El campo id es obligatorio');
        }
    });

    it('Should reject by status code error', async () => {
        const query = { id: '098765ASDFGH', date: '2022-09-29T20:37:24.108Z' };

        try {
            audionewsSource.fetch(query);
        } catch (err) {
            expect(err.message).toBe('Error al obtener el audio de la nota');
        }
    });
});
