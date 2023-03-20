import get from '../../../../../../../common/utils/get';

export const CardAnexo = article => {
    const url = get(article[0], 'url', null);
    const alto = get(article[0], 'alto', null);
    if (url && alto) return [{ src: url, url, alto }];
    // TODO: Reemplazar cuando Mobile confirme la adaptacion para recibir html
    return null;
    // if (url) return null;
    // return [{ src: get(article[0], 'html') }];
};

export default CardAnexo;
