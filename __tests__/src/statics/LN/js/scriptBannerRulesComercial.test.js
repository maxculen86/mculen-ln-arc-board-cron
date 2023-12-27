import { hideBannerComercial } from '../../../../../src/statics/LN/js/scriptBannerRulesComercial';

document.getElementById = jest.fn(id => ({
    getAttribute: jest.fn(attr =>
        attr === 'data-slotId' ? 'mockedSlotId' : null
    ),
    parentNode: {
        classList: {
            add: jest.fn()
        }
    }
}));

jest.useFakeTimers();

describe('src - statics - LN - js - bannerRulesComercial', () => {
    test('hideBannerComercial should work as expected', () => {
        hideBannerComercial();
        jest.advanceTimersByTime(12000);

        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 12000);
    });
});
