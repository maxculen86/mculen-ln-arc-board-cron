import React from 'react';
import { render } from 'enzyme';
import TaxonomyImportantList from '../../../../../components/private/LN/common/taxonomyImportantList';

describe('components - private - LN - common - TaxonomyImportantList', () => {
    const tagsList = [
        {
            path: 'asd-1',
            text: 'asd 1'
        },
        {
            path: 'asd-2',
            text: 'asd 2'
        },
        {
            path: 'asd-3',
            text: 'asd 3'
        }
    ];

    const type = 'tag';
    const component = render(
        <TaxonomyImportantList list={tagsList} type={type} destacado />
    );
    it('Test de snapshot de taxonomy important list', () => {
        expect(component).toMatchSnapshot();
    });
});
