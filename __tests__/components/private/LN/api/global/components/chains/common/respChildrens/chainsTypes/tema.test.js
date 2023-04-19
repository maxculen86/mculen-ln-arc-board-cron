import { responseDefault } from '../../../../../../../../../../../components/private/LN/api/global/components/chains/common/respChildrens/chainsTypes/tema';
describe('responseDefault tema', () => {
    it('return array empty if children in props is array of nulls ', () => {
        const props = {
            children: [null, null, null],
            customFields: { layout: 'layaoutTemplate' }
        };
        const result = responseDefault(props);
        expect(result).toEqual([]);
    });
    it('should return expected result', () => {
        const props = {
            children: [1, 2, null, 4],
            customFields: { layout: 'grid_2@xs' }
        };
        const expected = [1, 2, 4];
        const result = responseDefault(props);
        expect(result).toEqual(expected);
    });
});
