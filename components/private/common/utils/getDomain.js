import { SITE_LANACION, SITE_RECETAS } from 'fusion:environment';

function isRecipesTemplate(_id, websiteUrl) {
    return _id === '/recetas' || websiteUrl.includes('/recetas');
}

const getDomain = (globalContent = {}) => {
    const { _id = '', website_url: websiteUrl = '' } = globalContent;
    const domain = isRecipesTemplate(_id, websiteUrl)
        ? SITE_RECETAS
        : SITE_LANACION;
    // Si viene con "/" al final, la saco
    return domain && domain.replace(/\/$/, '');
};

export default getDomain;
