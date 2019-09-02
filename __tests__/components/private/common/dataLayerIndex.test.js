import React from 'react';
import { mount } from 'enzyme';
import DataLayerIndex from '../../../../components/private/common/dataLayerIndex';

describe('LN - Common - DataLayer', () => {
    it('DataLayer nota recetas snapshot', () => {
        const comp = mount(
            <DataLayerIndex arcSite="la-nacion-ar" layout="LN-nota-receta" />
        );
        expect(comp).toMatchSnapshot();
    });
});
