import Consumer from 'fusion:consumer';

jest.mock(
    '../../../../../../components/private/OTT/programa/programImage/component',
    () => 'mocked-component'
);

import React from 'react';
import { mount } from 'enzyme';
import Container from '../../../../../../components/private/OTT/programa/programImage/container';
import TestHelper from '../../../../../utils/testHelper';

describe('private - OTT - programa - programImage', () => {
    const child = <h1>Soy un child</h1>;

    const container = mount(
        <Container imageId="OTTprogramImage">{child}</Container>
    );

    const component = container.find('mocked-component');
    console.log(component.props());
    it('Testeo que la url sea la misma en el componente que el container', () => {
        TestHelper.expectProp(
            component,
            'imgSrc',
            'https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/7XBWH35QWZHSVGDQUVATJ6DC34.jpg'
        );
    });
});
