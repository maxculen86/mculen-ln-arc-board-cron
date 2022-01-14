/* eslint-disable prettier/prettier */
import get from '../../../../common/utils/get';

export const extractDataFromContentElements = contentElements => {
    const instructions = [];
    const embedConfigTypeList = 'embed.config.typeList';
    let ingredients = [];
    let nutritionItems = [];
    const nutrition = {};
    let newProperty;

    if (contentElements) {
        const element = contentElements.find(
            e => e.subtype === 'power-up-receta'
        );

        if (element) {
            element.powerUp.forEach(e => {
                get(e, `${embedConfigTypeList}`, '') === 'ingredientes' &&
                    (ingredients = ingredients.concat(e.embed.config.items));

                get(e, `${embedConfigTypeList}`, '') === 'preparacion' &&
                    instructions.push({
                        '@type': 'HowToSection',

                        name:
                            e.embed.config.titleList !== ''
                                ? e.embed.config.titleList
                                : 'Preparación de la receta',

                        itemListElement: e.embed.config.items.map(item => {
                            return {
                                '@type': 'HowToStep',
                                text: item
                            };
                        })
                    });

                get(e, `${embedConfigTypeList}`, '') === 'nutritional-info' &&
                    (nutritionItems =
                        nutritionItems.concat(e.embed.config.items) || []);

                nutritionItems.forEach(item => {
                    newProperty = `${item.value} ${item.unit}`;
                    nutritionInfo.forEach(i => {
                        item.text === i.name &&
                            (nutrition[i.property] = newProperty);
                    });
                });
            });
        }
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

const nutritionInfo = [
    { name: 'Tamaño de porcion', property: 'servingSize' },
    { name: 'Carbohidratos', property: 'carbohydrateContent' },
    { name: 'Proteínas', property: 'proteinContent' },
    { name: 'Grasas', property: 'fatContent' },
    {
        name: 'Grasas saturadas',
        property: 'saturatedFatContent'
    },
    {
        name: 'Grasas insaturadas',
        property: 'unsaturatedFatContent'
    },
    { name: 'Grasas trans', property: 'transFatContent' },
    { name: 'Fibras', property: 'fiberContent' },
    { name: 'Colesterol', property: 'cholesterolContent' },
    { name: 'Sodio', property: 'sodiumContent' },
    { name: 'Azúcar', property: 'sugarContent' },
    { name: 'Calorías', property: 'calories' }
];
