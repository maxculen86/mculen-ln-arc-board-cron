import { addElementByPosition } from '../../../../../../../../../components/private/LN/api/global/page/common/utils/addElements';
describe('addElementByPosition', () => {
    // it('should add an element to the start of the array', () => {
    //     const elements = [{ id: 1 }, { id: 2 }, { id: 3 }];
    //     const typeElement = 'banner';
    //     const configElements = {
    //         0: { position: 'start', id: 4 },
    //     };
    //     const result = addElementByPosition(elements, typeElement, configElements);
    //     expect(result).toEqual([
    //         { id: 1 },
    //         { id: 2 },
    //         { id: 4, position: 'start' },
    //         { id: 3 },
    //     ]);
    // });

    // it('should add an element to the bottom of the array', () => {
    //     const elements = [{ id: 1 }, { id: 2 }, { id: 3 }];
    //     const typeElement = 'banner';
    //     const configElements = {
    //         2: { position: 'bottom', id: 4 },
    //     };
    //     const result = addElementByPosition(elements, typeElement, configElements);
    //     expect(result).toEqual([
    //         { id: 4, position: 'bottom' },
    //         { id: 1 },
    //         { id: 2 },
    //         { id: 3 },
    //     ]);
    // });

    it('should not modify the original array if an invalid index is given', () => {
        const elements = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const typeElement = 'banner';
        const configElements = {
            3: { position: 'start', id: 4 }
        };
        const result = addElementByPosition(
            elements,
            typeElement,
            configElements
        );
        expect(result).toEqual(elements);
    });

    it('should not modify the original array if no configuration is given', () => {
        const elements = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const typeElement = 'banner';
        const result = addElementByPosition(elements, typeElement, undefined);
        expect(result).toEqual(elements);
    });

    it('should not modify the original array if the configuration is not an object', () => {
        const elements = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const typeElement = 'banner';
        const configElements = 'invalid configuration';
        const result = addElementByPosition(
            elements,
            typeElement,
            configElements
        );
        expect(result).toEqual(elements);
    });

    it('should not modify the original array if the array is empty', () => {
        const elements = [];
        const typeElement = 'banner';
        const configElements = {
            0: { position: 'start', id: 4 }
        };
        const result = addElementByPosition(
            elements,
            typeElement,
            configElements
        );
        expect(result).toEqual(elements);
    });

    it('should not modify the original array if the element to add is not provided', () => {
        const elements = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const typeElement = 'banner';
        const configElements = {
            0: { position: 'start' }
        };
        const result = addElementByPosition(
            elements,
            typeElement,
            configElements
        );
        expect(result).toEqual(elements);
    });
});
