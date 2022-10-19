import 'regenerator-runtime/runtime';
import audionewsSource from '../../../content/sources/audionewsSource';

jest.mock('fusion:environment', () => {
    return {
        AUDIO_NEWS_URL: 'api_url/'
    };
});

jest.mock('request-promise-native', () => {
    return {
        __esModule: true,
        default: method => {
            const path = method.uri.split('/');
            path.splice(0, 2);

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
            .then(response => expect(response).toEqual(mockResp))
            .then(done);
    });

    it('Should reject by invalid date number', async () => {
        const query = { id: '123ASD123ASD', date: '111111111' };

        try {
            audionewsSource.fetch(query);
        } catch (err) {
            expect(err.message).toBe(
                'El campo date con valor 111111111 no es valido para convertir a fecha'
            );
        }
    });

    it('Should reject by has not field id', async () => {
        const query = { date: '111111111' };

        try {
            audionewsSource.fetch(query);
        } catch (err) {
            expect(err.message).toBe('El campo id es obligatorio');
        }
    });

    it('Should reject by has not field date', async () => {
        const query = { id: '123ASD123XCV' };

        try {
            audionewsSource.fetch(query);
        } catch (err) {
            expect(err.message).toBe('El campo date es obligatorio');
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
