import get from '../../../../../../private/common/utils/get';

const REMOVE_RECIPE_TITLE = 'Eliminar receta';
const READY_TITLE = '¡Listo!';

const removeIngredientsConfig = {
    recipe: {
        modal: {
            title: REMOVE_RECIPE_TITLE,
            description: 'Se sacará del listado de compras.<br />¿Está seguro?'
        },
        toast: {
            title: READY_TITLE,
            description: 'ya no forma parte de tu listado de compras.'
        }
    },
    ingredient: {
        modal: {
            title: 'Eliminar ingrediente',
            description: 'Se sacará de esta receta.<br />¿Está seguro?'
        },
        toast: {
            title: READY_TITLE,
            description: 'ya no forma parte de esta receta.'
        }
    },
    menu: {
        modal: {
            title: REMOVE_RECIPE_TITLE,
            description: 'Se eliminará del menú semanal.<br />¿Está seguro?'
        },
        toast: {
            title: READY_TITLE,
            description: 'Se quitó del menú semanal.'
        }
    },
    bookmark: {
        modal: {
            title: 'Eliminar nota/receta',
            description: 'Se sacará de la colección.<br />¿Está seguro?'
        },
        toast: {
            title: READY_TITLE,
            description: 'Se quitó de tu colección.'
        }
    }
};

export const getModalMessages = (type, bookmarkInfo = null) => {
    const messages = get(removeIngredientsConfig[type], 'modal', {});

    if (type === 'bookmark' && bookmarkInfo?.variant) {
        return {
            ...messages,
            title:
                bookmarkInfo.variant === 'note'
                    ? 'Eliminar nota'
                    : REMOVE_RECIPE_TITLE
        };
    }

    return messages;
};

export const getToastMessages = type =>
    get(removeIngredientsConfig[type], 'toast', {});
