jest.mock('fusion:environment', () => {
    return {
        AUDIONEWS_URL: 'api_url/'
    };
});

global.fetch = jest.fn(() => {
    return Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
            Promise.resolve({
                audio_status: 6,
                audio_url: 'url'
            })
    });
});

jest.mock('../../../components/private/common/utils/logger', () => ({
    push: jest.fn()
}));

import audionewsSource from '../../../content/sources/audionewsSource';

describe('Audionews content sources Unit Tests', () => {
    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    const { fetch: fetchContent } = audionewsSource;

    it('Should return a response OK', async () => {
        const query = { id: '123ASD123ASD' };

        const mockResp = {
            audio_status: 6,
            audio_url: 'url',
            audio_custom_voice: false
        };

        const response = await fetchContent(query);
        expect(response).toEqual(mockResp);
    });

    it('Should return a empty response', done => {
        const query = { id: '456ASD456ASD' };
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () =>
                    Promise.resolve({
                        audio_status: 3
                    })
            });
        });
        fetchContent(query)
            .then(response => {
                expect(response).toEqual({});
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

    it('Should return empty object and warn when status is 404', async () => {
        const query = { id: 'NOT_FOUND_ID' };

        const warnSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => {});

        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 404,
                body: 'Not Found',
                json: () => Promise.resolve({})
            })
        );

        const response = await audionewsSource.fetch(query);

        expect(response).toEqual({});
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalled();

        warnSpy.mockRestore();
    });

    it('Should reject by status code 500', async () => {
        const query = { id: '098765ASDFGH' };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 500,
                body: 'Internal Server Error',
                json: () => Promise.resolve({})
            })
        );

        await expect(audionewsSource.fetch(query)).rejects.toThrow(
            'Error al obtener el audio de la nota'
        );

        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});
