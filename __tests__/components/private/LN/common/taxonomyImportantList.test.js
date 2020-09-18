import React from 'react';
import { render } from 'enzyme';
import TaxonomyImportantList from '../../../../../components/private/LN/common/taxonomyImportantList';

describe('components - private - LN - common - TaxonomyImportantList', () => {
    const tagsList = [
        {
            type: 'tag',
            path: 'asd-1',
            text: 'asd 1'
        },
        {
            type: 'tag',
            path: 'asd-2',
            text: 'asd 2'
        },
        {
            type: 'section',
            path: 'asd-3',
            text: 'asd 3'
        }
    ];

    const component = render(
        <TaxonomyImportantList list={tagsList} destacado />
    );
    it('Test de snapshot de taxonomy important list', () => {
        expect(component).toMatchSnapshot();
    });
});
