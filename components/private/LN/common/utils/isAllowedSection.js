import get from '../../../common/utils/get';

const isAllowedSection = ({
    globalContent,
    listOfAllowedSection = [],
    layout,
    noteType = ''
} = {}) => {
    const id = get(globalContent, '_id', '');
    const sectionId = id.startsWith('/')
        ? id
        : get(globalContent, 'taxonomy.primary_section._id', '');

    const defaultValue = 'all';

    return listOfAllowedSection.some(
        ({
            section = defaultValue,
            pageLayout = defaultValue,
            subtype
        } = {}) => {
            const isValidSection = sectionId.startsWith(section);
            const isForAllSections = section === defaultValue;
            const isForAllLayouts = pageLayout === defaultValue;

            if (isForAllSections && isForAllLayouts && subtype === noteType) {
                return subtype === noteType;
            }

            if (isForAllLayouts) {
                return isValidSection;
            }

            if (isForAllSections) {
                return layout === pageLayout;
            }

            return (
                (isValidSection && layout === pageLayout) ||
                (isValidSection && subtype === noteType)
            );
        }
    );
};

export default isAllowedSection;
