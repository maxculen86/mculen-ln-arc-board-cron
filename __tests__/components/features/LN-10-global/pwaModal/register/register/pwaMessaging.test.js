import {
    isNotificationDefault,
    storeAuth3Token
} from '../../../../../../../components/features/LN-10-global/pwaModal/register/pwaMessaging';

const VALUES = {
    authToken: {
        value:
            'eUf81LDJed8:APA91bHmJoNfUmA2XCRFUsfDWjLHFBJnzCTZj8GhIhJSZFFOvTXcBqHfUlHCcTLiipG4wl_T3SOycDtn60jsMSOh2R08aKJmF9JEXQSarEHIF6lzatZ_QleHLgr1NRDvxrputuDlY9FL',
        title: ['x-auth2-token', 'x-auth3-token']
    }
};

describe('components - features - LN-10-global - pwaModal - register - pwaMwssaging', () => {
    const { authToken } = VALUES;

    describe('storeAuth3Token function', () => {
        it('should set item received by parameter on localStorage', () => {
            storeAuth3Token(authToken.value);
            expect(localStorage.getItem(authToken.title[1])).toEqual(
                authToken.value
            );
        });
    });

    describe('isNotificationDefault function', () => {
        it('Notification is present in window', () => {
            window.Notification = {
                permission: 'default'
            };
            expect(isNotificationDefault()).toBe(true);
        });

        it('Notification is not present in window', () => {
            delete window.Notification;
            expect(isNotificationDefault()).toBe(false);
        });
    });
});
