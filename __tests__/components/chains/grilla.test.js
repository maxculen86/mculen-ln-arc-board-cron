import React from 'react';
import { mount } from 'enzyme';
import Grilla from '../../../components/chains/grilla';
import testHelper from '../../utils/testHelper';

describe('chains - grilla', () => {
    const childrenItems = [<hijo>1</hijo>, <hijo>2</hijo>];
    const title = 'ultimos videos';
    const cf = { title: title };

    const component = mount(<Grilla customFields={cf}>{childrenItems}</Grilla>);
    const childrenItemsComponent = component.find('hijo');
    it('Testeo que se dibujen todos los hijos que le paso', () => {
        testHelper.expectSameValue(childrenItemsComponent.length, 2);
        testHelper.expectSameValue(childrenItemsComponent.at(0).text(), '1');
        testHelper.expectSameValue(childrenItemsComponent.at(1).text(), '2');
    });
});
