import React from 'react';
import { mount } from 'enzyme';
import DataLayerIndex from '../../../../components/private/common/dataLayerIndex';

describe('LN - Common - DataLayer', () => {
    const globalContent = {
        subtype: '7'
    }
    it('DataLayer nota recetas snapshot', () => {
        const comp = mount(
            <DataLayerIndex 
                arcSite="la-nacion-ar" 
                layout="LN-nota-receta" 
                globalContent={globalContent} 
            />
        );
        expect(comp).toMatchSnapshot();
    });
});
