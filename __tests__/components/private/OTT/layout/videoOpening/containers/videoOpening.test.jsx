
//retorno un elemento que luego busco en el container
jest.mock('../../../../../../../components/private/OTT/layouts/videoOpening/components/videoOpening',
    () => 'mock-component');

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import VideoOpeningComponent from '../../../../../../../components/private/OTT/layouts/videoOpening/containers/videoOpening';

describe('OTT - layout - videoOpening - containers', () => {
    const child = <hijos>soy un child de frame default</hijos>

    const source = '//vivolnmas.lanacion.com.ar/?autoplay=1&amp;rel=0&amp;showinfo=0';

    const container = mount(
        <VideoOpeningComponent
            source={source}
            children={child}
        />
    )

    const component = container.find('mock-component')

    const children = container.find('hijos')

    it('Testeo que no renderee los children', () => {
        expect(children.length).toEqual(0)
    });

    it('Testeo que reciba las props que yo mando', () => {
        expect(component.prop("source")).toEqual(source)
    });
})
