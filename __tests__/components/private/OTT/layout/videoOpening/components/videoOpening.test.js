//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import VideoOpeningComponent from '../../../../../../../components/private/OTT/layouts/videoOpening/containers/videoOpening';
import testHelper from '../../../../../../utils/testHelper'
describe('OTT - layout - videoOpening - components', () => {
    const child = <hijos>soy un child de frame default</hijos>;

    const source =
        '//vivolnmas.lanacion.com.ar/?autoplay=1&amp;rel=0&amp;showinfo=0';

    const container = mount(
        <VideoOpeningComponent source={source} children={child} />
    );

    const component = container.find('iframe');

    testHelper.testNoRenderChildren(container, 'hijos')

    it('Testeo que renderee el iframe', () => {
        testHelper.expectSameValue(component.length, 1)
    });

    it('Testeo que reciba las props que yo mando', () => {
        testHelper.expectProp(component, 'src', source)
    });
});
