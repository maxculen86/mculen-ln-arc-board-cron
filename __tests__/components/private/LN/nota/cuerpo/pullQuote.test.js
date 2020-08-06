import React from 'react';
import { render, mount } from 'enzyme';
import PullQuote from '../../../../../../components/private/LN/nota/cuerpo/pullQuote';

describe('PullQuote', () => {
    const data = {
        citation: {
            content: 'Erwe Von Esse'
        },
        content_elements: [
            {
                content: `Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Donec 
                          nulla elit, fermentum non neque sed, feugiat interdum <i>ligula</i>`
            }
        ],
        subtype: 'pullquote'
    };

    let component;

    beforeEach(() => {
        component = mount(<PullQuote data={data} />);
    });

    afterEach(() => {
        component = null;
    });

    it('Matches snapshot', () => {
        const pullquote = render(<PullQuote data={data} />);
        expect(pullquote).toMatchSnapshot();
    });

    it('Prints author', () => {
        expect(component.find('h3.nombre-firma').text()).toMatch(
            data.citation.content
        );
    });

    it('Prints quote and quotation marks correctly', () => {
        expect(component.find('div.title-cita').text()).toContain(`"`);
        expect(component.find('div.title-cita').text()).toContain(
            `Lorem ipsum dolor sit amet`
        );
    });
});
