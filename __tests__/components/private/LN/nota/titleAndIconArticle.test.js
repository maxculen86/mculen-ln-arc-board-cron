import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

import TitleArticle from '../../../../../components/private/LN/nota/apertura/titleAndIconArticle';

describe('features - LaNacion - Nota - TituloNota', () => {
    const component = render(
        <TitleArticle
            globalContent={nota}
            layout={'LN-nota-receta'}
            customFields={{ prefix: '' }}
        />
    );
    it('Test de snapshot Titulo e Icono en Nota', () => {
        expect(component).toMatchSnapshot();
    });
});
