import {
    checkLocalStorageItems,
    updateToken
} from '../../../../../../../components/features/LN-10-global/pwaModal/register/subscriptionUtils';

const localStorageMock = (function() {
    let store = {};

    return {
        getItem(key) {
            return store[key] || null;
        },

        setItem(key, value) {
            store[key] = value;
        },

        clear() {
            store = {};
        },

        removeItem(key) {
            delete store[key];
        },

        getAll() {
            return store;
        }
    };
})();

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({})
    })
);

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
    localStorage.clear();
});

const VALUES = {
    authToken: {
        value:
            'eUf81LDJed8:APA91bHmJoNfUmA2XCRFUsfDWjLHFBJnzCTZj8GhIhJSZFFOvTXcBqHfUlHCcTLiipG4wl_T3SOycDtn60jsMSOh2R08aKJmF9JEXQSarEHIF6lzatZ_QleHLgr1NRDvxrputuDlY9FL',
        title: ['x-auth2-token', 'x-auth3-token']
    },
    endpointArn: {
        value:
            'arn:aws:sns:us-east-1:893468207369:endpoint/GCM/sns_gcm_pro/7e60bd44-6996-3282-8bfc-db4bdbcc474b',
        title: 'endpointArn'
    }
};

describe('components - features - LN-10-global - pwaModal - register - subscriptionUtils', () => {
    const { authToken, endpointArn } = VALUES;

    describe('checkLocalStorageItems function', () => {
        it('should return default values', () => {
            const result = checkLocalStorageItems(authToken.value);

            expect(result).toMatchObject({
                deviceArn: null,
                hasTokenStored: false,
                hasTokenChanged: false,
                hasArnStored: false
            });
        });

        it('should return result with endpointArn stored', () => {
            localStorage.setItem(endpointArn.title, endpointArn.value);
            const result = checkLocalStorageItems(authToken.value);

            expect(result).toMatchObject({
                deviceArn: endpointArn.value,
                hasTokenStored: false,
                hasTokenChanged: false,
                hasArnStored: true
            });
        });

        it('should return result with token stored', () => {
            localStorage.setItem(authToken.title[0], authToken.value);
            localStorage.setItem(authToken.title[1], authToken.value);

            const result = checkLocalStorageItems(authToken.value);

            expect(result).toMatchObject({
                deviceArn: null,
                hasTokenStored: true,
                hasTokenChanged: false,
                hasArnStored: false
            });
        });

        it('should return result with token changed', () => {
            localStorage.setItem(authToken.title[0], authToken.value);
            localStorage.setItem(
                authToken.title[1],
                authToken.value.substring(0, 5)
            );

            const result = checkLocalStorageItems(authToken.value);

            expect(result).toMatchObject({
                deviceArn: null,
                hasTokenStored: true,
                hasTokenChanged: true,
                hasArnStored: false
            });
        });
    });

    describe('updateToken function', () => {
        it('should get new token', async () => {
            const NEW_TOKEN_VALUE = 'NEW_TOKEN_VALUE';

            global.fetch.mockReturnValue(
                Promise.resolve({
                    json: () => Promise.resolve(NEW_TOKEN_VALUE)
                })
            );

            await updateToken({
                token: authToken.value,
                endpointArn: endpointArn.value
            });

            setTimeout(() => {
                expect(localStorage.getItem(authToken.title[0])).toEqual(
                    NEW_TOKEN_VALUE
                );
            });
        });

        it('should fails getting new token', async () => {
            global.fetch.mockReturnValue(Promise.reject('Token invalid'));

            await updateToken({
                token: authToken.value,
                endpointArn: endpointArn.value
            });

            expect(localStorage.getItem(authToken.title[0])).toEqual(null);
        });
    });
});
