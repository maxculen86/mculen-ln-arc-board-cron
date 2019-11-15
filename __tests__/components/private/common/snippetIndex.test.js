jest.mock(
    '../../../../components/private/LN/nota/snippet/receta',
    () => 'snippet-mock'
);

import React from 'react';
import { mount } from 'enzyme';
import SnippetIndex from '../../../../components/private/common/snippet';
import nota from '../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

describe('LN - Common - SnippetIndex - Render snippet valido', () => {
    const comp = mount(
        <SnippetIndex
            globalContent={nota}
            arcSite="la-nacion-ar"
            layout="LN-nota-receta"
        />
    );

    it('Dibuja el snippet solicitado', () => {
        expect(comp.find('snippet-mock').length).not.toBe(0);
    });

    it('Le pasa las props', () => {
        expect(comp.find('snippet-mock').prop('globalContent')).toBe(nota);
    });
});

describe('LN - Common - SnippetIndex - Render snippet no configurado', () => {
    const comp = mount(
        <SnippetIndex
            globalContent={nota}
            arcSite="la-nacion-ar"
            layout="layout-inexistente"
        />
    );

    it('No dibuja nada', () => {
        expect(comp.children().length).toBe(0);
    });
});
