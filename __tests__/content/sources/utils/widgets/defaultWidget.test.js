import logger from '../../../../../components/private/common/utils/logger';
import defaultWidget from '../../../../../content/sources/utils/widgets/defaultWidget';

jest.mock('../../../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

describe('content - sources - utils - widgets - defaultWidget.js:', () => {
    const { request, resolve, reject } = defaultWidget;
    const queryData = {
        arcSite: 'la-nacion-ar',
        params: ['param-1', 'param-2'],
        uri: '/widgets/widgetName/param-1/param-2/',
        widget: 'widgetName'
    };

    describe('function request', () => {
        it('when query is undefined should return undefined', () => {
            request().then(response => {
                expect(response).toBeUndefined();
            });
        });

        it('when query is defined should return expected query data', () => {
            request({ queryData }).then(response => {
                expect(response).toStrictEqual(queryData);
            });
        });
    });

    describe('function resolve', () => {
        it('when response is undefined should return undefined', () => {
            expect(resolve()).toBeUndefined();
        });

        it('when response is defined should return expected response', () => {
            expect(resolve({ response: queryData })).toStrictEqual(queryData);
        });
    });

    describe('function reject', () => {
        it('should call looger 1 time', () => {
            const loggerPush = jest.spyOn(logger, 'push');
            reject({
                error: { message: 'Mensaje de error' }
            });
            expect(loggerPush).toBeCalledTimes(1);
        });
    });
});
