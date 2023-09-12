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
        expect(
            subtypeNotesWithoutAmp(
                '/el-mundo/un-argentino-contrajo-coronavirus-nid07092023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/espectaculos/luis-miguel-los-origenes-de-su-conexion-con-argentina-nid02082023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/arquitectura/esta-es-una-nota-de-prueba-nid27072023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp('/ciencia/prueba-de-resumen-nid29062023/')
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/comunidad/trastornos-de-la-alimentacion-dormis-con-la-muerte-en-la-cama-abrazandote-nid28072022/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/conversaciones-de-domingo/el-artista-del-momento-el-joven-del-di-tella-al-que-la-publicidad-le-enseno-que-todo-era-posible-nid10092023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/cultura/seul-de-las-ruinas-de-la-guerra-a-la-ciudad-inteligente-nid18112022/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/editoriales/cuando-educar-es-ilegal-nid29032023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/educacion/jose-del-rio-el-periodismo-de-calidad-sigue-siendo-nuestra-prioridad-nid07092022/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/feriados/2023/nota-de-prueba-acu-feriados-2023-nid21122022/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/ideas/prueba-de-maestria-como-probar-arc-y-sus-funciones-nid26042021/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/data/jose-del-rio-fusiona-tecnologia-y-periodismo-en-la-era-digital-hay-que-estar-del-lado-de-los-datos-nid12052023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/la-nacion-revista/probando-html-cerrado-nid14052023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp('/lnmas/prueba-logo-ln-roger-nid09022022/')
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/moda-y-belleza/moda-antiviral-nid19112020/'
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
