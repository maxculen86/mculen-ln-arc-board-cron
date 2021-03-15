// jest.mock(
//     './../../../../../../components/features/LN-common/articulo',
//     () => 'mock-component'
// );

// import React from 'react';
// import { mount } from 'enzyme';
// import NoteFeature from './../../../../../../components/features/LN-common/articulo';

// describe('Test del Feature - <NoteFeature />', () => {
//     const noteId = 'TXQ62BPYN5AEFKLPRNM66WS63I';
//     const imageId = 'UUEO45CS2ZEHFEOMB5H3EY5J5Q';
//     const lead = 'Esta es una volanta';
//     const title = 'Este es un titulo';
//     const description = 'Esta es una bajada';
//     const authors = 'Estos son los autores';

//     const customFields = {
//         noteId: noteId,
//         imageId: imageId,
//         lead: lead,
//         title: title,
//         description: description,
//         authors: authors
//     };

//     const component = mount(
//         <NoteFeature customFields={customFields}></NoteFeature>
//     );

//     const mock = component.find('mock-component');
//     it('Montaje del componente', () => {
//         expect(mock.length).toBe(1);
//     });
//     it('Recibe customFields', () => {
//         expect(mock.props('customFields').customFields).toBeTruthy();
//         expect(mock.props('customFields').customFields).toEqual(customFields);
//     });
//     it('Recibe de customFields el campo obligatorio noteId', () => {
//         expect(mock.props('customFields').customFields.noteId).toBeTruthy();
//         expect(mock.props('customFields').customFields.noteId).toBe(noteId);
//     });
// });

describe('Por hacer Test de NoteFeature', () => {
    it('should be true', () => {
        expect(true).toBe(true);
    });
});
