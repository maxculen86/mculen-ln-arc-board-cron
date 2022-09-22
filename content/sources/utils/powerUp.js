import get from '../../../components/private/common/utils/get';

export const recipePowerUps = contentElements => {
    const powerUps = powerUpsJoin(contentElements);
    const newContentElements = contentElements.filter(e => {
        return e.type !== 'custom_embed';
    });
    if (powerUps.powerUp.length) {
        newContentElements.splice(0, 0, powerUps);
    }
    return newContentElements;
};

const powerUpsJoin = contentElements => {
    const recipeSubtypes = [
        'custom-ingrediente',
        'custom-preparacion',
        'custom-nutrition'
    ];
    let powerUps = contentElements.filter(e => {
        return e.type === 'custom_embed' && recipeSubtypes.includes(e.subtype);
    });

    powerUps = powerUps.map(element => {
        const typeList = get(element, 'embed.config.typeList', '');
        if (typeList === 'nutritional-info') {
            return recipeTableConvert(element);
        }
        return element;
    });

    return {
        type: 'custom_embed',
        subtype: 'power-up-receta',
        powerUp: powerUps
    };
};

export const removeParallaxPowerUp = contentElements => {
    return contentElements.filter(
        content =>
            content.type !== 'custom_embed' ||
            content.subtype !== 'custom-parallax'
    );
};

export const recipeTableConvert = (data = {}) => {
    const { _id = '', subtype = '', type = '' } = data;
    const items = get(data, 'embed.config.items', []);
    const typeList = get(data, 'embed.config.typeList', '');

    if (!data || typeList !== 'nutritional-info') return null;

    return {
        _id,
        subtype,
        type,
        typeList,
        header: [
            { _id: 'nutritional-info-property', content: 'Propiedad' },
            {
                _id: 'nutritional-info-ammount',
                content: 'Cantidad por porción'
            }
        ],
        rows: items
            .filter(item => item.value)
            .map(item => {
                return [
                    { content: item.text },
                    { content: `${item.value} ${item.unit}` }
                ];
            })
    };
};
