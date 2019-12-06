import React from 'react';
import { render } from 'enzyme';

import BlockQuote from '../../../../../../components/private/LN/nota/cuerpo/blockQuote';

describe('features - LaNacion - Nota - BlockQuote', () => {
    const component = render(
        <BlockQuote>
            Para la nueva campaña, según el USDA quedarían como remanente final
            unas 21,63 millones de toneladas versus 22,10 millones de toneladas
            esperadas en el mercado.toneladas.
        </BlockQuote>
    );
    it('Test de snapshot BlockQuote', () => {
        expect(component).toMatchSnapshot();
    });
});
