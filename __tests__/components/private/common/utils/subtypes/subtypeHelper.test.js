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
    it('Should return true when the subtype has no amp  ', () => {
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
                '/recetas/cocina/camarones-dinamita-nid31012023/'
            )
        ).toBeTruthy();
        expect(
            subtypeNotesWithoutAmp(
                '/propiedades/inmuebles-comerciales/los-barrios-que-vienen-nid02122020/'
            )
        ).toBeTruthy();
    });

    it('Should return false when the subtype has amp  ', () => {
        expect(
            subtypeNotesWithoutAmp(
                '/deportes/eeuu-y-rusia-chocan-por-responsabilidad-de-ataque-con-misil-nid17112022/'
            )
        ).toBeFalsy();
    });
});
