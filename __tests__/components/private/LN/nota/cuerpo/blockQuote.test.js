import React from 'react';
import { render } from 'enzyme';

import BlockQuote from '../../../../../../components/private/LN/nota/cuerpo/blockQuote';

const data = {
    content_elements: {
        0: {
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nulla elit, fermentum non neque sed, feugiat interdum ligula. Nulla odio lacus, pretium quis lacus in, dapibus elementum purus. '
        }
    },
    subtype: 'pullquote'
};

describe('features - LaNacion - Nota - BlockQuote', () => {
    const component = render(<BlockQuote data={data} />);
    it('Test de snapshot BlockQuote', () => {
        expect(component).toMatchSnapshot();
    });
});
