import permutiveIdentify from '../../../../../../components/private/LN/common/utils/permutiveIdentify';
import handleCookie from '../../../../../../components/private/LN/common/utils/handleCookie';

window.permutive = {};
window.permutive.identify = jest.fn();

describe('components - private - LN - common - utils', () => {
    const mockCookie = {
        getCookie: jest.fn(() => '')
    };

    jest.mock(
        '../../../../../../components/private/LN/common/utils/handleCookie',
        () => {
            return jest.fn(() => mockCookie);
        }
    );
    describe('Permutive identify test with no cookie value', () => {
        test('Permutive identify musnt be called with invalid arguments', () => {
            permutiveIdentify(null);
            expect(window.permutive.identify).toBeCalledTimes(0);
        });
        test('If empty string permutive identify musnt be called', () => {
            permutiveIdentify('');
            expect(window.permutive.identify).toBeCalledTimes(0);
        });
        test('Permutive identify must be called with valid arguments', () => {
            permutiveIdentify('jorge@jorge.com');
            expect(window.permutive.identify).toBeCalledTimes(1);
        });
    });
    describe('Permutive identify test with cookie value', () => {
        const mockCookie = {
            getCookie: jest.fn(() => 'I am the cookie')
        };

        jest.mock(
            '../../../../../../components/private/LN/common/utils/handleCookie',
            () => {
                return jest.fn(() => mockCookie);
            }
        );
        test('If string is empty for email but we have cookie then permutative identify should be called', () => {
            permutiveIdentify('');
            expect(window.permutive.identify).toBeCalledTimes(1);
        });
    });
});
