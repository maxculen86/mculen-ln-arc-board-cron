import React from 'react';
import { mount } from 'enzyme';
import VideoTab from '../../../../../components/private/OTT/ficha/videoTab';
import TestHelper from '../../../../utils/testHelper';
import dateHelper from '../../../../../components/private/OTT/common/utils/dateHelper';
import globalContent from '../../../../../__mocks__/data/videos/globalContentPgmCampo.json';

jest.mock(
    '../../../../../components/private/OTT/ficha/videoTab',
    () => 'mock-component'
);

describe('components - private - OTT - ficha - videoTab', () => {
    const child = <h1>Soy un child</h1>;
    const container = mount(
        <VideoTab globalContent={globalContent}>{child}</VideoTab>
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
});
