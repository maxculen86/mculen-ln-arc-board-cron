import Consumer from 'fusion:consumer';

import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import TituloNota from '../../../../../components/private/LN/nota/apertura/tituloNota';

describe('features - LaNacion - Nota - TituloNota', () => {
    const component = render(<TituloNota titulo={nota.headlines} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });

    it('Test de snapshot TituloNota', () => {
        expect(component.text()).toEqual(
            'Tras el 0-0 con Independiente: cómo le fue a River en la era Marcelo Gallardo cuando tuvo que definir una serie como local'
        );
    });
});
