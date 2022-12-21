jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('../../../../components/private/common/mod-dolar', () => 'ModDolar');

import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { useContent } from 'fusion:content';
import CajaDolar from '../../../../components/features/LN-acumulado/cajaDolar';
import ModDolar from '../../../../components/private/common/mod-dolar';
import API_RESPONSE from '../../../../__mocks__/data/apiDolar/apiDolar';
import { shallow } from 'enzyme';

describe('Features - LN-acumulado - Caja Dolar Feature =>', () => {
    describe('without data response ', () => {
        it('should return null', () => {
            useContent.mockImplementation(() => {});

            const wrapper1 = shallow(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

            useContent.mockImplementation(() => ({
                data: undefined
            }));
            const wrapper2 = shallow(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

            expect(wrapper1.html()).toBeFalsy();
            expect(wrapper2.html()).toBeFalsy();
        });
    });

    describe('with a valid response', () => {
        useContent.mockImplementation(() => API_RESPONSE);

        const wrapper = shallow(<CajaDolar id={'f0f7MrGuNmfRtMo'} />);

        const result = wrapper.first();
        const ModDolarComponent = result.find('ModDolar');

        it('should render ModDolar component with correctly props', () => {
            const { data, imageUrl } = ModDolarComponent.props();
            const {
                data: dataResponse,
                imageUrl: urlImageResponse
            } = API_RESPONSE;
            expect(ModDolarComponent.exists()).toBeTruthy();
            expect(data).toStrictEqual(dataResponse);
            expect(data.length).toBe(3);
            expect(data[0].sourceName).toBe('dbna');
            expect(data[1].sourceName).toBe('dblue');
            expect(data[2].sourceName).toBe('dccl');
            expect(imageUrl).toStrictEqual(urlImageResponse);
        });
    });
});
