import { useContent } from 'fusion:content';
import { useMemo } from 'react';
import transformMenuData from '../_helpers';
import filterMenuSections from '../../../../../../content/filters/foodit/filterMenuSections';
import isSSR from '../../../../../private/LN/common/utils/isSSR';
import useIsMobile from '../../../hooks/useIsMobile';

export const useNavigationData = () => {
    const isMobile = useIsMobile();

    const response = useContent({
        source: 'navigationSource',
        query: {
            hierarchy: 'header_menu_ejes_foodit',
            website: 'foodit'
        },
        transform: data => ({
            mobileMenu: transformMenuData({ ...data, isMobile: true }),
            desktopMenu: transformMenuData({ ...data, isMobile: false }),
            termicasData: (!isSSR() && data.Termicas) || {}
        }),
        filter: filterMenuSections
    });

    const categories = useMemo(() => {
        if (!response) return null;
        return isMobile ? response.mobileMenu : response.desktopMenu;
    }, [response, isMobile]);

    return {
        categories,
        termicasData: response ? response.termicasData : {}
    };
};
