import { useContent } from 'fusion:content';
import { useState } from 'react';
import { getTypeOfDevicev2 } from '@ln/utils';
import transformMenuData from '../_helpers';
import filterMenuSections from '../../../../../../content/filters/foodit/filterMenuSections';
import isSSR from '../../../../../private/LN/common/utils/isSSR';

export const useNavigationData = () => {
    const [isMobile] = useState(() => {
        if (isSSR()) return false;
        return getTypeOfDevicev2({ breakpoints: { mobile: 768 } }) === 'mobile';
    });

    const response = useContent({
        source: 'navigationSource',
        query: {
            hierarchy: 'header_menu_ejes_foodit',
            website: 'foodit'
        },
        transform: data => {
            const transformedData = transformMenuData({ ...data, isMobile });
            const processedTermicas = (!isSSR() && data.Termicas) || {};
            return { transformedData, termicasData: processedTermicas };
        },
        filter: filterMenuSections
    });

    const categories = response ? response.transformedData : null;
    const termicasData = response ? response.termicasData : {};

    return { categories, termicasData };
};
