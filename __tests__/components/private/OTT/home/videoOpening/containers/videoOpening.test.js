//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../../../components/private/OTT/home/videoOpening/component',
    () => 'mock-component'
);
//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../../utils/testHelper';
import VideoOpeningComponent from '../../../../../../../components/private/OTT/home/videoOpening/container';

describe('OTT - layout - videoOpening - containers', () => {
    const child = <hijos>soy un child de frame default</hijos>;

    const source =
        '//vivolnmas.lanacion.com.ar/?autoplay=1&amp;rel=0&amp;showinfo=0';

    const container = mount(
        <VideoOpeningComponent source={source} children={child} />
    );

    const component = container.find('mock-component');
    testHelper.testDoNotRenderChildren(container, 'hijos');

    it('Testeo que reciba las props que yo mando', () => {
        testHelper.expectProp(component, 'source', source);
    });
});
