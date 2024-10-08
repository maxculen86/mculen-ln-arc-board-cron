import { checkSubscriptionFromCookie } from '../../../../../components/chains/utils/_BuildRoof/_helper/checkSubscription';

describe('components - chains - utils - _BuildRoof', () => {
    beforeEach(() => {
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: ''
        });
    });
    test('returns true when cookie includes value "22"', () => {
        document.cookie = '; ProductoPremiumId=2,22';
        const result = checkSubscriptionFromCookie('22');

        expect(result).toBe(true);
    });
    test('returns true when cookie includes value "2"', () => {
        document.cookie = '; ProductoPremiumId=2,3';
        const result = checkSubscriptionFromCookie('2');

        expect(result).toBe(true);
    });

    test('returns false when cookie includes the specified value', () => {
        document.cookie = '; ProductoPremiumId=1,2,3';
        const result = checkSubscriptionFromCookie('10');

        expect(result).toBe(false);
    });
});
