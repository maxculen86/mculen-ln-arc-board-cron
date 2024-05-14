import get from '../../../../../../../../common/utils/get';

export const getFlyertext = article => {
    const { label } = article;
    const flyerEditorial = (
        get(article, 'additionalProperties.lead') || ''
    ).trim();
    const flyerEditorialValidate =
        flyerEditorial.length > 0 ? flyerEditorial : null;
    const flyerArticle = (get(label, 'volanta.text') || '').trim();
    const flyerArticleValidate = flyerArticle.length > 0 ? flyerArticle : null;
    if (
        ['afondo'].includes(
            get(article, 'informationBox.sectionAliasMobile', null)
        )
    ) {
        return (
            flyerEditorialValidate ||
            flyerArticleValidate ||
            ''
        ).toUpperCase();
    }

    return flyerEditorialValidate || flyerArticleValidate;
};

export default getFlyertext;
