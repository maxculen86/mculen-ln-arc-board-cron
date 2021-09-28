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
                    content: `hola <a class="link" href="https://www.lanacion.com.ar/politica/alberto-fernandez-vicentin-nid2376255" >intervenir una compañía</a>`,
                    _id: 'UL2IXQ7T6RETZGEL2LQROZSSPE'
                },
                {
                    type: 'text',
                    content: `chau <a class="link" href="https://www.lanacion.com.ar/politica/alberto-fernandez-vicentin-nid2376255" class="com-link" >intervenir una compañía</a>`,
                    _id: 'KPDZ2RRIUZE5XOBKXMXYF254JY'
                }
            ]
        }
    };
    const component = render(<ListOrderedOrUnordered {...props} />);
    it('Test de snapshot ListOrderedOrUnordered', () => {
        expect(component).toMatchSnapshot();
    });
    it('Should have one <a> tag with class com-link', () => {
        expect(component.find('li > a').hasClass('com-link')).toBe(true);
        expect(component.find('.com-link').last().length).toBe(1);
        expect(component.find('.link').last().length).toBe(0);
    });
});
