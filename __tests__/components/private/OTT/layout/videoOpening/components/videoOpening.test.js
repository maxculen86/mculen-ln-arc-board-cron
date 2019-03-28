//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import VideoOpeningComponent from '../../../../../../../components/private/OTT/layouts/videoOpening/containers/videoOpening';

describe('OTT - layout - videoOpening - components', () => {
    const child = <hijos>soy un child de frame default</hijos>;

    const source =
        '//vivolnmas.lanacion.com.ar/?autoplay=1&amp;rel=0&amp;showinfo=0';

    const container = mount(
        <VideoOpeningComponent source={source} children={child} />
    );

    const component = container.find('iframe');

    const children = container.find('hijos');

    it('Testeo que no renderee los children', () => {
        expect(children.length).toEqual(0);
    });

    it('Testeo que renderee el iframe', () => {
        expect(component.length).toEqual(1);
    });

    it('Testeo que reciba las props que yo mando', () => {
        expect(component.prop('src')).toEqual(source);
    });
});
