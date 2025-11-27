import { getMainPaddingClass } from '../../../../../../components/features/foodit-global/common/BaseLayout/helper';

describe('getMainPaddingClass', () => {
    const layoutsName = {
        FooditHome: 'Foodit-home',
        FooditFichaReceta: 'Foodit-ficha-receta',
        FooditRecipePaywall: 'Foodit-recipe-paywall',
        Foodit404: 'Foodit-404',
        FooditFichaNota: 'Foodit-ficha-nota',
        FooditNotePaywall: 'Foodit-note-paywall',
        FooditBuscador: 'Foodit-buscador'
    };

    const mainPadding = 'pt-185 pt-193_md pt-174_lg';
    const notePadding = 'pt-170 pt-130_lg';
    const buscadorPadding = 'pt-170';
    const defaultPadding = 'pt-213 pt-174_lg';

    it('return mainPadding for home, recipe, paywall-recipe and 404', () => {
        expect(getMainPaddingClass('Foodit-home', layoutsName)).toBe(
            mainPadding
        );
        expect(getMainPaddingClass('Foodit-ficha-receta', layoutsName)).toBe(
            mainPadding
        );
        expect(getMainPaddingClass('Foodit-recipe-paywall', layoutsName)).toBe(
            mainPadding
        );
        expect(getMainPaddingClass('Foodit-404', layoutsName)).toBe(
            mainPadding
        );
    });

    it('return notePadding for note layouts', () => {
        expect(getMainPaddingClass('Foodit-ficha-nota', layoutsName)).toBe(
            notePadding
        );
        expect(getMainPaddingClass('Foodit-note-paywall', layoutsName)).toBe(
            notePadding
        );
    });

    it('return padding for buscador', () => {
        expect(getMainPaddingClass('Foodit-buscador', layoutsName)).toBe(
            buscadorPadding
        );
    });

    it('retunr defaultPadding when the layout is recetario, lista de compras, menu semanal', () => {
        expect(getMainPaddingClass('layout-inexistente', layoutsName)).toBe(
            defaultPadding
        );
    });
    it('returns defaultPadding for layouts that are not explicitly mapped', () => {
        const defaultLayouts = [
            'Foodit-menu-semanal',
            'Foodit-subcategorias',
            'Foodit-compras',
            'Foodit-recetario',
            'Foodit-acumulado-chef',
            'Foodit-chef',
            'Foodit-acumulado'
        ];

        defaultLayouts.forEach(layout => {
            expect(getMainPaddingClass(layout, layoutsName)).toBe(
                defaultPadding
            );
        });
    });
});
