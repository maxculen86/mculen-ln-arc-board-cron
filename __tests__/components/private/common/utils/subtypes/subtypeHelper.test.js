import {
    isFotoAl100orStorytelling,
    Subtypes
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
