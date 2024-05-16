import '@testing-library/jest-dom';
import { handleScriptBtnSuscription } from '../../../../../src/statics/LN/js/scriptBuildRoof';
describe('scr - statics - LN - js', () => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'SomeCookie; ProductoPremiumId=2; AnotherCookie'
    });
    jest.spyOn(document, 'querySelector').mockReturnValue({
        classList: {
            add: jest.fn()
        },
        remove: jest.fn() // Mocking remove method
    });
    test('hides button when premium product is in the cookie', () => {
        handleScriptBtnSuscription();
        expect(document.querySelector).toHaveBeenCalledWith(
            'a.--roof-button.--subscribe'
        );
        expect(document.querySelector().remove).toHaveBeenCalled();
    });
});
