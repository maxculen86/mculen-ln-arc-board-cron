import respChildrens from '../../../../../../../../../components/private/LN/api/global/components/chains/config/configReponseByTypeChain';
import { respChildrens as respApertura } from '../../../../../../../../../components/private/LN/api/global/components/chains/common/respChildrens/chainsTypes/apertura';
import { respChildrens as respBomba } from '../../../../../../../../../components/private/LN/api/global/components/chains/common/respChildrens/chainsTypes/bomba';
import { respChildrens as respManualLN10 } from '../../../../../../../../../components/private/LN/api/global/components/chains/common/respChildrens/chainsTypes/temaLN10';
import { responseDefault } from '../../../../../../../../../components/private/LN/api/global/components/chains/common/respChildrens/chainsTypes/tema';
describe('respChildrens', () => {
    it('should include all necessary properties', () => {
        const expectedProperties = [
            'apertura',
            'bomba',
            'chainManual',
            'LN',
            'LN10'
        ];
        const receivedProperties = Object.keys(respChildrens);
        expect(receivedProperties).toEqual(expectedProperties);
    });
    it('should have all properties in config and match the expected functions', () => {
        expect(respChildrens).toHaveProperty('apertura', expect.any(Function));
        expect(respChildrens).toHaveProperty('bomba', expect.any(Function));
        expect(respChildrens).toHaveProperty(
            'chainManual',
            expect.any(Function)
        );
        expect(respChildrens).toHaveProperty('LN', expect.any(Function));
        expect(respChildrens).toHaveProperty('LN10', expect.any(Function));

        expect(respChildrens.apertura).toBe(respApertura);
        expect(respChildrens.bomba).toBe(respBomba);
        expect(respChildrens.chainManual).toBe(respManualLN10);
        expect(respChildrens.LN).toBe(responseDefault);
        expect(respChildrens.LN10).toBe(respManualLN10);
    });
});
