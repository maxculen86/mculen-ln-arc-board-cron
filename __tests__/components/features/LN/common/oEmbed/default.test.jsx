import React from 'react';
import { render } from '@testing-library/react';
import ensureIframeLazyLoading from '../../../../../../components/features/LN/common/oEmbed/helpers/ensureIframeLazyLoading';
import OEmbed from '../../../../../../components/features/LN/common/oEmbed/default';

jest.mock(
    '../../../../../../components/features/LN/common/oEmbed/helpers/ensureIframeLazyLoading'
);

describe('OEmbed', () => {
    const htmlMock = '<iframe src="video.html"></iframe>';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the html returned by ensureIframeLazyLoading', () => {
        ensureIframeLazyLoading.mockReturnValue({
            __html: '<iframe loading="lazy" src="video.html"></iframe>'
        });

        const { container } = render(
            <OEmbed
                data={{
                    subtype: 'youtube',
                    raw_oembed: { html: htmlMock }
                }}
            />
        );

        const iframe = container.querySelector('iframe');

        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('loading', 'lazy');
    });

    it('calls ensureIframeLazyLoading with the responsive iframe html', () => {
        ensureIframeLazyLoading.mockReturnValue({ __html: htmlMock });

        render(
            <OEmbed
                data={{
                    subtype: 'vimeo',
                    raw_oembed: { html: htmlMock }
                }}
            />
        );

        expect(ensureIframeLazyLoading).toHaveBeenCalledWith({
            subtype: 'vimeo',
            tagHtml: expect.stringContaining('width:100%')
        });
    });

    it('renders empty html when raw_oembed.html is missing', () => {
        ensureIframeLazyLoading.mockReturnValue({ __html: '' });

        const { container } = render(
            <OEmbed
                data={{
                    subtype: 'youtube',
                    raw_oembed: {}
                }}
            />
        );

        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass(
            'col-span-8',
            'md:col-span-10',
            'md:col-start-2',
            'xl:col-span-8',
            'xl:col-start-5',
            'max-w-550',
            'md:max-w-635'
        );
        const innerDiv = wrapper.firstChild;
        expect(innerDiv).toBeInTheDocument();
        expect(innerDiv.innerHTML).toBe('');
    });

    it('does not crash when data object is valid but html is empty', () => {
        ensureIframeLazyLoading.mockReturnValue({ __html: '' });

        expect(() =>
            render(
                <OEmbed
                    data={{
                        subtype: 'youtube',
                        raw_oembed: { html: '' }
                    }}
                />
            )
        ).not.toThrow();
    });
});
