import getUserData, {
    getUserType
} from '../../../../../../components/private/common/auth/hooks/_helper';

describe('components - private - common - auth - hooks - _helper', () => {
    afterEach(() => {
        delete window.UCL;
    });

    describe('getUserType', () => {
        it('should return subscribed when user is subscribed', () => {
            expect(getUserType('test@test.com', true)).toBe('subscribed');
        });

        it('should return logged when user has email but is not subscribed', () => {
            expect(getUserType('test@test.com', false)).toBe('logged');
        });

        it('should return unlogged when there is no email and no subscription', () => {
            expect(getUserType('', false)).toBe('unlogged');
        });
    });

    describe('getUserData', () => {
        it('should return unlogged user data when there is no window.UCL', async () => {
            const result = await getUserData('2');

            expect(result).toEqual({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                userId: '',
                isSubscribed: false
            });
        });

        it('should return unlogged user data when GetUserInfo resolves undefined', async () => {
            window.UCL = {
                GetUserInfo: jest.fn().mockResolvedValue(undefined)
            };

            const result = await getUserData('2');

            expect(result).toEqual({
                userType: 'unlogged',
                userEmail: '',
                userName: '',
                userLastName: '',
                userId: '',
                isSubscribed: false
            });
        });

        it('should map GetUserInfo fields to the logged user data contract', async () => {
            window.UCL = {
                GetUserInfo: jest.fn().mockResolvedValue({
                    given_name: 'Juan',
                    family_name: 'Perez',
                    current_login_email: 'juan@test.com',
                    ln_user_id: '123',
                    productos_premium: [22]
                })
            };

            const result = await getUserData('2');

            expect(result).toEqual({
                userType: 'logged',
                userName: 'Juan',
                userEmail: 'juan@test.com',
                userId: '123',
                userLastName: 'Perez',
                isSubscribed: false
            });
        });

        it('should mark the user as subscribed when productos_premium includes the requested product as a number', async () => {
            window.UCL = {
                GetUserInfo: jest.fn().mockResolvedValue({
                    given_name: 'Juan',
                    family_name: 'Perez',
                    current_login_email: 'juan@test.com',
                    ln_user_id: '123',
                    productos_premium: [2, 22]
                })
            };

            const result = await getUserData('2');

            expect(result).toEqual({
                userType: 'subscribed',
                userName: 'Juan',
                userEmail: 'juan@test.com',
                userId: '123',
                userLastName: 'Perez',
                isSubscribed: true
            });
        });
    });
});
