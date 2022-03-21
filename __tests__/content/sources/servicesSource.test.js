import 'regenerator-runtime/runtime';
import servicesSource from '../../../content/sources/servicesSource';
import logger from '../../../components/private/common/utils/logger';
import lottery from '../../../content/sources/utils/servicesSource/lottery/lottery';
import telekinoResponse from '../../../__mocks__/data/lottery/transformDetail/outputTelekino';

jest.mock('../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

const loggerPush = jest.spyOn(logger, 'push');

describe('Content Sources - Services Source', () => {
    const { fetch } = servicesSource;

    const query = {
        id: '/loterias/telekino',
        service: 'loterias',
        serviceItem: 'telekino',
        uri: '',
        'arc-site': 'la-nacion-ar'
    };

    it('Should return data that is sent in a default request', done => {
        const requestMockReq = jest.spyOn(lottery, 'request');
        const requestMockRes = jest.spyOn(lottery, 'resolve');
        requestMockReq.mockReturnValueOnce(Promise.resolve(telekinoResponse));
        requestMockRes.mockReturnValueOnce(Promise.resolve(telekinoResponse));

        fetch(query, {
            cachedCall: jest.fn()
        })
            .then(response => expect(response).toStrictEqual(telekinoResponse))
            .then(done);
    });

    it('Should fail to get data from cached call', done => {
        fetch(
            {},
            {
                cachedCall: jest.fn()
            }
        )
            .catch(error =>
                expect(error).toStrictEqual(
                    Error(
                        'Debe definir un id para realizar la consulta - Section Source'
                    )
                )
            )
            .then(done);
    });

    it('Should reject request', done => {
        const requestMock = jest.spyOn(lottery, 'resolve');

        requestMock.mockImplementation(() => {
            throw new Error();
        });

        fetch(query, {
            cachedCall: jest.fn()
        })
            .then(() => expect(loggerPush).toBeCalledTimes(1))
            .then(done);
    });
});
