import {
    copyListToClipboard,
    transformObjectToText
} from '../../../../../../components/features/foodit-global/common/shoppingList/_helpers';

describe('transformObjectToText', () => {
    it('should correctly transform a simple object to text', () => {
        const sampleObject = {
            text: 'Lista de Compras',
            sections: [
                {
                    titleList: 'Frutas',
                    typeList: 'foodit-ingredientes',
                    items: [
                        { fullIngredientString: 'Manzana - 1 kg' },
                        { fullIngredientString: 'Banana - 2 kg' }
                    ]
                },
                {
                    titleList: 'Especias',
                    items: [
                        { fullIngredientString: 'Sal' },
                        { fullIngredientString: 'Pimienta' }
                    ]
                }
            ]
        };

        const expectedText = `Lista de Compras\n\n\tFrutas:\n\t-Manzana - 1 kg\n\t-Banana - 2 kg\n\n\tEspecias:\n\t-Sal\n\t-Pimienta`;
        expect(transformObjectToText(sampleObject)).toEqual(expectedText);
    });

    it('should handle objects without sections or text gracefully', () => {
        const sampleObject = {};
        const expectedText = '';
        expect(transformObjectToText(sampleObject)).toEqual(expectedText);
    });
});

describe('copyListToClipboard', () => {
    beforeEach(() => {
        global.navigator.clipboard = { writeText: jest.fn() };
        global.window.LN = { observable: { publish: jest.fn() } };
    });

    it('should call clipboard.writeText with correct text', async () => {
        const shoppingList = [{ text: 'Lista de Compras', sections: [] }];
        await copyListToClipboard(shoppingList);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('\n\n');
    });

    it('should publish success message on successful copy', async () => {
        const shoppingList = [{ text: 'Lista de Compras', sections: [] }];
        await copyListToClipboard(shoppingList);

        expect(window.LN.observable.publish).toHaveBeenCalledWith('addToast', {
            message: 'Podes enviar el listado que copiaste',
            title: '¡Listo!',
            variant: 'success'
        });
    });

    it('should publish error message on clipboard write failure', async () => {
        navigator.clipboard.writeText.mockRejectedValue(
            new Error('Failed to copy')
        );
        const shoppingList = [{ text: 'Lista de Compras', sections: [] }];
        await copyListToClipboard(shoppingList);

        expect(window.LN.observable.publish).toHaveBeenCalledWith('addToast', {
            message: 'No se pude copiar el listado',
            title: 'Error',
            variant: 'danger'
        });
    });
});
