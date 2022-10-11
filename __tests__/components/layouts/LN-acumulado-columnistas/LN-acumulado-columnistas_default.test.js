import LayoutAcumColumnistasDefault from '../../../../components/layouts/LN-acumulado-columnistas/default.jsx';

const props = {
    id: 'LN-acumulado-columnistas',
    isAdmin: false,
    layout: 'LN-acumulado-columnistas',
    arcSite: 'la-nacion-ar'
};

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

describe('Components - Layout - LNAcumuladoColumnistasLayout Default', () => {
    props.children = [[], [], ['MockChild1', 'MockChild2'], []];

    test('Should render correct title', () => {
        const component = LayoutAcumColumnistasDefault(props);

        expect(component).toBeTruthy();
        expect(JSON.stringify(component)).toMatch(
            /Columnas y opinión: política, economía, internacionales y más/gi
        );
        expect(JSON.stringify(component)).toContain(
            'Leé los análisis de los columnistas, periodistas y escritores más destacados de la redacción. ' +
                'Además, descubrí contenidos especializados de nuestros colaboradores. Informate con LA NACION.'
        );
    });
});
