const powerUp = contentElements => {
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
    const powerUps = contentElements.filter(e => {
        return e.type === 'custom_embed';
    });

    return {
        type: 'custom_embed',
        subtype: 'power-up-receta',
        powerUp: powerUps
    };
};

export default powerUp;
