import { handleHttpError } from '../../../../../components/private/common/utils/handleHttpError';

describe('handleHttpError', () => {
    test('should throw an error when the response is not ok', () => {
        const response = {
            ok: false,
            status: 404,
            statusText: 'Not Found'
        };

        expect(() => handleHttpError(response)).toThrow({
            message: 'HTTP error! status: 404 Not Found',
            statusCode: 404
        });
    });

    test('should not throw an error when the response is ok', () => {
        const response = {
            ok: true,
            status: 200,
            statusText: 'OK'
        };

        expect(() => handleHttpError(response)).not.toThrow();
    });
});
