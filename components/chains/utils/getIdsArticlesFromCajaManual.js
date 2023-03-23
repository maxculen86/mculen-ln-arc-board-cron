import get from '../../private/common/utils/get';

const getIdsArticlesFromCajaManual = (renderables = []) => {
    const cajaManualFeatures =
        renderables.filter(
            ren => ren.collection === 'chains' && ren.type === 'Ln_Caja_Manual'
        ) || [];

    const articlesIds = [];

    cajaManualFeatures.forEach(caja => {
        const { children = [] } = caja;
        children.forEach(child => {
            const { props = {} } = child;
            articlesIds.push(get(props, 'customFields.noteId', ''));
        });
    });
    return articlesIds.filter(id => id !== '');
};

export default getIdsArticlesFromCajaManual;
