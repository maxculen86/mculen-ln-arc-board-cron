import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TitleArticle from '../../../../../components/private/LN/nota/apertura/titleArticle';

describe('components - private - LN - nota - titulo', () => {
    describe('titleAticle component', () => {
        it('Should return mobile title when basic and mobile are uploaded', () => {
            const headlines = {
                basic: 'titulo largo largo',
                mobile: 'titulo corto'
            };
            const { container } = render(
                <TitleArticle headlines={headlines} prefix="" size="--xl" />
            );
            const title = container.getElementsByTagName('h1');
            expect(title[0].innerHTML).toBe(headlines.mobile);
        });
        it('Should return basic if no mobile title', () => {
            const headlines = { basic: 'titulo largo largo' };
            const { container } = render(
                <TitleArticle headlines={headlines} prefix="" size="--xl" />
            );
            const title = container.getElementsByTagName('h1');
            expect(title[0].innerHTML).toBe(headlines.basic);
        });
        it('Should return basic title with prefix', () => {
            const headlines = { basic: 'titulo largo largo' };
            const { container } = render(
                <TitleArticle
                    headlines={headlines}
                    prefix="Ultimo momento"
                    size="--xl"
                />
            );
            const title = container.getElementsByTagName('h1');
            expect(title[0].innerHTML).toBe(
                `Ultimo momento ${headlines.basic}`
            );
        });
        it('If no props return empty', () => {
            const { container } = render(<TitleArticle />);
            expect(container).toBeEmptyDOMElement();
        });
    });
});
