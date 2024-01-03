import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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

    it('Matches snapshot', () => {
        const { container } = render(
            <PullQuote data={data} data-testid="quote" />
        );
        expect(container).toMatchSnapshot();
    });

    it('Prints quote and quotation marks correctly', () => {
        render(<PullQuote data={data} data-testid="quote" />);
        const textoElement = screen.getByText(/Lorem ipsum dolor sit amet,/);
        expect(textoElement).toBeInTheDocument();
    });
});
