import get from '../../../../../private/common/utils/get';

const getPrimaryTree = (sections, section, resultSections) => {
    if (section) {
        resultSections.push({
            name: get(section, 'name'),
            path: get(section, 'path')
        });
        const parentId = get(section, 'parent_id');
        if (parentId && parentId !== '/') {
            getPrimaryTree(
                sections,
                sections.find(({ _id: id }) => id === parentId),
                resultSections
            );
        }
    }
};

export default getPrimaryTree;
