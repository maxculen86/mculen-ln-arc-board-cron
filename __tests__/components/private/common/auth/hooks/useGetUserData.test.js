import { renderHook, waitFor, act } from '@testing-library/react';
import useGetUserData from '../../../../../../components/private/common/auth/hooks/useGetUserData';

describe('components - private - common - auth - hooks - useGetUserData', () => {
    afterEach(() => {
        delete window.UCL;
        jest.restoreAllMocks();
    });

    it('should return the loading contract on first render', () => {
        const { result } = renderHook(() => useGetUserData('2'));

        expect(result.current).toEqual({
            userType: 'loading',
            initials: '',
            userEmail: '',
            isSubscribed: false,
            userName: '',
            userId: '',
            userLastName: ''
        });
    });

    it('should return unlogged data when window.UCL is not present', async () => {
        const { result } = renderHook(() => useGetUserData('2'));

        await waitFor(() => {
            expect(result.current.userType).toBe('unlogged');
        });

        expect(result.current).toEqual({
            userType: 'unlogged',
            initials: '',
            userEmail: '',
            isSubscribed: false,
            userName: '',
            userId: '',
            userLastName: ''
        });
    });

    it('should expose logged user data derived from UCL.GetUserInfo', async () => {
        window.UCL = {
            GetUserInfo: jest.fn().mockResolvedValue({
                given_name: 'Juan',
                family_name: 'Perez',
                current_login_email: 'juan@test.com',
                ln_user_id: '123',
                productos_premium: [2]
            })
        };

        const { result } = renderHook(() => useGetUserData('2'));

        await waitFor(() => {
            expect(result.current.userType).toBe('subscribed');
        });

        expect(result.current).toEqual({
            userType: 'subscribed',
            initials: 'JP',
            userEmail: 'juan@test.com',
            isSubscribed: true,
            userName: 'Juan',
            userId: '123',
            userLastName: 'Perez'
        });
    });

    it('should reload user data when the ucl-ready event fires', async () => {
        const { result } = renderHook(() => useGetUserData('2'));

        await waitFor(() => {
            expect(result.current.userType).toBe('unlogged');
        });

        window.UCL = {
            GetUserInfo: jest.fn().mockResolvedValue({
                given_name: 'Ana',
                family_name: 'Gomez',
                current_login_email: 'ana@test.com',
                ln_user_id: '456',
                productos_premium: []
            })
        };

        act(() => {
            window.dispatchEvent(new CustomEvent('ucl-ready'));
        });

        await waitFor(() => {
            expect(result.current.userType).toBe('logged');
        });

        expect(result.current.userName).toBe('Ana');
        expect(result.current.userId).toBe('456');
    });
});
