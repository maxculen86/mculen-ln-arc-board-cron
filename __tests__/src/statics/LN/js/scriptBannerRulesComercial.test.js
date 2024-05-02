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
// Espiar sobre setTimeout
jest.spyOn(global, 'setTimeout');

describe('src - statics - LN - js - bannerRulesComercial', () => {
    test('hideBannerComercial should work as expected', () => {
        hideBannerComercial('comercial_mob');
        jest.advanceTimersByTime(12000);

        // Verificar que setTimeout ha sido llamado con una función y un tiempo de espera de 12000 milisegundos
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 12000);
    });
});
