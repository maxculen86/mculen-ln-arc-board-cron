import React from 'react';
import { render, mount } from 'enzyme';

import Paragraph from '../../../../../../components/private/LN/nota/cuerpo/parrafo';

describe('Paragraph', () => {
    const data = {
        type: 'text',
        content: `Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Donec 
                    nulla elit, fermentum non neque sed, feugiat interdum <i>ligula</i>`
    };

    let component;

    beforeEach(() => {
        component = mount(<Paragraph data={data} capital />);
    });

    afterEach(() => {
        component = null;
    });

    it('Matches snapshot', () => {
        const paragraph = render(<Paragraph data={data} capital />);
        expect(paragraph).toMatchSnapshot();
    });

    it('Applies `capital` class to paragraph in order to upper-case the first letter', () => {
        expect(component.find('p').hasClass('capital')).toBe(true);
    });

    it('Transforms <b> tags into <strong> tags', () => {
        expect(component.find('p.text.element-paragraph').html()).toMatch(
            /<[/]?(strong)>/
        );
    });

    it('Transforms <i> tags into <em> tags', () => {
        expect(component.find('p.text.element-paragraph').html()).toMatch(
            new RegExp('<[/]?(em)>')
        );
    });
});
