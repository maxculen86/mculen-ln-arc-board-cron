import get from '../../../../../../common/utils/get';

const aperturaReceta = recetaData => {
    const data = get(recetaData, 'embed.config', null);
    if (!data) return null;

    return {
        tiempo: data.counterTime,
        porciones: data.counterPortion
    };
};

export default aperturaReceta;
