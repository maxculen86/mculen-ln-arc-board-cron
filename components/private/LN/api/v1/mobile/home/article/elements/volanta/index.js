import get from '../../../../../../../../common/utils/get';

export const getFlyertext = article => {
    const { label } = article;
    const flyerEditorial = get(article, 'additionalProperties.lead', null);
    const flyerArticle = get(label, 'volanta.text', null);
    if (
        ['afondo'].includes(
            get(article, 'informationBox.sectionAliasMobile', null)
        )
    ) {
        return flyerEditorial || flyerArticle;
    }

    return flyerArticle || flyerEditorial;
};

export default getFlyertext;
