import get from '../../../../../../../../common/utils/get';

export const getDroptext = article => {
    const descriptionEditorial = (
        get(article, 'additionalProperties.description') || ''
    ).trim();
    const descriptionEditorialValidate =
        descriptionEditorial.length > 0 ? descriptionEditorial : null;

    if (
        ['afondo'].includes(
            get(article, 'informationBox.sectionAliasMobile', null)
        )
    ) {
        return null;
    }

    return (
        descriptionEditorialValidate || get(article, 'subheadlines.basic', null)
    );
};

export default getDroptext;
