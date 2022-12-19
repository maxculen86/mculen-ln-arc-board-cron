import useTermica from '../../../../../../components/private/common/hooks/useTermica';
import showSubscribeButton from '../../../../../../components/private/LN/common/utils/showSubscribeButton';
jest.mock('../../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

describe('components - Private - LN - Common - utils - ShowSubscribeButton', () => {
    describe('ShowSubscribeButton test', () => {
        test('When all conditions are met return true', () => {
            useTermica.mockImplementation(() => true);
            const conditions = {
                loginData: {
                    subscription: false
                },
                window: {
                    location: {
                        origin: 'https://example.com'
                    }
                }
            };
            expect(showSubscribeButton(conditions)).toBe(true);
        });
        test('When user is suscribed return false', () => {
            useTermica.mockImplementation(() => true);
            const conditions = {
                loginData: {
                    subscription: true
                },
                window: {
                    location: {
                        origin: 'https://example.com'
                    }
                }
            };
            expect(showSubscribeButton(conditions)).toBe(false);
        });
        test('When paywall is false return false', () => {
            useTermica.mockImplementation(() => false);
            const conditions = {
                loginData: {
                    subscription: true
                },
                window: {
                    location: {
                        origin: 'https://example.com'
                    }
                }
            };
            expect(showSubscribeButton(conditions)).toBe(false);
        });
    });
});
