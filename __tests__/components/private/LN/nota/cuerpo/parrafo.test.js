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

    it('Does not apply `capital` class if text starts with forbidden chars', () => {
        const data = {
            type: 'text',
            content: `"Maecenas pulvinar, arcu eu lacinia consectetur, erat leo 
                      egestas augue, id volutpat lorem tellus ac magna.`
        };

        component = mount(<Paragraph data={data} capital />);
        expect(component.find('p').hasClass('--capital')).toBe(false);
    });

    it('Sets target _blank attribute on external links', () => {
        const data = {
            type: 'text',
            content: `<a href="https://cutt.ly/TjrhkTT" target='_blank'>I'm external`
        };
        component = mount(<Paragraph data={data} />);
        const {
            dangerouslySetInnerHTML: { __html: html }
        } = component.find('p').props();
        expect(html).toEqual(
            `<a href="https://cutt.ly/TjrhkTT" target='_blank'>I'm external`
        );
    });

    it('Applies `capital` class to paragraph in order to upper-case the first letter', () => {
        expect(component.find('p').hasClass('--capital')).toBe(true);
    });

    it('Transforms <b> tags into <strong> tags', () => {
        expect(component.find('p.com-paragraph').html()).toMatch(
            /<[/]?(strong)>/
        );
    });

    it('Transforms <i> tags into <em> tags', () => {
        expect(component.find('p.com-paragraph').html()).toMatch(
            new RegExp('<[/]?(em)>')
        );
    });

    it('Tests if content is br', () => {
        const data = {
            type: 'text',
            content: '<br/>'
        };
        component = mount(<Paragraph data={data} />);
        expect(component).toBeEmptyRender;
    });
});
