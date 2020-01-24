import React from 'react';
import { render } from 'enzyme';

import ListOrderedOrUnordered from '../../../../../../components/private/LN/nota/cuerpo/listOrderedOrUnordered';

describe('features - LaNacion - Nota - unordered', () => {
    const props = {
        data: {
            type: 'list',
            list_type: 'unordered',
            items: [
                {
                    type: 'text',
                    content: 'hola',
                    _id: 'UL2IXQ7T6RETZGEL2LQROZSSPE'
                },
                {
                    type: 'text',
                    content: 'chau',
                    _id: 'KPDZ2RRIUZE5XOBKXMXYF254JY'
                }
            ]
        }
    };
    const component = render(<ListOrderedOrUnordered {...props} />);
    it('Test de snapshot ListOrderedOrUnordered', () => {
        expect(component).toMatchSnapshot();
    });
});
