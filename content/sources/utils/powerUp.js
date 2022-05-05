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
    const powerUps = contentElements.filter(e => {
        return e.type === 'custom_embed' && recipeSubtypes.includes(e.subtype);
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
