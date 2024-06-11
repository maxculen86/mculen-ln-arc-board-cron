import startPWASetup from '../../../../../../../components/features/LN-10-global/pwaModal/register';
import dynamicallyLoadScript from '../../../../../../../components/private/LN/common/utils/dynamicallyLoadScript';

jest.mock(
    '../../../../../../../components/private/LN/common/utils/dynamicallyLoadScript',
    () => ({
        __esModule: true,
        default: jest.fn().mockResolvedValue(true)
    })
);

describe('startPWASetup', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
            'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)'
        );
    });

    it('should start PWA setup correctly', async () => {
        const deployment = jest.fn();

        startPWASetup(deployment);

        window.dispatchEvent(new Event('load'));

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(dynamicallyLoadScript).toHaveBeenNthCalledWith(
            1,
            'https://www.gstatic.com/firebasejs/5.11.1/firebase-app.js',
            'body'
        );
        expect(dynamicallyLoadScript).toHaveBeenNthCalledWith(
            2,
            'https://www.gstatic.com/firebasejs/5.11.1/firebase-messaging.js',
            'body'
        );
    });
});
