import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomMultimedia from '../../../../../../../components/features/LN/DS-Body/components/customMultimedia/default';
import Context from 'fusion:context';

jest.mock(
    '../../../../../../../components/private/LN/common/utils/urlForPrerollAds',
    () => jest.fn(() => 'https://mock-tags-url.com')
);

jest.mock(
    '../../../../../../../components/private/LN/common/utils/getSourcesJw',
    () => jest.fn(() => ({ file: 'https://mock-source.mp4' }))
);

jest.mock(
    '../../../../../../../components/features/LN/common/video/component/VideoFacade',
    () => {
        return function MockVideoFacade({ mediaId }) {
            return <div id={`facade-${mediaId}`} data-testid="video-facade" />;
        };
    }
);

jest.mock(
    '../../../../../../../components/private/common/scriptManager/snippetVideo',
    () => {
        return function MockVideoPlayerSnippet() {
            return <script data-testid="video-snippet" />;
        };
    }
);

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:static', () => ({ children }) => <>{children}</>);

jest.mock(
    '../../../../../../../components/private/LN/nota/cuerpo/htmlPym',
    () => () => <div data-testid="html-pym" />
);

jest.mock(
    '../../../../../../../components/features/LN/common/utils/hasIframeWithPYM',
    () => jest.fn(() => false)
);

const hasIframeWithPYM = require('../../../../../../../components/features/LN/common/utils/hasIframeWithPYM');

const videoJw = {
    title: 'Test Video Title',
    description: '',
    epigraphTitle: 'Epigraph',
    playlist: [
        {
            mediaid: 'testMedia123',
            images: [],
            image: 'fallback.jpg',
            sources: [{ file: 's.mp4', type: 'video/mp4' }]
        }
    ]
};

const videoDataEmbed = {
    embed: {
        config: {
            mediaType: 'video',
            variant: '70',
            idPlayer: 'mockPlayer123',
            videoJw
        }
    }
};

const htmlDataEmbed = {
    _id: 'embed-123',
    embed: {
        config: {
            mediaType: 'html',
            variant: '100',
            content: '<div class="embed">hello</div>'
        }
    }
};

describe('CustomMultimedia', () => {
    beforeEach(() => {
        Context.useAppContext.mockReturnValue({
            outputType: 'default',
            arcSite: 'la-nacion-ar',
            deployment: jest.fn(path => path),
            contextPath: '/pf',
            globalContent: { subtype: '', promo_items: {} },
            layout: ''
        });
        hasIframeWithPYM.mockReturnValue(false);
    });

    it('renders the JW player with seventy variant when mediaType is video and variant is 70', () => {
        const { container } = render(
            <CustomMultimedia data={videoDataEmbed} />
        );
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('col-span-8');
        expect(wrapper.className).toMatch(/lg:w-\[70vw\]/);
        expect(wrapper.className).toMatch(/aspect-16\/9/);
        expect(
            document.querySelector('[data-has-jwplayer="true"]')
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('renders hundred variant when variant is 100 for video', () => {
        const data = {
            embed: {
                config: {
                    ...videoDataEmbed.embed.config,
                    variant: '100'
                }
            }
        };
        const { container } = render(<CustomMultimedia data={data} />);
        const wrapper = container.firstChild;
        expect(wrapper.className).toMatch(/w-screen/);
        expect(wrapper.className).not.toMatch(/lg:w-\[70vw\]/);
        expect(container).toMatchSnapshot();
    });

    it('defaults to hundred when variant is missing for video', () => {
        const data = {
            embed: {
                config: {
                    mediaType: 'video',
                    idPlayer: 'mockPlayer123',
                    videoJw
                }
            }
        };
        const { container } = render(<CustomMultimedia data={data} />);
        expect(container.firstChild.className).toMatch(/w-screen/);
        expect(container.firstChild.className).not.toMatch(/lg:w-\[70vw\]/);
        expect(container).toMatchSnapshot();
    });

    it('renders HTML inline when mediaType is html and variant is 100', () => {
        const { container } = render(<CustomMultimedia data={htmlDataEmbed} />);
        const htmlTarget = document.querySelector('#anexo-embed-123');
        expect(htmlTarget).toBeInTheDocument();
        expect(htmlTarget.innerHTML).toContain('hello');
        expect(container.querySelector('[data-testid="html-pym"]')).toBeNull();
        expect(container).toMatchSnapshot();
    });

    it('renders HtmlPym when html content contains a PYM iframe', () => {
        hasIframeWithPYM.mockReturnValue(true);
        const { container } = render(<CustomMultimedia data={htmlDataEmbed} />);
        const pym = container.querySelector('[data-testid="html-pym"]');
        expect(pym).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('renders HTML module with seventy variant when variant is 70', () => {
        const data = {
            _id: 'embed-123',
            embed: {
                config: {
                    mediaType: 'html',
                    variant: '70',
                    content: '<p>x</p>'
                }
            }
        };
        const { container } = render(<CustomMultimedia data={data} />);
        expect(container.firstChild.className).toMatch(/lg:w-\[70vw\]/);
        expect(container).toMatchSnapshot();
    });

    it('returns null when mediaType is html but no html content', () => {
        const data = {
            _id: 'embed-123',
            embed: { config: { mediaType: 'html', variant: '100' } }
        };
        const { container } = render(<CustomMultimedia data={data} />);
        expect(container.firstChild).toBeNull();
    });

    it('returns null when mediaType is empty', () => {
        const data = { embed: { config: { variant: '100' } } };
        const { container } = render(<CustomMultimedia data={data} />);
        expect(container.firstChild).toBeNull();
    });

    it('declares arcType equals custom-multimedia', () => {
        expect(CustomMultimedia.arcType).toBe('custom-multimedia');
    });
});
