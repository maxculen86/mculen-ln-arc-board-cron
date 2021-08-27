import React, { useContext } from 'react';
import loginHelper from '../../../../../../components/private/LN/common/utils/loginHelper';

describe('Util loginHelper', () => {
    jest.mock('react', () => {
        const ActualReact = require.requireActual('react');
        return {
            ...ActualReact,
            useContext: () => ({})
        };
    });

    it('should have functions defined', () => {
        const { isSubscribed, isLoggedIn, getLoginData } = loginHelper;
        expect(loginHelper).toBeDefined();
        expect(typeof loginHelper).toBe('object');
        expect(isSubscribed).toBeDefined();
        expect(typeof isSubscribed).toBe('function');
        expect(isLoggedIn).toBeDefined();
        expect(typeof isLoggedIn).toBe('function');
        expect(getLoginData).toBeDefined();
        expect(typeof getLoginData).toBe('function');
    });

    describe('when access to context values', () => {
        const contextValues = {
            loginData: {
                subscription: true,
                loading: false
            },
            logueado: true
        };

        jest.spyOn(React, 'useContext').mockImplementation(() => ({
            state: contextValues
        }));

        it('isSubscribed should return true', () => {
            const { isSubscribed } = loginHelper;
            expect(isSubscribed()).toBe(true);
        });

        it('isLoggedIn should return true', () => {
            const { isLoggedIn } = loginHelper;
            expect(isLoggedIn()).toBe(true);
        });

        it('getLoginData works correctly', () => {
            const { getLoginData } = loginHelper;
            expect(getLoginData()).toBe(contextValues.loginData);
        });
    });
});
