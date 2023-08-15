import {
    isFotoAl100orStorytelling,
    Subtypes,
    subtypeNotesWithoutAmp
} from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('Private - Common - Utils - subtypes - subtypeHelper', () => {
    const negativeSubtypes = Subtypes.filter(
        subtype => subtype.id !== '8' && subtype.id !== '4'
    );
    const positiveSubtypes = Subtypes.filter(
        subtype => subtype.id === '8' || subtype.id === '4'
    );

    describe('Testing subtypes which are Storytelling or FotoAl100', () => {
        positiveSubtypes.forEach(subtype => {
            const { id: currentSubtype, nombre } = subtype;
            it(`Should return true for subtype ${nombre}`, () => {
                expect(isFotoAl100orStorytelling(currentSubtype)).toBeTruthy();
            });
        });
    });

    describe('Testing subtypes which are not Storytelling or FotoAl100', () => {
        negativeSubtypes.forEach(subtype => {
            const { id: currentSubtype, nombre } = subtype;
            it(`Should return false for subtype ${nombre}`, () => {
                expect(isFotoAl100orStorytelling(currentSubtype)).toBeFalsy();
            });
        });
    });

    describe('Testing border cases', () => {
        it('Should return false for an empty string', () => {
            expect(isFotoAl100orStorytelling('')).toBeFalsy();
        });

        it('Should return false for a number', () => {
            expect(isFotoAl100orStorytelling(8)).toBeFalsy();
        });

        it('Should return false for an empty array', () => {
            expect(isFotoAl100orStorytelling([])).toBeFalsy();
        });

        it('Should return false without a parameter', () => {
            expect(isFotoAl100orStorytelling()).toBeFalsy();
        });
    });
});

describe('Private - Common - Utils - subtypeNotesWithoutAmp - subtypeHelper', () => {
    it('Should return true when the subtype has no amp', () => {
        expect(
            subtypeNotesWithoutAmp(
                '/agencias/eeuu-y-rusia-chocan-por-responsabilidad-de-ataque-con-misil-nid17112022/'
            )
        ).toBeTruthy();

        expect(
            subtypeNotesWithoutAmp(
                '/juegos/mock-juego-inexistente-nid18122022/'
            )
        ).toBeTruthy();

        expect(
            subtypeNotesWithoutAmp(
                '/economia/campo/los-principales-precandidatos-presidenciales-ya-tienen-sus-referentes-para-buscar-el-voto-del-campo-nid02052023/'
            )
        ).toBeTruthy();

        expect(
            subtypeNotesWithoutAmp(
                '/recetas/cocina/camarones-dinamita-nid31012023/'
            )
        ).toBeTruthy();

        expect(
            subtypeNotesWithoutAmp(
                '/salud/la-inteligencia-que-se-puede-entrenar-y-desarrollar-nid30042023/'
            )
        ).toBeTruthy();

        expect(
            subtypeNotesWithoutAmp(
                '/propiedades/inmuebles-comerciales/los-barrios-que-vienen-nid02122020/'
            )
        ).toBeTruthy();

        expect(
            subtypeNotesWithoutAmp(
                '/autos/los-0km-pasaron-la-barrera-de-los-4-millones-nid01052023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/estados-unidos/muertes-por-sobredosis-en-eeuu-aumentaron-15-en-2021-a-mas-de-100000-nid13052022/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/agencias/eeuu-y-rusia-chocan-por-responsabilidad-de-ataque-con-misil-nid17112022/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/clima/cordoba/villa-carlos-paz/clima-en-villa-carlos-paz-hoy-cual-es-el-pronostico-del-tiempo-para-el-27-de-junio-nid26062023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/loterias/quiniela-nacional/resultados-de-la-quiniela-nacional-nocturna-de-hoy-24-de-junio-nid24062023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/revista-jardin/jardin-de-invierno-descubre-ocho-invernaculos-que-te-sorprenderan-nid06062023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/revista-lugares/furor-peruano-donde-comer-en-lima-la-multipremiada-capital-gourmet-de-latinoamerica-nid25062023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/revista-living/en-casas-reales-10-toilettes-actuales-con-materiales-y-disenos-que-impactan-y-perduran-nid22062023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/revista-hola/su-nueva-vida-en-cordoba-liz-solari-habla-de-su-carrera-los-animales-y-por-que-se-mudo-estoy-en-una-nid15062023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/lifestyle/titulo-random-287469-nid09082023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/horoscopo/piscis/horoscopo-de-piscis-de-hoy-jueves-30-de-marzo-de-2023-nid30032023/'
            )
        ).toBeTruthy();
    });

    it('Should return false when the subtype has amp', () => {
        expect(
            subtypeNotesWithoutAmp(
                '/deportes/eeuu-y-rusia-chocan-por-responsabilidad-de-ataque-con-misil-nid17112022/'
            )
        ).toBeFalsy();
    });
});
