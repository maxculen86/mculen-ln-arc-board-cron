import get from 'lodash.get';

const aperturaReceta = recetaData => {
    const data = get(recetaData, 'embed.config');
    if (!data) return null;

    return {
        time: data.counterTime,
        portions: data.counterPortion
    };
};

export default aperturaReceta;
