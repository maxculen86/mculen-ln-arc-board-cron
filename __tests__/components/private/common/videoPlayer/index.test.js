jest.mock(
    '../../../../../components/private/common/videoPlayer',
    () => 'mocked-component'
);

import React from 'react';
import { mount } from 'enzyme';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import Container from '../../../../../components/private/common/videoPlayer';
import video from '../../../../../__mocks__/data/videos/videoParaPlayer';
import TestHelper from '../../../../utils/testHelper';

describe('private - common - videoPlayer - container', () => {
    //Agrego esta definicion vacia de funcion para que no pinche cuando la llama.
    window.powaBoot = () => {};
    window.dataLayer = [];
    // const multipleVideos = mount(
    //     <>
    //         <Container {...video}></Container>
    //         <Container {...video}></Container>
    //     </>
    // );
    const child = <h1>Soy un child</h1>;
    const container = mount(<Container {...video}>{child}</Container>);

    TestHelper.testDoNotRenderChildren(container, 'child');

    it('Testeo que las props le lleguen bien', () => {
        TestHelper.expectSameValue(
            container.prop('videoId'),
            video.globalContent._id
        );
        TestHelper.expectSameValue(
            container.prop('loadVideoOnInit'),
            video.loadVideoOnInit
        );
    });

    const component = container.find('mocked-component');

    it('Testeo que las props sean las mismas en el componente que el container', () => {
        TestHelper.expectSameValue(
            component.prop('videoId'),
            container.prop('videoId')
        );
        TestHelper.expectSameValue(
            component.prop('enableAdBar'),
            container.prop('enableAdBar')
        );
        TestHelper.expectSameValue(
            component.prop('enableAds'),
            container.prop('enableAds')
        );
    });

    // it('Test script powa una sola vez', () => {
    //     expect(multipleVideos.find('script').length).toBe(1);
    // });
});
