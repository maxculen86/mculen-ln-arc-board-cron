export const transformObjectToText = ({ text = '', sections = [] }) => {
    if (!sections.length) return '';

    const sectionDetails = sections
        .map(section => {
            const itemsText = section.items
                .map(item => {
                    if (section.typeList === 'foodit-ingredientes') {
                        return `\t-${item.fullIngredientString}`;
                    } else {
                        return `\t-${item}`;
                    }
                })
                .join('\n');
            return section.titleList
                ? `\t${section.titleList}:\n${itemsText}`
                : itemsText;
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
