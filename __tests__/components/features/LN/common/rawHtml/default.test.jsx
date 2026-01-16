import React from 'react';
import { render, screen } from '@testing-library/react';
import RawHtml from '../../../../../../components/features/LN/common/rawHtml/default';

jest.mock(
    '../../../../../../components/private/LN/nota/cuerpo/htmlPym.jsx',
    () => () => <div data-testid="html-pym" />
);

describe('RawHtml', () => {
    it('returns null when content is missing', () => {
        const { container } = render(<RawHtml data={{}} />);

        expect(container.firstChild).toBeNull();
    });

    it('renders HtmlPym when content contains a pym iframe', () => {
        const data = {
            _id: 'media-1',
            content: '<iframe class="pym" src="https://example.com"></iframe>'
        };

        render(<RawHtml data={data} />);

        expect(screen.getByTestId('html-pym')).toBeInTheDocument();
    });

    it('renders raw html when content does not contain a pym iframe', () => {
        const data = {
            _id: 'media-2',
            content: '<p>Hello world</p>'
        };

        const { container } = render(<RawHtml data={data} />);

        const wrapper = container.querySelector('#anexo-media-2');

        expect(wrapper).toBeInTheDocument();
        expect(wrapper.innerHTML).toBe('<p>Hello world</p>');
    });

    it('does not render HtmlPym when content does not contain a pym iframe', () => {
        const data = {
            _id: 'media-3',
            content: '<div>No iframe here</div>'
        };

        render(<RawHtml data={data} />);

        expect(screen.queryByTestId('html-pym')).toBeNull();
    });
});
