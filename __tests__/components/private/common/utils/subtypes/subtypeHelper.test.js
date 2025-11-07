import {
    isFotoAl100orStorytelling,
    Subtypes,
    translateStringFromSubitypeToID,
    shouldPreloadForSubtype,
    CARDS,
    NOTICIA
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

    describe('Tests - function - translateStringFromSubitypeToID', () => {
        it("Should return '1' when the subtype arrives with the value 'News' or '1'", () => {
            const subtypeNoticia = '1';
            expect(translateStringFromSubitypeToID('Noticia')).toStrictEqual(
                subtypeNoticia
            );
            expect(
                translateStringFromSubitypeToID(subtypeNoticia)
            ).toStrictEqual(subtypeNoticia);
        });

        it("Should return '2' when the subtype arrives with the value 'Infographic' or '2'", () => {
            const subtypeInfografia = '2';
            expect(translateStringFromSubitypeToID('Infografia')).toStrictEqual(
                subtypeInfografia
            );
            expect(
                translateStringFromSubitypeToID(subtypeInfografia)
            ).toStrictEqual(subtypeInfografia);
        });

        it("Should return '5' when the subtype arrives with the value 'Video' or '5'", () => {
            const subtypeVideo = '5';
            expect(translateStringFromSubitypeToID('Video')).toStrictEqual(
                subtypeVideo
            );
            expect(translateStringFromSubitypeToID(subtypeVideo)).toStrictEqual(
                subtypeVideo
            );
        });

        it("Should return '6' when the subtype arrives with the value 'LiveBlog' or '6'", () => {
            const subtypeLiveBlog = '6';
            expect(translateStringFromSubitypeToID('LiveBlog')).toStrictEqual(
                subtypeLiveBlog
            );
            expect(
                translateStringFromSubitypeToID(subtypeLiveBlog)
            ).toStrictEqual(subtypeLiveBlog);
        });

        it("Should return '7' when the subtype arrives with the value 'Recipe' or '7'", () => {
            const subtypeReceta = '7';

            expect(translateStringFromSubitypeToID('Receta')).toStrictEqual(
                subtypeReceta
            );
            expect(
                translateStringFromSubitypeToID(subtypeReceta)
            ).toStrictEqual(subtypeReceta);
        });

        it("Should return '4' when the subtype arrives with the value 'Storytelling' or '4'", () => {
            const subtypeStorytelling = '4';
            expect(
                translateStringFromSubitypeToID('Storytelling')
            ).toStrictEqual(subtypeStorytelling);
            expect(
                translateStringFromSubitypeToID(subtypeStorytelling)
            ).toStrictEqual(subtypeStorytelling);
        });

        it("Should return '8' when the subtype arrives with the value 'Storytelling' or '8'", () => {
            const subtypeFotoAl100 = '8';
            expect(translateStringFromSubitypeToID('FotoAl100')).toStrictEqual(
                subtypeFotoAl100
            );
            expect(
                translateStringFromSubitypeToID(subtypeFotoAl100)
            ).toStrictEqual(subtypeFotoAl100);
        });

        it("Should return '9' when the subtype arrives with the value 'HtmlLibre' or '9'", () => {
            const subtypeHtmlLibre = '9';
            expect(translateStringFromSubitypeToID('HtmlLibre')).toStrictEqual(
                subtypeHtmlLibre
            );
            expect(
                translateStringFromSubitypeToID(subtypeHtmlLibre)
            ).toStrictEqual(subtypeHtmlLibre);
        });

        it("Should return '10' when the subtype arrives with the value 'Agency' or '10'", () => {
            const subtypeAgencia = '10';
            expect(translateStringFromSubitypeToID('Agencia')).toStrictEqual(
                subtypeAgencia
            );
            expect(
                translateStringFromSubitypeToID(subtypeAgencia)
            ).toStrictEqual(subtypeAgencia);
        });
    });

    describe('shouldPreloadForSubtype', () => {
        it('Should return false when subtype is excluded', () => {
            expect(shouldPreloadForSubtype(CARDS)).toBe(false);
        });

        it('Should return true when subtype is not excluded', () => {
            expect(shouldPreloadForSubtype(NOTICIA)).toBe(true);
        });

        it('Should return true when subtype is empty', () => {
            expect(shouldPreloadForSubtype()).toBe(true);
        });

        it('Should return true when subtype is an empty string', () => {
            expect(shouldPreloadForSubtype('')).toBe(true);
        });

        it('Should return true when subtype is null', () => {
            expect(shouldPreloadForSubtype(null)).toBe(true);
        });
    });
});
