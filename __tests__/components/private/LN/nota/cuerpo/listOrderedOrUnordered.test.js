import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

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
                    _id: 'KPDZ2RRIUZE5XOBKXMXYF254JYZ'
                },
                {
                    type: 'text',
                    content: `<a href="https://lac.wetlands.org/" class="com-link" target="_blank"><mark class="hl_yellow"><b>Fundación Humedales/Wetlands International:</b></mark></a><mark class="hl_yellow"><b> </b></mark><a href="https://twitter.com/fundachumedales?lang=en" class="com-link" target="_blank">Twitter </a>/ <a href="https://es-la.facebook.com/fundacion.humedales/" class="com-link" target="_blank">Facebook</a> / Instagram. Por el Día de los Humedales, junto al Museo Scasso lanzó <a href="https://www.youtube.com/watch?v=xl0lgozO_HU&amp;feature=youtu.be" class="com-link" target="_blank">este video</a>`,
                    _id: 'KPDZ2RRIUZE5XOBKXMXYF254JYP'
                }
            ]
        }
    };
    it('Test de snapshot ListOrderedOrUnordered', () => {
        const { container } = render(<ListOrderedOrUnordered {...props} />);

        expect(container).toMatchSnapshot();
    });
    it('Should have props attributes', () => {
        render(<ListOrderedOrUnordered {...props} />);

        const list = screen.getByRole('list');
        const items = within(list).getAllByRole('listitem');
        const anchors = within(list).getAllByRole('link');

        expect(list.getAttribute('class')).toBe('com-unordered');
        expect(items).toHaveLength(props.data.items.length);
        expect(items[0].getAttribute('class')).toBe('com-item');
        expect(anchors[0].getAttribute('class')).toBe('com-link');
        expect(anchors[0].getAttribute('href')).toBeDefined();
    });
});

describe('features - LaNacion - Nota - unordered wrong list', () => {
    const propsTwo = {
        data: {
            type: 'list',
            list_type: 'unordered',
            items: [
                {
                    type: 'text',
                    _id: 'UL2IXQ7T6RETZGEL2LQROZSSPE'
                },
                {
                    type: 'list',
                    content: `chau <a class="link" href="https://www.lanacion.com.ar/politica/alberto-fernandez-vicentin-nid2376255" class="com-link" >intervenir una compañía</a>`,
                    _id: 'KPDZ2RRIUZE5XOBKXMXYF254JYK'
                },
                {
                    type: 'list',
                    _id: 'KPDZ2RRIUZE5XOBKXMXYF254JYL'
                }
            ]
        }
    };

    it('Should not render wrong lists example: nested lists', () => {
        const { container } = render(<ListOrderedOrUnordered {...propsTwo} />);

        expect(container).toMatchSnapshot();
        expect(screen.queryByRole('list')).toBeNull();
    });
});
