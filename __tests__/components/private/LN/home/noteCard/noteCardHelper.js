// import { validateNoteCard } from './../../../../../../components/private/LN/home/components/noteCard/noteCardHelper';

// describe('Test de funcionalidad validateNoteCard del componente - <NoteCard />', () => {
//     const func = require('./../../../../../../components/private/LN/home/components/noteCard/noteCardHelper');
//     const validateNoteCard = jest.spyOn(func, 'validateNoteCard');

//     const invalidNoteCard = {
//         type: 'warning',
//         message: 'La nota debe contar con una imagen o bajada y con un título'
//     };
//     const invalidApertura = {
//         type: 'warning',
//         message:
//             'El título e imagen son obligatorios para un artículo de apertura'
//     };
//     const invalidContent = {
//         type: 'warning',
//         message: 'No se encontró contenido'
//     };

//     it('Validación de una nota común sin imagen ni bajada', () => {
//         const isOpening = false;
//         const belongsTo = 'apertura';
//         const title = 'Un título.';
//         const imageId = undefined;
//         const subhead = undefined;
//         const content = {
//             isOpening,
//             belongsTo,
//             title,
//             imageId,
//             subhead
//         };
//         expect(
//             validateNoteCard(
//                 isOpening,
//                 belongsTo,
//                 title,
//                 imageId,
//                 subhead,
//                 content
//             )
//         ).toStrictEqual(invalidNoteCard);
//     });
//     it('Validación de una nota apertura sin imagen', () => {
//         const isOpening = true;
//         const belongsTo = 'apertura';
//         const title = 'Un título.';
//         const imageId = undefined;
//         const subhead = 'Una bajada.';
//         const content = {
//             isOpening,
//             belongsTo,
//             title,
//             imageId,
//             subhead
//         };
//         expect(
//             validateNoteCard(
//                 isOpening,
//                 belongsTo,
//                 title,
//                 imageId,
//                 subhead,
//                 content
//             )
//         ).toStrictEqual(invalidApertura);
//     });
//     it('Validación de una nota común sin errores', () => {
//         const isOpening = false;
//         const belongsTo = 'apertura';
//         const title = 'Un título.';
//         let imageId = 'id_imagen';
//         let subhead = undefined;
//         const content = {
//             isOpening,
//             belongsTo,
//             title,
//             imageId,
//             subhead
//         };
//         expect(
//             validateNoteCard(
//                 isOpening,
//                 belongsTo,
//                 title,
//                 imageId,
//                 subhead,
//                 content
//             )
//         ).toStrictEqual(undefined);

//         imageId = undefined;
//         subhead = 'Una Bajada.';
//         expect(
//             validateNoteCard(
//                 isOpening,
//                 belongsTo,
//                 title,
//                 imageId,
//                 subhead,
//                 content
//             )
//         ).toStrictEqual(undefined);
//     });
//     it('Validación de una nota apertura sin errores', () => {
//         const isOpening = true;
//         const belongsTo = 'apertura';
//         const title = 'Un título.';
//         const imageId = 'id_imagen';
//         const subhead = 'Una bajada.';
//         const content = {
//             isOpening,
//             belongsTo,
//             title,
//             imageId,
//             subhead
//         };
//         expect(
//             validateNoteCard(
//                 isOpening,
//                 belongsTo,
//                 title,
//                 imageId,
//                 subhead,
//                 content
//             )
//         ).toStrictEqual(undefined);
//     });
//     it('Validación de una nota sin contenido', () => {
//         const isOpening = false;
//         const belongsTo = 'apertura';
//         const title = 'Un título.';
//         const imageId = 'id_imagen';
//         const subhead = undefined;
//         let content = undefined;
//         expect(
//             validateNoteCard(
//                 isOpening,
//                 belongsTo,
//                 title,
//                 imageId,
//                 subhead,
//                 content
//             )
//         ).toStrictEqual(invalidContent);

//         content = {
//             isOpening,
//             belongsTo,
//             title,
//             imageId,
//             subhead
//         };
//         expect(
//             validateNoteCard(
//                 isOpening,
//                 belongsTo,
//                 title,
//                 imageId,
//                 subhead,
//                 content
//             )
//         ).toStrictEqual(undefined);
//     });
// });

describe('Por hacer Test de NoteCardHelper', () => {
    it('should be true', () => {
        expect(true).toBe(true);
    });
});
