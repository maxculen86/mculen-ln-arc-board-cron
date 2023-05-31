import get from '../../../common/utils/get';

const isAllowedSection = ({
    globalContent,
    listOfAllowedSection = [],
    layout
} = {}) => {
    const id = get(globalContent, '_id', '');
    const sectionId = id.startsWith('/')
        ? id
        : get(globalContent, 'taxonomy.primary_section._id', '');

    return listOfAllowedSection.some(({ section, pageLayout = 'all' } = {}) => {
        const isValidSection = sectionId.startsWith(section);

        if (pageLayout === 'all') {
            return isValidSection;
        }

        return isValidSection && layout === pageLayout;
    });
};

export default isAllowedSection;
