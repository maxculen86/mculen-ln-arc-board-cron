/* eslint-disable prettier/prettier */
import get from '../../../../common/utils/get';
import getBiggestImage from '../../../common/utils/getBiggestImage';

export const extractDataFromContentElements = contentElements => {
    const instructions = [];
    const embedConfigTypeList = 'embed.config.typeList';
    const ingredients = [];
    const nutritionItems = [];
    const nutrition = {};
    let newProperty;

    if (contentElements) {
        const element = contentElements.find(
            e => e.subtype === 'power-up-receta'
        );

        if (element) {
            element.powerUp.forEach(e => {
                get(e, `${embedConfigTypeList}`, '') === 'ingredientes' &&
                    ingredients.push(...e.embed.config.items);

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

                get(e, 'subtype', '') === 'custom-nutrition' &&
                    nutritionItems.push(...e.rows);

                nutritionItems.forEach(item => {
                    newProperty = `${item[1].content}`;
                    nutritionInfo.forEach(i => {
                        if (item[0].content === i.name) {
                            nutrition[i.property] = newProperty;
                        }
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

export const extractDataFromPromoItems = (promoItems, PLACERHOLDER) => {
    let cookTime = '';
    let counterPortion = '';
    let counterTime = '';
    let image = {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        url: PLACERHOLDER,
        height: '800',
        width: '1200'
    };
    let prepTime = '';

    if (promoItems) {
        const { basic = {}, receta } = promoItems;
        const { type, url, height, width } = basic;
        const { bigWidth, bigHeight } = getBiggestImage(basic);

        if (type === 'image') {
            image = {
                ...image,
                url,
                height: bigHeight ? `${bigHeight}` : `${height}`,
                width: bigWidth ? `${bigWidth}` : `${width}`
            };
        }

        if (receta) {
            if (
                receta.subtype === 'custom-detalle-receta' &&
                get(receta, 'embed.config.title', '') === 'detalle-receta'
            ) {
                counterTime = get(receta, 'embed.config.counterTime', '');
                counterPortion = get(receta, 'embed.config.counterPortion', '');
                cookTime = get(receta, 'embed.config.cookTime', '');
                prepTime = get(receta, 'embed.config.prepTime', '');
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
