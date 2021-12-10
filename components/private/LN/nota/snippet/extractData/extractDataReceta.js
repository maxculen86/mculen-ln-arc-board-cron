/* eslint-disable prettier/prettier */
import get from '../../../../common/utils/get';

export const extractDataFromContentElements = contentElements => {
    let ingredients = [];
    let instructions = [];
    let nutrition = [];

    if (contentElements) {
        const element = contentElements.find(
            e => e.subtype === 'power-up-receta'
        );

        if (element) {
            element.powerUp.forEach(e => {
                get(e, 'embed.config.typeList', '') === 'ingredientes' &&
                    (ingredients = ingredients.concat(e.embed.config.items));

                get(e, 'embed.config.typeList', '') === 'preparacion' &&
                    instructions.push({
                        '@type': 'HowToSection',

                        name: e.embed.config.titleList,

                        itemListElement: e.embed.config.items.map(item => {
                            return {
                                '@type': 'HowToStep',
                                text: item
                            };
                        })
                    });

                get(e, 'embed.config.typeList', '') === 'nutritional-info' &&
                    (nutrition = nutrition.concat(e.embed.config.items));
            });
        }
    }

    let obj = new Object();
    let newProperty;
    nutrition.forEach(item => {
        newProperty = `${item.value} ${item.unit}`;
        item.text === 'Tamaño de porcion' && (obj.servingSize = newProperty);
        item.text === 'Carbohidratos' &&
            (obj.carbohydrateContent = newProperty);
        item.text === 'Proteínas' && (obj.proteinContent = newProperty);
        item.text === 'Grasas' && (obj.fatContent = newProperty);
        item.text === 'Grasas saturadas' &&
            (obj.saturatedFatContent = newProperty);
        item.text === 'Grasas insaturadas' &&
            (obj.unsaturatedFatContent = newProperty);
        item.text === 'Grasas trans' && (obj.transFatContent = newProperty);
        item.text === 'Fibras' && (obj.fiberContent = newProperty);
        item.text === 'Colesterol' && (obj.cholesterolContent = newProperty);
        item.text === 'Sodio' && (obj.sodiumContent = newProperty);
        item.text === 'Azúcar' && (obj.sugarContent = newProperty);
        item.text === 'Calorías' && (obj.calories = newProperty);
    });

    return {
        ingredients,
        instructions,
        nutrition: obj
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
