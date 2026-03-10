import { useContent } from 'fusion:content';
import get from '../../../../private/common/utils/get';
import { isPrimarySection } from '../_helpers';

const useNavigationCategories = (options = {}) => {
    const {
        globalContent,
        hierarchyManual,
        hideCategories = 'false',
        website,
        filter
    } = options;

    const sectionId = get(globalContent, '_id', '');
    const childrenFromContent = get(globalContent, 'children', null);

    const shouldFetch = Boolean(hierarchyManual);

    const navigationList = useContent({
        source: shouldFetch ? 'navigationSource' : undefined,
        query: shouldFetch
            ? { hierarchy: hierarchyManual, website }
            : undefined,
        filter
    });

    const response = get(navigationList, 'children', null);
    const navData =
        (response && response.length && response) || childrenFromContent;

    const navigation = hideCategories === 'false' ? navData : null;

    return {
        navigation,
        isPrimarySection: isPrimarySection(sectionId)
    };
};

export default useNavigationCategories;
