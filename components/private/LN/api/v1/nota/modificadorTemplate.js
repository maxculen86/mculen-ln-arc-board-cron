import get from 'lodash.get';

const modificadorTemplate = dataArticle => {
    const distribuitor = get(dataArticle, 'distributor');
    if (!distribuitor || distribuitor.name.toLowerCase() === 'lanacionar')
        return null;

    const resp = {
        descripcion: distribuitor.name,
        id: distribuitor.reference_id
    };
    return resp;
};

export default modificadorTemplate;
