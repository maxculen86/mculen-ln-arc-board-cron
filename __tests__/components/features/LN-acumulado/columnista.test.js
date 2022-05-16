import React from 'react';
import { useContent } from 'fusion:content';
import { shallow } from 'enzyme';
import COLUMNIST_DATA from '../../../../__mocks__/data/columnista/columnista.json';
import ColumnistaComponent from '../../../../components/features/LN-acumulado/columnista/default';
import * as Columnista from '../../../../components/features/LN-acumulado/columnista/json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
            }
            fetchContent(param) {}
        };
    };
});
describe('features - LaNacion - Acumulado - columnista', () => {
    useContent.mockImplementation(() => COLUMNIST_DATA);
    const props = {
        customFields: {
            id: 'joaquin-morales-sola-51'
        }
    };
    it('Test de snapshot Columnista', () => {
        const component = shallow(<ColumnistaComponent {...props} />);
        expect(component).toMatchSnapshot();
    });
    it('undefined data', () => {
        const objArticle = new Columnista.default(props);
        const result = objArticle.render();
        expect(result).toBeUndefined();
    });
});
