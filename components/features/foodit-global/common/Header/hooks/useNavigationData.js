import { useContent } from 'fusion:content';
import transformMenuData from '../_helpers';
import filterMenuSections from '../../../../../../content/filters/foodit/filterMenuSections';

export const useNavigationData = () => {
    const response = useContent({
        source: 'navigationSource',
        query: {
            hierarchy: 'header_menu_foodit',
            website: 'foodit'
        },
        transform: data => {
            const transformedData = transformMenuData(data);
            const termicasData = data.Termicas || {};
            return { transformedData, termicasData };
        },
        filter: filteredResponse => {
            const { transformedData } = filteredResponse;
            return filterMenuSections(transformedData);
        }
    });

    const categories = response ? response.transformedData : null;
    const termicasData = response ? response.termicasData : {};

    return { categories, termicasData };
};
