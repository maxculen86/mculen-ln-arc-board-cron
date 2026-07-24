import { CALLBACKS_BY_CHANNEL_AND_EVENT } from '../../../../../components/private/common/utils/commentsHelper';

jest.mock('fusion:environment', () => ({
    LOGIN_URL: 'https://login.test/?callback=',
    SITIO_SEGURO_REGISTRACION: 'https://register.test'
}));

jest.mock(
    '../../../../../components/private/common/context/globalContext',
    () => ({
        GlobalContext: {}
    })
);

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('Components - private - common - utils - commentsHelper', () => {
    const originalLocation = window.location;

    beforeEach(() => {
        delete window.location;
        window.location = { href: '' };
        window.vf = {
            $publish: jest.fn()
        };
    });

    afterAll(() => {
        window.location = originalLocation;
    });

    describe('authentication callbacks', () => {
        it('redirects to login when Viafoura requires authentication and there is no session', () => {
            CALLBACKS_BY_CHANNEL_AND_EVENT.authentication.needed({
                loginUrl: 'https://login.test',
                registracionUrl: 'https://register.test',
                sessionToken: '',
                subscription: false
            });

            expect(window.vf.$publish).toHaveBeenCalledWith('tray', 'close');
            expect(window.location.href).toBe('https://login.test');
        });

        it('redirects to subscription when there is a session but no active subscription', () => {
            CALLBACKS_BY_CHANNEL_AND_EVENT.authentication.required({
                loginUrl: 'https://login.test',
                registracionUrl: 'https://register.test',
                sessionToken: 'token',
                subscription: false
            });

            expect(window.vf.$publish).toHaveBeenCalledWith('tray', 'close');
            expect(window.location.href).toBe('https://register.test');
        });
    });
});
