import configTypeChain from '../../../../../../../../../components/private/LN/api/global/components/chains/config/configTypeChain';
import configTypeChainLN from '../../../../../../../../../components/private/LN/api/global/components/chains/config/jsons/configToGetTypeChainLN.json';
import configTypeChainLN10 from '../../../../../../../../../components/private/LN/api/global/components/chains/config/jsons/configToGetTypeChainLN10.json';
describe('configTypeChain', () => {
    test('should have properties LN and LN10', () => {
        expect(configTypeChain).toHaveProperty('LN');
        expect(configTypeChain).toHaveProperty('LN10');
    });

    test('LN and LN10 should be valid objects', () => {
        expect(typeof configTypeChain.LN).toBe('object');
        expect(typeof configTypeChain.LN10).toBe('object');
    });

    test('configTypeChainLN should be a valid object', () => {
        expect(typeof configTypeChainLN).toBe('object');
    });

    test('configTypeChainLN10 should be a valid object', () => {
        expect(typeof configTypeChainLN10).toBe('object');
    });
});
