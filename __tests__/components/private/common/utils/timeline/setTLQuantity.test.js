import { setTLQuantity } from '../../../../../../components/private/LN/common/utils/timeline';

describe('Private - Common - Utils - timeline - setTLQuantity', () => {
    it('return always current size, and size plus three for backup', () => {
        const SIZE = 4;
        const { articlesQuantity, articlesQuantityBackup } = setTLQuantity(
            SIZE
        );

        expect(articlesQuantity).toEqual(SIZE);
        expect(articlesQuantityBackup).toEqual(SIZE + 3);
    });

    it('return quantity 5 by default', () => {
        const { articlesQuantity, articlesQuantityBackup } = setTLQuantity();

        expect(articlesQuantity).toEqual(5);
        expect(articlesQuantityBackup).toEqual(8);
    });

    it('if size is greather than maximum, returns maximum', () => {
        const props = { size: 20, max: 15 };
        const { articlesQuantity, articlesQuantityBackup } = setTLQuantity(
            ...Object.values(props)
        );

        expect(articlesQuantity).toEqual(props.max);
        expect(articlesQuantityBackup).toEqual(props.max + 3);
    });

    it('if size is smaller than minimum, returns minimum', () => {
        const props = { size: 1, max: 15, min: 3 };
        const { articlesQuantity, articlesQuantityBackup } = setTLQuantity(
            ...Object.values(props)
        );

        expect(articlesQuantity).toEqual(props.min);
        expect(articlesQuantityBackup).toEqual(props.min + 3);
    });
});
