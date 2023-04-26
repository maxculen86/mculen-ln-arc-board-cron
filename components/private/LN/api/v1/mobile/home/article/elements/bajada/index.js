import get from '../../../../../../../../common/utils/get';

export const getDroptext = article => {
    if (
        ['afondo'].includes(
            get(article, 'informationBox.sectionAliasMobile', null)
        )
    ) {
        return null;
    }

    return get(article, 'subheadlines.basic', null);
};

export default getDroptext;
