import classNames from 'classnames';
import { useAppContext } from 'fusion:context';
import get from '../../../../../private/common/utils/get';
import { useStickyHeader } from './useStickyHeader';
import useGetUserConfig from '../../../hooks/useGetUserConfig';

const DEFAULT_MARGIN = 'mb-12 mb-40_lg';
export const useLayoutHeader = () => {
    const { siteProperties, layout, globalContent } = useAppContext();
    const isOpen =
        get(globalContent, 'content_restrictions.content_code') !== 'cerrada';

    const { layoutsName = {} } = siteProperties || {};
    const { sticky } = useStickyHeader();
    const { isSubscribed } = useGetUserConfig();

    const layoutSheets = [
        layoutsName.FooditFichaReceta,
        layoutsName.FooditFichaNota
    ];

    const layoutsWithSubheader = [
        layoutsName.FooditHome,
        layoutsName.FooditFichaReceta,
        layoutsName.FooditFichaNota,
        layoutsName.FooditRecetario,
        layoutsName.FooditAcumulado,
        layoutsName.FooditListadoCompras,
        layoutsName.FooditAcumuladoChef,
        layoutsName.FooditRecipePaywall,
        layoutsName.FooditChef,
        layoutsName.FooditMenuSemanal
    ];

    const layoutsWithoutSearch = [
        layoutsName.FooditHome,
        layoutsName.FooditFichaReceta,
        layoutsName.FooditFichaNota,
        layoutsName.FooditChef
    ];

    const marginByLayouts = {
        [layoutsName.FooditHome]: DEFAULT_MARGIN,
        [layoutsName.FooditFichaReceta]: DEFAULT_MARGIN,
        [layoutsName.FooditRecipePaywall]: DEFAULT_MARGIN,
        [layoutsName.FooditFichaNota]: 'mb-0',
        default: 'mb-40'
    };

    const showSubheaderInSheet = layoutSheets.includes(layout) && isOpen;
    const showSubheaderInLayout = layoutsWithSubheader.includes(layout);
    const shouldHaveExtraPadding = !layoutsWithoutSearch.includes(layout);

    const getSubheaderSearchClasses = () => {
        const SHOW_CLASS = '--show-subheader --show-search';
        const HIDE_CLASS = '--hide-subheader --hide-search';
        const withoutSearch = layoutsWithoutSearch.includes(layout);

        if (!withoutSearch && !isSubscribed) {
            return sticky ? SHOW_CLASS : '';
        }
        if (!isSubscribed) {
            return sticky ? SHOW_CLASS : '--hide-search';
        }
        if (withoutSearch) {
            return sticky ? SHOW_CLASS : HIDE_CLASS;
        }
        return sticky ? '--show-subheader' : '--hide-subheader';
    };

    const classNameHeaderContainer = classNames(
        'z-15 w-100 sticky top-0 print-hide',
        marginByLayouts[layout] || marginByLayouts.default,
        getSubheaderSearchClasses(),
        shouldHaveExtraPadding && '--extra-padding'
    );

    return {
        classNameHeaderContainer,
        showSubheaderInLayout,
        showSubheaderInSheet
    };
};
