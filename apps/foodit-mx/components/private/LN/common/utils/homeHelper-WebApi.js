import get from '../../../common/utils/get';

export const getChildsFromSections = (sectionPosition, renderable = []) =>
    get(renderable, `[${sectionPosition}].children`, []);

export default getChildsFromSections;
