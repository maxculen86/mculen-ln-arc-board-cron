import React from 'react';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import { shallow } from 'enzyme';
import COLUMNIST_DATA from '../../../../__mocks__/data/columnista/columnista';
import Columnista from '../../../../components/features/LN-acumulado/columnista';

describe('features - LaNacion - Acumulado - columnista', () => {
    useContent.mockImplementation(() => COLUMNIST_DATA);
    const props = {
        customFields: {
            id: 'joaquin-morales-sola-51'
        }
    };
    it('Test de snapshot Columnista', () => {
        const component = shallow(<Columnista {...props} />);
        expect(component).toMatchSnapshot();
    });
});
