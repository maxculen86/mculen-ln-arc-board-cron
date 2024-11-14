import classNames from 'classnames';
import { useAppContext } from 'fusion:context';
import get from '../../../../../private/common/utils/get';
import { useStickyHeader } from './useStickyHeader';

export const useLayoutHeader = () => {
    const { siteProperties, layout, globalContent } = useAppContext();
    const isOpen =
        get(globalContent, 'content_restrictions.content_code') !== 'cerrada';

    const { layoutsName = {} } = siteProperties || {};
    const { sticky } = useStickyHeader();

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
        layoutsName.FooditChef
    ];

    const layoutsWithoutSearch = [
        layoutsName.FooditHome,
        layoutsName.FooditFichaReceta,
        layoutsName.FooditFichaNota,
        layoutsName.FooditChef
    ];

    const marginByLayouts = {
        [layoutsName.FooditHome]: 'mb-12 mb-40_lg',
        [layoutsName.FooditFichaReceta]: 'mb-12 mb-40_lg',
        [layoutsName.FooditRecipePaywall]: 'mb-12 mb-40_lg',
        [layoutsName.FooditFichaNota]: 'mb-0',
        default: 'mb-40'
    };

    const showSubheaderInSheet = layoutSheets.includes(layout) && isOpen;
    const showSubheaderInLayout = layoutsWithSubheader.includes(layout);

    const shouldHaveExtraPadding = !layoutsWithoutSearch.includes(layout);

    const getSubheaderSearchClasses = () => {
        if (layoutsWithoutSearch.includes(layout)) {
            return sticky
                ? '--show-subheader --show-search'
                : '--hide-subheader --hide-search pointer-events-none';
        }
        return sticky ? '--show-subheader' : '--hide-subheader';
    };

    const classNameHeaderContainer = classNames(
        'z-10 w-100 sticky top-0',
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
