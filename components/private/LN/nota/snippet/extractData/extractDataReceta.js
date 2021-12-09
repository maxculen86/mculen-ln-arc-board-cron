import get from '../../../../common/utils/get';

export const extractDataFromContentElements = contentElements => {
    let ingredients = [];
    let instructions = [];
    let nutrition = [];

    if (contentElements) {
        const element = contentElements.find(
            e => e.subtype === 'power-up-receta'
        );
        element.powerUp.forEach(e => {
            get(e, 'embed.config.typeList', '') === 'ingredientes' &&
                (ingredients = ingredients.concat(e.embed.config.items));
            get(e, 'embed.config.typeList', '') === 'preparacion' &&
                (instructions = instructions.concat(e.embed.config.items));
            get(e, 'embed.config.typeList', '') === 'nutritional-info' &&
                (nutrition = nutrition.concat(e.embed.config.items));
        });
    }

    return {
        ingredients,
        instructions,
        nutrition
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
    let cookTime = '';
    let counterPortion = '';
    let counterTime = '';
    let image;
    let prepTime = '';

    if (promoItems) {
        const { basic } = promoItems;
        const { type, url } = basic || {};
        if (type === 'image') {
            image = url;
        }

        if (promoItems.receta) {
            if (
                promoItems.receta.subtype === 'custom-detalle-receta' &&
                get(promoItems.receta, 'embed.config.title', '') ===
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
                cookTime = get(promoItems.receta, 'embed.config.cookTime', '');
                prepTime = get(promoItems.receta, 'embed.config.prepTime', '');
            }
        }
    }

    return {
        cookTime,
        counterPortion,
        counterTime,
        image,
        prepTime
    };
};

export const extractDataFromTags = tags => {
    let keywords = '';
    if (tags) {
        keywords = tags.map(tag => tag.description).join(', ');
    }

    return { keywords };
};
