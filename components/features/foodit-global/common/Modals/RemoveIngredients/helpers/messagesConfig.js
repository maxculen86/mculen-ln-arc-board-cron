import get from '../../../../../../private/common/utils/get';

const removeIngredientsConfig = {
    recipe: {
        modal: {
            title: 'Eliminar receta',
            description: 'Se sacará del listado de compras.<br />¿Está seguro?'
        },
        toast: {
            title: '¡Listo!',
            description: 'ya no forma parte de tu listado de compras.'
        }
    },
    ingredient: {
        modal: {
            title: 'Eliminar ingrediente',
            description: 'Se sacará de esta receta.<br />¿Está seguro?'
        },
        toast: {
            title: '¡Listo!',
            description: 'ya no forma parte de esta receta.'
        }
    }
};

export const getModalMessages = type =>
    get(removeIngredientsConfig[type], 'modal', {});

export const getToastMessages = type =>
    get(removeIngredientsConfig[type], 'toast', {});
