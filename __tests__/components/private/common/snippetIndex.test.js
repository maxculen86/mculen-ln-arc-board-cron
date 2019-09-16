import React from 'react';
import { mount } from 'enzyme';
import SnippetIndex from '../../../../components/private/common/snippetIndex';

describe('LN - Common - Snippet', () => {
    it('Snippet nota recetas snapshot', () => {
        const comp = mount(
            <SnippetIndex arcSite="la-nacion-ar" layout="LN-nota-receta" />
        );
        expect(comp).toMatchSnapshot();
    });
});
