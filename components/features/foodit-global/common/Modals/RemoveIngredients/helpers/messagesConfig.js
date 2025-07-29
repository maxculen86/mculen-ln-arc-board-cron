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
    },
    menu: {
        modal: {
            title: 'Eliminar receta',
            description: 'Se eliminará del menú semanal.<br />¿Está seguro?'
        },
        toast: {
            title: '¡Listo!',
            description: 'Se quitó del menú semanal.'
        }
    },
    bookmark: {
        modal: {
            title: 'Eliminar nota/receta',
            description: 'Se sacará de la colección.<br />¿Está seguro?'
        },
        toast: {
            title: '¡Listo!',
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
                    : 'Eliminar receta'
        };
    }

    return messages;
};

export const getToastMessages = type =>
    get(removeIngredientsConfig[type], 'toast', {});
