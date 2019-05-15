// //retorno un elemento que luego busco en el container
// jest.mock(
//     '../../../../../components/private/common/button',
//     () => 'mock-component'
// );

// //Otros imports
// import React from 'react';
// import { mount } from 'enzyme';
// import testHelper from '../../../../utils/testHelper';
// import FacebookButtonComponents from '../../../../../components/private/common/facebookButton/component';

// describe('private - common - component - facebookButton', () => {
//     const child = '<hijo>un texto como children</hijo>';
//     const props = {
//         className: 'icon-facebook',
//         id: 'pie-facebook',
//         href: '/google.com'
//     };
//     const container = mount(
//         <FacebookButtonComponents children={child} href={'/google.com'} />
//     );
//     const component = container.find('mock-component');

//     it('Testeo que existe el mock', () => {
//         testHelper.expectSameValue(component.length, 1);
//     });

//     it('Testeo que pase al componente los items recibidos por el container', () => {
//         testHelper.expectProps(component, props);
//     });

//     it('Testeo que no muestre mas de las props que tiene que mostrar', () => {
//         testHelper.expectSameValue(Object.keys(component.props()).length, 3);
//     });

//     testHelper.testDoNotRenderChildren(component, 'hijo');
// });

import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../utils/testHelper';
describe('HACER TEST', () => {
    it('HACER TESTS!', () => {
        testHelper.expectSameValue(2, 2);
    });
});
