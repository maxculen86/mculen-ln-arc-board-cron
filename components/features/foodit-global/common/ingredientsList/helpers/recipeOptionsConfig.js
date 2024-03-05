export const recipeOptionsConfig = [
    {
        icon: 'copy',
        text: 'Copiar',
        onClick: () =>
            // TODO: agregar funcion para copiar la receta
            window.LN.observable.publish('addToast', {
                title: '¡Listo!',
                message: 'Podes enviar el listado que copiaste',
                variant: 'success'
            }),
        variant: 'default',
        type: 'button'
    },
    {
        icon: 'delete',
        text: 'Eliminar',
        onClick: recipe =>
            // TODO: agregar funcion para eliminar la receta
            window.LN.observable.publish('showModalIngredient', {
                show: true,
                data: {
                    type: 'recipe',
                    displayName: recipe
                }
            }),
        variant: 'danger',
        type: 'button'
    }
];
