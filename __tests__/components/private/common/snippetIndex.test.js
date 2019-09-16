import React from 'react';
import { mount } from 'enzyme';
import SnippetIndex from '../../../../components/private/common/snippetIndex';
import nota from '../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

describe('LN - Common - Snippet', () => {
    it('Snippet nota recetas snapshot', () => {
        const comp = mount(
            <SnippetIndex
                globalContent={nota}
                arcSite="la-nacion-ar"
                layout="LN-nota-receta"
            />
        );
        expect(comp).toMatchSnapshot();
    });
});
