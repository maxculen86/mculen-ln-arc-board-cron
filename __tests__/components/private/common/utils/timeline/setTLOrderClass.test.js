import { setTLOrderClass } from '../../../../../../components/private/LN/common/utils/timeline';

describe('Private - Common - Utils - timeline - setTLOrderClass', () => {
    it('return left if index is zero', () => {
        const timeline = { index: 0 };
        const result = setTLOrderClass(timeline);

        expect(result).toEqual('--left-top');
    });

    it('return right if index is the last or anything different to zero', () => {
        const timeline = { index: 4 };
        const result = setTLOrderClass(timeline);

        expect(result).toEqual('--right-bottom');
    });
});
