export const transformObjectToText = ({ text = '', sections = [] }) => {
    if (!sections.length) return '';

    const sectionDetails = sections
        .map(({ items = [], titleList = '' }) => {
            const itemsText = items.length
                ? items
                      .map(
                          ({ fullIngredientString = '' }) =>
                              `\t-${fullIngredientString}`
                      )
                      .join('\n')
                : '';

            return titleList ? `\t${titleList}:\n${itemsText}` : itemsText;
        })
        .join('\n\n');

    return `${text}\n\n${sectionDetails}`;
};

export const copyListToClipboard = async shoppingList => {
    const text = shoppingList.reduce(
        (prev, currentList) =>
            `${prev}${transformObjectToText(currentList)}\n\n`,
        ''
    );
    try {
        await navigator.clipboard.writeText(text);
        window.LN.observable.publish('addToast', {
            title: '¡Listo!',
            message: 'Podes enviar el listado que copiaste',
            variant: 'success'
        });
    } catch (error) {
        window.LN.observable.publish('addToast', {
            title: 'Error',
            message: 'No se pude copiar el listado',
            variant: 'danger'
        });
    }
};
