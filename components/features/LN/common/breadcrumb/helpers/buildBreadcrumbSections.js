import get from '../../../../../private/common/utils/get';
import getPrimaryTree from './getPrimaryTree';

const findSectionById = (sections, id) =>
    sections && sections.find(section => get(section, '_id') === id);

const findFirstValidSection = sections =>
    sections && sections.find(section => get(section, 'name'));

const resolvePrimarySection = (primarySection, sections) => {
    const id = get(primarySection, '_id');
    const name = get(primarySection, 'name');

    if (id && name) {
        return primarySection;
    }

    return (
        (id && findSectionById(sections, id)) || findFirstValidSection(sections)
    );
};

const buildBreadcrumbSections = ({ sections, primarySection, siteTitle }) => {
    const allSections = [];
    const effectivePrimarySection = resolvePrimarySection(
        primarySection,
        sections
    );

    if (effectivePrimarySection) {
        getPrimaryTree(sections, effectivePrimarySection, allSections);
    }

    allSections.push({
        name: siteTitle,
        path: '/'
    });

    return allSections
        .filter(section => section.name && section.name.trim() !== '')
        .reverse();
};

export default buildBreadcrumbSections;
