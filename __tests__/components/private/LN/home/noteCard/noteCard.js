jest.mock(
    './../../../../../../components/private/LN/home/components/noteCard/noteCard.jsx',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import NoteCard from './../../../../../../components/private/LN/home/components/noteCard/noteCard';

describe('Test del Feature - <NoteCard />', () => {
    const noteId = 'TXQ62BPYN5AEFKLPRNM66WS63I';
    const imageId = 'UUEO45CS2ZEHFEOMB5H3EY5J5Q';
    const lead = 'Esta es una volanta';
    const title = 'Este es un titulo';
    const description = 'Esta es una bajada';
    const authors = 'Estos son los autores';

    const content = {
        headlines: { basic: 'Titulo de la Nota' },
        subheadlines: { basic: 'Bajada de la Nota' },
        promo_items: {
            basic: {
                resized_urls: 'url_de_la_imagen.jpg'
            }
        },
        credits: { by: [{ name: 'Nombre Apellido' }] }
    };

    const customFields = {
        imageId: imageId,
        lead: lead,
        title: title,
        description: description,
        authors: authors
    };

    const component = mount(
        <NoteCard content={content} customFields={customFields}></NoteCard>
    );

    const mock = component.find('mock-component');
    it('Montaje del componente', () => {
        expect(mock.length).toBe(1);
    });
    it('Recibe content', () => {
        expect(mock.props('content')).toBeTruthy();
        expect(mock.props('content').content).toEqual(content);
    });
    it('Recibe customFields', () => {
        expect(mock.props('content')).toBeTruthy();
        expect(mock.props('customFields').customFields).toEqual(customFields);
    });
    it('Recibe de customFields el campo obligatorio title e imageId', () => {
        expect(mock.props('customFields').customFields.title).toBeTruthy();
        expect(mock.props('customFields').customFields.title).toBe(title);
        expect(mock.props('customFields').customFields.imageId).toBeTruthy();
        expect(mock.props('customFields').customFields.imageId).toBe(imageId);
    });
    it('Recibe de customFields el campo obligatorio title y bajada', () => {
        expect(mock.props('customFields').customFields.title).toBeTruthy();
        expect(mock.props('customFields').customFields.title).toBe(title);
        expect(mock.props('customFields').customFields.imageId).toBeTruthy();
        expect(mock.props('customFields').customFields.imageId).toBe(imageId);
    });
});
