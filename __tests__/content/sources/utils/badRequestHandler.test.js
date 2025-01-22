import badRequestHandler from '../../../../content/sources/utils/badRequestHandler';

describe('badRequestHandler', () => {
    it('should throw an error with the default message and code 400', () => {
        expect(() => badRequestHandler()).toThrowError('Bad Request');
        try {
            badRequestHandler();
        } catch (error) {
            expect(error.statusCode).toBe(400);
        }
    });

    it('should throw an error with a custom message', () => {
        const customMessage = 'Invalid input';
        expect(() => badRequestHandler(customMessage)).toThrowError(
            customMessage
        );
        try {
            badRequestHandler(customMessage);
        } catch (error) {
            expect(error.message).toBe(customMessage);
        }
    });

    it('should throw an error with a custom status code', () => {
        const customCode = 422;
        expect(() =>
            badRequestHandler('Validation error', customCode)
        ).toThrowError('Validation error');
        try {
            badRequestHandler('Validation error', customCode);
        } catch (error) {
            expect(error.statusCode).toBe(customCode);
        }
    });

    it('should throw an error with both a custom message and status code', () => {
        const customMessage = 'Unexpected error';
        const customCode = 500;
        expect(() => badRequestHandler(customMessage, customCode)).toThrowError(
            customMessage
        );
        try {
            badRequestHandler(customMessage, customCode);
        } catch (error) {
            expect(error.message).toBe(customMessage);
            expect(error.statusCode).toBe(customCode);
        }
    });
});
