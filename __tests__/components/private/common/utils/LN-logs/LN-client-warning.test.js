import LNClientWarning from '../../../../../../components/private/common/utils/LN-logs/LN-client-warning';

describe('LNClientWarning', () => {
    describe('with correct arguments', () => {
        test('Should call DD_LOGS', () => {
            const args = {
                message: 'Mensaje de prueba',
                customsProps: {
                    customErrorType: 'controlado',
                    layout: 'LN-nota-noticia',
                    source: 'content/source/liftigniterSource',
                    template: 'template/nota-noticia',
                    type: 'LN-nota/tePuedeInteresar'
                }
            };
            window.DD_LOGS = {
                onReady: jest.fn()
            };

            expect(LNClientWarning(args)).toEqual(args);
            expect(window.DD_LOGS.onReady).toBeCalledTimes(1);
        });
    });

    describe('Without arguments', () => {
        test('Should Not call DD_LOGS', () => {
            window.DD_LOGS = {
                onReady: jest.fn()
            };
            const args = {};
            expect(LNClientWarning(args)).toBeEmptyRender;
            expect(window.DD_LOGS.onReady).toBeCalledTimes(0);
        });
    });

    describe('When window is undefined', () => {
        test('should Not call DD_LOGS', () => {
            window = undefined;
            const args = {};
            expect(LNClientWarning(args)).toEqual(undefined);
        });
    });
});
