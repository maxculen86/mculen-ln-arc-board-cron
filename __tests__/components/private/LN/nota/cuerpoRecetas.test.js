import React from 'react';
import { render } from 'enzyme';
import CuerpoReceta from '../../../../../components/private/LN/nota/cuerpo/cuerpoReceta';
import globalContent from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

//TODO: make a deeper test of this component
describe('CuerpoReceta', () => {
    it('matches snapshot', () => {
        const component = render(
            <CuerpoReceta globalContent={globalContent} />
        );
        expect(component).toMatchSnapshot();
    });
});
