import postIngredientsList from '../../../common/shoppingList/api/postIngredientsList';

export const saveIngredientsList = async ({ text, sections, id }) => {
    const response = await postIngredientsList({ text, sections, id });

    if (response && response.bookmarkId) {
        window.LN.observable.publish('addToast', {
            variant: 'success',
            title: 'Guardado!',
            message: `Los ingredientes han sido añadidos a la lista de compras`
        });
    } else {
        window.LN.observable.publish('addToast', {
            variant: 'danger',
            title: 'Error!',
            message: `No se a podido añadir los ingredientes a la lista de compras`
        });
    }
};
