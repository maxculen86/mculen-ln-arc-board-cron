import useTermica from '../../../../../../components/private/common/hooks/useTermica';
import showSubscribeButton from '../../../../../../components/private/LN/common/utils/showSubscribeButton';
jest.mock('../../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

describe('components - Private - LN - Common - utils - ShowSubscribeButton', () => {
    describe('ShowSubscribeButton test', () => {
        global.window = {
            location: {
                origin: 'https://example.com'
            }
        };
        test('When all conditions are met return true', () => {
            useTermica.mockImplementation(() => true);

            const loginData = {
                subscription: false
            };
            expect(showSubscribeButton(loginData)).toBe(true);
        });
        test('When user is suscribed return false', () => {
            useTermica.mockImplementation(() => true);
            const loginData = {
                subscription: true
            };
            expect(showSubscribeButton(loginData)).toBe(false);
        });
        test('When paywall is false return false', () => {
            useTermica.mockImplementation(() => false);
            const loginData = {
                subscription: false
            };
            expect(showSubscribeButton(loginData)).toBe(false);
        });
    });
});
