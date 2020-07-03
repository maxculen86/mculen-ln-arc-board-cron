import React from 'react';
import { render, mount, shallow } from 'enzyme';

import Paragraph from '../../../../../../components/private/LN/nota/cuerpo/parrafo';
import ComParagraph from '../../../../../../components/private/common/com-paragraph';

describe('Paragraph', () => {
    const data = {
        type: 'text',
        content: `Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Donec 
                    nulla elit, fermentum non neque sed, feugiat interdum <i>ligula</i>`
    };

    let component;

    beforeEach(() => {
        component = mount(
            <Paragraph content={data.content} data={data} capital />
        );
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
        expect(component.find('p').hasClass('capital')).toBe(false);
    });

    it('Sets target _blank attribute on external links', () => {
        const data = {
            type: 'text',
            content: `target='_blank'>I'm external`
        };
        component = mount(<Paragraph data={data} />);
        const {
            dangerouslySetInnerHTML: { __html: html }
        } = component.find('p').props();
        expect(html).toContain(`target='_blank'>I'm external`);
    });

    it('Applies `capital` class to paragraph in order to upper-case the first letter', () => {
        expect(component.find('p').hasClass('--capital')).toBe(true);
    });

    it('Transforms <b> tags into <strong> tags', () => {
        const componentShallow = shallow(
            <Paragraph content={data.content} data={data} capital />
        );

        expect(componentShallow.find(ComParagraph).prop('content')).toMatch(
            /<[/]?(strong)>/
        );
    });

    it('Transforms <i> tags into <em> tags', () => {
        const componentShallow = shallow(
            <Paragraph content={data.content} data={data} capital />
        );

        expect(componentShallow.find(ComParagraph).prop('content')).toMatch(
            new RegExp('<[/]?(em)>')
        );
    });
});
