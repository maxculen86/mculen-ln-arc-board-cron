import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RawHtml from '../../../../../../components/features/LN/common/rawHtml/default';

jest.mock(
    '../../../../../../components/features/LN/common/utils/hasIframeWithPYM',
    () => jest.fn(() => false)
);

const hasIframeWithPYM = require('../../../../../../components/features/LN/common/utils/hasIframeWithPYM');

describe('RawHtml', () => {
    beforeEach(() => {
        hasIframeWithPYM.mockReturnValue(false);
    });

    it('returns null when htmlData is missing', () => {
        const { container } = render(<RawHtml htmlData="" idMedia="media-1" />);
        expect(container.firstChild).toBeNull();
    });

    it('returns null when idMedia is missing', () => {
        const { container } = render(
            <RawHtml htmlData="<p>x</p>" idMedia="" />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders HtmlPym when content contains a pym iframe', () => {
        hasIframeWithPYM.mockReturnValue(true);
        const { container } = render(
            <RawHtml
                htmlData='<iframe class="pym" src="https://example.com"></iframe>'
                idMedia="media-1"
            />
        );
        expect(
            container.querySelector('.com-embed.--html')
        ).toBeInTheDocument();
        expect(
            container.querySelector('.contenido-externo')
        ).toBeInTheDocument();
        expect(container.querySelector('.com-anexo.pym')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('renders raw html when content does not contain a pym iframe', () => {
        const { container } = render(
            <RawHtml htmlData="<p>Hello world</p>" idMedia="media-2" />
        );
        const wrapper = container.querySelector('#anexo-media-2');
        expect(wrapper).toBeInTheDocument();
        expect(wrapper.innerHTML).toBe('<p>Hello world</p>');
        expect(container).toMatchSnapshot();
    });

    it('does not render HtmlPym when content does not contain a pym iframe', () => {
        const { container } = render(
            <RawHtml htmlData="<div>No iframe here</div>" idMedia="media-3" />
        );
        expect(container.querySelector('.com-embed.--html')).toBeNull();
    });

    it('applies custom className to the raw html wrapper', () => {
        const { container } = render(
            <RawHtml
                htmlData="<p>styled</p>"
                idMedia="media-4"
                className="custom-class"
            />
        );
        const wrapper = container.querySelector('#anexo-media-4');
        expect(wrapper).toHaveClass('custom-class');
        expect(container).toMatchSnapshot();
    });
});
