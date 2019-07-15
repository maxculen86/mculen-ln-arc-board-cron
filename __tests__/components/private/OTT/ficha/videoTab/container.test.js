import Consumer from 'fusion:consumer';

jest.mock(
    '../../../../../../components/private/OTT/ficha/videoTab/component',
    () => 'mocked-component'
);

import React from 'react';
import { mount } from 'enzyme';
import Container from '../../../../../../components/private/OTT/ficha/videoTab';
import TestHelper from '../../../../../utils/testHelper';
import dateHelper from '../../../../../../components/private/OTT/common/utils/dateHelper';
import globalContent from '../../../../../../__mocks__/data/videos/globalContentPgmCampo';

describe('private - OTT - ficha - container', () => {
    const child = <h1>Soy un child</h1>;
    const container = mount(
        <Container globalContent={globalContent}>{child}</Container>
    );

    TestHelper.testDoNotRenderChildren(container, 'child');

    it('testeo que el container contenga los 2 streams que le llegaron y que esten ordenados igual', () => {
        const streams = globalContent.streams.sort((a, b) => {
            return b.height - a.height;
        });
        TestHelper.expectSameValue(
            container.prop('globalContent').streams.length,
            streams.length
        );
        TestHelper.expectSameValue(
            container.prop('globalContent').streams[0].fileSize,
            streams[0].fileSize
        );
    });

    const component = container.find('mocked-component');
    it('testeo que las props que le lleguen al subcomponent correspondan ', () => {
        TestHelper.expectSameValue(
            component.prop('videoId'),
            globalContent._id
        );
        TestHelper.expectSameValue(
            component.prop('title'),
            globalContent.headlines.basic
        );
        const date = dateHelper.getVideoDateFormat(globalContent.publish_date);
        TestHelper.expectSameValue(component.prop('date'), date);
    });
});
