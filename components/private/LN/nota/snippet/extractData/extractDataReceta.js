import get from '../../../../common/utils/get';

export const extractDataFromContentElements = contentElements => {
    let ingredientes = [];
    let preparaciones = [];

    if (contentElements) {
        contentElements.forEach(element => {
            if (element.subtype === 'power-up-receta') {
                element.powerUp.forEach(powerUpReceta => {
                    get(powerUpReceta, 'embed.config.typeList') ===
                        'ingredientes' &&
                        (ingredientes = ingredientes.concat(
                            powerUpReceta.embed.config.items
                        ));

                    get(powerUpReceta, 'embed.config.typeList') ===
                        'preparacion' &&
                        (preparaciones = preparaciones.concat(
                            powerUpReceta.embed.config.items
                        ));
                });
            }
        });
    }

    return {
        ingredientes,
        preparaciones
    };
};

export const extractDataFromCredits = by => {
    let autores = [];
    if (by) {
        autores = by
            .filter(v => v.type === 'author')
            .map(v => v.name.replace(/[^a-zA-Z ]+/g, ''))
            .join(', ');
    }

    return { autores };
};

export const extractDataFromPromoItems = promoItems => {
    let counterTime = '';
    let counterPortion = '';
    let image;

    if (promoItems) {
        const { basic } = promoItems;
        const { type, url } = basic || {};
        if (type === 'image') {
            image = url;
        }

        if (promoItems.receta) {
            if (
                promoItems.receta.subtype === 'custom-detalle-receta' &&
                get(promoItems.receta, 'embed.config.title') ===
                    'detalle-receta'
            ) {
                counterTime = get(
                    promoItems.receta,
                    'embed.config.counterTime',
                    ''
                );
                counterPortion = get(
                    promoItems.receta,
                    'embed.config.counterPortion',
                    ''
                );
            }
        }
    }

    return {
        image,
        counterTime,
        counterPortion
    };
};

export const extractDataFromTags = tags => {
    let keywords = '';
    if (tags) {
        keywords = tags.map(tag => tag.description).join(', ');
    }

    return { keywords };
};

export const extractDataFromTaxonomy = taxonomySections => {
    const tipoDeCocina = taxonomySections.map(section => section.name);

    return {
        tipoDeCocina
    };
};
