import 'regenerator-runtime/runtime';
import servicesSource from '../../../content/sources/servicesSource';
import logger from '../../../components/private/common/utils/logger';

jest.mock('../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

const loggerPush = jest.spyOn(logger, 'push');

describe('Content Sources - Services Source', () => {
    const { fetch } = servicesSource;

    it('Should return data that is sent in a default request', done => {
        const query = {
            id: '/loterias/telekino',
            service: 'loterias',
            serviceItem: 'telekino',
            uri: '',
            'arc-site': 'la-nacion-ar'
        };

        const defaultResponse = {
            dataService: { ...query },
            serviceType: 'detalle-loterias'
        };

        fetch(query, {
            cachedCall: () => Promise.resolve({})
        })
            .then(response => expect(response).toStrictEqual(defaultResponse))
            .then(done);
    });
});
