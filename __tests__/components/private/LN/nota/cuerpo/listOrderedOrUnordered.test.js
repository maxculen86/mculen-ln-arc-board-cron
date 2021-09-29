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
                },
                {
                    type: 'text',
                    content: `<a href="https://lac.wetlands.org/" target="_blank"><mark class="hl_yellow"><b>Fundación Humedales/Wetlands International:</b></mark></a><mark class="hl_yellow"><b> </b></mark><a href="https://twitter.com/fundachumedales?lang=en" target="_blank">Twitter </a>/ <a href="https://es-la.facebook.com/fundacion.humedales/" target="_blank">Facebook</a> / Instagram. Por el Día de los Humedales, junto al Museo Scasso lanzó <a href="https://www.youtube.com/watch?v=xl0lgozO_HU&feature=youtu.be" target="_blank">este video</a>`,
                    _id: 'KPDZ2RRIUZE5XOBKXMXYF254JY'
                },
                {
                    type: 'text',
                    content: `<a href="https://lac.wetlands.org/" class="com-link" target="_blank"><mark class="hl_yellow"><b>Fundación Humedales/Wetlands International:</b></mark></a><mark class="hl_yellow"><b> </b></mark><a href="https://twitter.com/fundachumedales?lang=en" class="com-link" target="_blank">Twitter </a>/ <a href="https://es-la.facebook.com/fundacion.humedales/" class="com-link" target="_blank">Facebook</a> / Instagram. Por el Día de los Humedales, junto al Museo Scasso lanzó <a href="https://www.youtube.com/watch?v=xl0lgozO_HU&amp;feature=youtu.be" class="com-link" target="_blank">este video</a>`,
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
