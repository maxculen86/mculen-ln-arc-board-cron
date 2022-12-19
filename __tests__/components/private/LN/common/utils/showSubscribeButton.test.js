import showSubscribeButton from '../../../../../../components/private/LN/common/utils/showSubscribeButton';

describe('components - Private - LN - Common - utils - ShowSubscribeButton', () => {
    describe('ShowSubscribeButton test', () => {
        test('When all conditions are met return true', () => {
            const conditions = {
                paywall: true,
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
            const conditions = {
                paywall: true,
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
            const conditions = {
                paywall: false,
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
