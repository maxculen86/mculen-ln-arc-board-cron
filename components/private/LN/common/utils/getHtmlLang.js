import get from '../../../common/utils/get';

const US_SECTION_PREFIX = '/usa';
const DEFAULT_LANG = 'es';
const US_LANG = 'en';

const getHtmlLang = ({ globalContent } = {}) => {
    const id = get(globalContent, '_id', '');
    const sectionId = id.startsWith('/')
        ? id
        : get(globalContent, 'taxonomy.primary_section._id', '');

    return sectionId.startsWith(US_SECTION_PREFIX) ? US_LANG : DEFAULT_LANG;
};

export default getHtmlLang;
