import { moveElementsByKey } from '../../../../../../../../../components/private/LN/api/global/page/common/utils/moveElements';

describe('moveElementsByKey', () => {
    it('returns original array if parameters are missing or invalid', () => {
        expect(moveElementsByKey()).toBeUndefined();
        expect(moveElementsByKey(null, null, null, null)).toBeNull();
        expect(moveElementsByKey({}, 'key', 'value', [])).toEqual([]);
    });
});
