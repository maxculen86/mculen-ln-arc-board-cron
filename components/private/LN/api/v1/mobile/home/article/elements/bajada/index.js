import get from '../../../../../../../../common/utils/get';

export const getDroptext = article => {
    const dropStory = get(article, 'subheadlines.basic', null);

    const dropEditorial = (
        get(article, 'additionalProperties.description') || ''
    ).trim();

    const dropEditorialValidate =
        dropEditorial.length > 0 ? dropEditorial : null;

    return dropEditorialValidate || dropStory;
};

export default getDroptext;
