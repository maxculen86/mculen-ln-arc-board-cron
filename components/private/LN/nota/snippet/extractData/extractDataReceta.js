/* eslint-disable prettier/prettier */
import get from '../../../../common/utils/get';
import { adjustImageDimensions } from '../../../common/utils/adjustImageDimensions';
import getBiggestImage from '../../../common/utils/getBiggestImage';
import { updateResizedUrl } from '../../../common/utils/updateResizedUrl';

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

const processIngredients = (powerUpElement, ingredients) => {
    const embedConfigTypeList = 'embed.config.typeList';
    if (get(powerUpElement, embedConfigTypeList, '') === 'ingredientes') {
        ingredients.push(...powerUpElement.embed.config.items);
    }
};

const processInstructions = (powerUpElement, instructions) => {
    const embedConfigTypeList = 'embed.config.typeList';
    if (get(powerUpElement, embedConfigTypeList, '') === 'preparacion') {
        const sectionName =
            powerUpElement.embed.config.titleList !== ''
                ? powerUpElement.embed.config.titleList
                : 'Preparación de la receta';

        instructions.push({
            '@type': 'HowToSection',
            name: sectionName,
            itemListElement: powerUpElement.embed.config.items.map(item => ({
                '@type': 'HowToStep',
                text: item
            }))
        });
    }
};

const processNutritionItems = (powerUpElement, nutritionItems) => {
    if (get(powerUpElement, 'subtype', '') === 'custom-nutrition') {
        nutritionItems.push(...powerUpElement.rows);
    }
};

const buildNutritionObject = nutritionItems => {
    const nutrition = {};

    nutritionItems.forEach(item => {
        const value = `${item[1].content}`;
        const itemName = item[0].content;

        const matchedInfo = nutritionInfo.find(i => i.name === itemName);
        if (matchedInfo) {
            nutrition[matchedInfo.property] = value;
        }
    });

    return nutrition;
};

export const extractDataFromContentElements = contentElements => {
    const instructions = [];
    const ingredients = [];
    const nutritionItems = [];

    if (!contentElements) {
        return {
            ingredients,
            instructions,
            nutrition: {}
        };
    }

    const element = contentElements.find(e => e.subtype === 'power-up-receta');

    if (!element) {
        return {
            ingredients,
            instructions,
            nutrition: {}
        };
    }

    element.powerUp.forEach(powerUpElement => {
        processIngredients(powerUpElement, ingredients);
        processInstructions(powerUpElement, instructions);
        processNutritionItems(powerUpElement, nutritionItems);
    });

    const nutrition = buildNutritionObject(nutritionItems);

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
            .map(v => v.name)
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
        const { newWidth, newHeight } = adjustImageDimensions(
            bigWidth,
            bigHeight
        );
        const newResizedUrl = updateResizedUrl(url, newWidth, newHeight);

        if (type === 'image') {
            image = {
                ...image,
                url: newResizedUrl || url,
                height: newHeight || height,
                width: newWidth || width
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
