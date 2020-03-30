import { validateNoteCard } from './../../../../../../components/private/LN/home/components/noteCard/validation';

describe('Test de funcionalidad validateNoteCard del componente - <NoteCard />', () => {
    const func = require('./../../../../../../components/private/LN/home/components/noteCard/validation');
    const validateNoteCard = jest.spyOn(func, 'validateNoteCard');

    const invalidNoteCard = {
        type: 'warning',
        message: 'La nota debe contar con una imagen o bajada y con un título'
    };
    const invalidApertura = {
        type: 'warning',
        message:
            'El título e imagen son obligatorios para un artículo de apertura'
    };

    it('Validación de una nota común sin imagen ni bajada', () => {
        const isOpening = false;
        const belongsTo = 'apertura';
        const title = 'Un título.';
        const imageId = undefined;
        const subhead = undefined;
        expect(
            validateNoteCard(isOpening, belongsTo, title, imageId, subhead)
        ).toStrictEqual(invalidNoteCard);
    });
    it('Validación de una nota apertura sin imagen', () => {
        const isOpening = true;
        const belongsTo = 'apertura';
        const title = 'Un título.';
        const imageId = undefined;
        const subhead = 'Una bajada.';
        expect(
            validateNoteCard(isOpening, belongsTo, title, imageId, subhead)
        ).toStrictEqual(invalidApertura);
    });
    it('Validación de una nota común sin errores', () => {
        let isOpening = false;
        let belongsTo = 'apertura';
        let title = 'Un título.';
        let imageId = 'id_imagen';
        let subhead = undefined;
        expect(
            validateNoteCard(isOpening, belongsTo, title, imageId, subhead)
        ).toStrictEqual(null);

        imageId = undefined;
        subhead = 'Una Bajada.';
        expect(
            validateNoteCard(isOpening, belongsTo, title, imageId, subhead)
        ).toStrictEqual(null);
    });
    it('Validación de una nota apertura sin errores', () => {
        let isOpening = true;
        let belongsTo = 'apertura';
        let title = 'Un título.';
        let imageId = 'id_imagen';
        let subhead = 'Una bajada.';
        expect(
            validateNoteCard(isOpening, belongsTo, title, imageId, subhead)
        ).toStrictEqual(null);
    });
});
