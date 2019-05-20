import Consumer from 'fusion:consumer';

jest.mock(
    '../../../../../../components/private/OTT/ficha/videoTab/component',
    () => 'mocked-component'
);

import React from 'react';
import { mount } from 'enzyme';
import Container from '../../../../../../components/private/OTT/ficha/videoTab';
import TestHelper from '../../../../../utils/testHelper';

describe('private - OTT - ficha - container', () => {
    const child = <h1>Soy un child</h1>;
    const container = mount(<Container>{child}</Container>);

    TestHelper.testDoNotRenderChildren(container, 'child');

    const component = container.find('mocked-component');

    console.log(component.props());
});
