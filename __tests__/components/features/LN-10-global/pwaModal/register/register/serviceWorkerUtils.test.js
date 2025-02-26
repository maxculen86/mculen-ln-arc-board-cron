import {
    register,
    unregister,
    verify
} from '../../../../../../../components/features/LN-10-global/pwaModal/register/serviceWorkerUtils';

describe('components - features - LN-10-global - pwaModal - register - serviceWorkerUtils', () => {
    describe('verify()', () => {
        it('should return true if service worker is supported', () => {
            Object.defineProperty(navigator, 'serviceWorker', {
                value: {},
                configurable: true
            });
            expect(verify()).toBe(true);
        });
    });

    describe('unregister()', () => {
        it('should unregister service workers if supported', async () => {
            delete navigator.serviceWorker;
            navigator.serviceWorker = {
                getRegistrations: jest.fn(() =>
                    Promise.resolve([{ unregister: jest.fn() }])
                )
            };
            const length = await unregister();
            expect(navigator.serviceWorker.getRegistrations).toHaveBeenCalled();
            expect(length).toBe(1);
        });

        it('should handle errors if service worker is not supported', async () => {
            delete navigator.serviceWorker;
            await expect(unregister()).rejects.toThrowError(
                'serviceWorker == undefined'
            );
        });
    });

    describe('register()', () => {
        it('should register a service worker if supported', async () => {
            navigator.serviceWorker = {
                register: jest.fn().mockResolvedValue({})
            };
            await expect(register({deployment: 'deployment'})).resolves.toBeUndefined();
            expect(navigator.serviceWorker.register).toHaveBeenCalledWith(
                '/pf/resources/js/LN/sw.min.js?d=deployment'
            );
        });

        it('should handle errors if service worker registration fails', async () => {
            navigator.serviceWorker = {
                register: jest.fn(() => Promise.reject('Error'))
            };
            await expect(register({deployment: 'deployment'})).rejects.toEqual('Error');
        });
    });
});
