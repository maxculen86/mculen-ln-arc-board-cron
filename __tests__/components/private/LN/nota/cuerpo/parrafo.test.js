import React from 'react';
import { render, screen } from '@testing-library/react';
import Paragraph from '../../../../../../components/private/LN/nota/cuerpo/parrafo';

describe('Paragraph', () => {
    const data = {
        type: 'text',
        content: `Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Donec 
                    nulla elit, fermentum non neque sed, feugiat interdum <i>ligula</i>`
    };

    let component;

    beforeEach(() => {
        component = render(<Paragraph data={data} capital />);
    });

    afterEach(() => {
        component = null;
    });

    it('Matches snapshot', () => {
        const { container } = render(<Paragraph data={data} capital />);
        expect(container).toMatchSnapshot();
    });

    it('Does not apply `capital` class if text starts with forbidden chars', () => {
        const data = {
            type: 'text',
            content: `"Maecenas pulvinar, arcu eu lacinia consectetur, erat leo 
                      egestas augue, id volutpat lorem tellus ac magna.`
        };

        const { container } = render(<Paragraph data={data} capital />);
        expect(
            container.firstChild.classList.contains('--capital')
        ).toBeFalsy();
    });

    it('Sets target _blank on external links', () => {
        const data = {
            type: 'text',
            content: `<a href="https://cutt.ly/TjrhkTT" >I'm external</a>`
        };
        render(<Paragraph data={data} />);

        const link = screen.getByRole('link');
        expect(link.getAttribute('target')).toStrictEqual('_blank');
    });

    it('Sets target _self on internal links', () => {
        const data = {
            type: 'text',
            content: `<a href="https://www.lanacion.com.ar/horoscopo/" >I'm internal</a>`
        };
        render(<Paragraph data={data} />);

        const link = screen.getByRole('link');
        expect(link.getAttribute('target')).toStrictEqual('_self');
    });

    it('Applies `capital` class to paragraph in order to upper-case the first letter', () => {
        const { container } = component;
        expect(
            container.firstChild.classList.contains('--capital')
        ).toBeTruthy();
    });

    it('Transforms <b> tags into <strong> tags', () => {
        const { container } = component;
        expect(container.querySelector('b')).toBeNull();
        expect(container.querySelector('strong')).toBeDefined();
    });

    it('Transforms <i> tags into <em> tags', () => {
        const { container } = component;
        expect(container.querySelector('i')).toBeNull();
        expect(container.querySelector('em')).toBeDefined();
    });

    it('Tests if content is br', () => {
        const data = {
            type: 'text',
            content: '<br/>'
        };
        const { container } = render(<Paragraph data={data} />);
        expect(container.querySelector('br')).toBeDefined();
    });

    describe('Sponsored links', () => {
        const props = {
            data: {
                type: 'text',
                content: `<a href="https://cutt.ly/TjrhkTT" >I'm external </a>`
            },
            withSponsoredLink: false
        };

        it('Should have the rel attribute set to nofollow when the withSponsoredLink property is false. ', () => {
            render(<Paragraph {...props} />);

            const link = screen.getByRole('link');
            expect(link.getAttribute('rel')).toStrictEqual('nofollow');
        });

        it('Should have the rel attribute set to nofollow when the withSponsoredLink property is not defined. ', () => {
            render(<Paragraph data={props.data} />);

            const link = screen.getByRole('link');
            expect(link.getAttribute('rel')).toStrictEqual('nofollow');
        });

        it('Should have the rel attribute set to nofollow when the withSponsoredLink property is true. ', () => {
            render(<Paragraph {...props} withSponsoredLink={true} />);

            const link = screen.getByRole('link');
            expect(link.getAttribute('rel')).toBeNull();
        });
    });
});
