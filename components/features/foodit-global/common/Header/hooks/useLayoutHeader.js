import { cx } from '@ln/cva';
import { useAppContext } from 'fusion:context';

const DEFAULT_MARGIN = 'mb-12 mb-40_lg';
export const useLayoutHeader = () => {
    const { siteProperties, layout } = useAppContext();

    const { layoutsName = {} } = siteProperties || {};

    const marginByLayouts = {
        [layoutsName.FooditHome]: DEFAULT_MARGIN,
        [layoutsName.FooditFichaReceta]: DEFAULT_MARGIN,
        [layoutsName.FooditRecipePaywall]: DEFAULT_MARGIN,
        [layoutsName.FooditFichaNota]: 'mb-0',
        [layoutsName.FooditNotePaywall]: 'mb-0',
        default: 'mb-40'
    };

    const classNameHeaderContainer = cx(
        'z-15 w-100 sticky top-0 print-hide',
        marginByLayouts[layout] || marginByLayouts.default
    );

    return {
        classNameHeaderContainer
    };
};
