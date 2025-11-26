import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import ImageGalleryEmbed from '../../../../../../../components/features/LN-nota/private/body/imageGalleryEmbed/default';
import { isFotoAl100 } from '../../../../../../../components/features/LN-nota/body/_utils/helpers';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../../components/features/LN-nota/body/_utils/helpers',
    () => ({
        isFotoAl100: jest.fn()
    })
);

jest.mock(
    '../../../../../../../components/features/LN-nota/private/body/imageGalleryEmbed/_helper',
    () => ({
        filterGalleryEmbeds: jest.fn(elements => elements),
        extractGalleryEmbedData: jest.fn(elements =>
            elements.map(el => ({
                galleryId: el.embed?.config?.galleryId || '',
                caption: el.embed?.config?.caption || '',
                diagram: el.embed?.config?.diagram || ''
            }))
        )
    })
);

describe('Components - features - LN-nota - private - body - default', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return null if not FotoAl100', () => {
        isFotoAl100.mockReturnValue(false);
        useAppContext.mockReturnValue({ globalContent: {} });

        const { container } = render(<ImageGalleryEmbed />);
        expect(container.firstChild).toBeNull();
    });

    it('should return null if no gallery data', () => {
        isFotoAl100.mockReturnValue(true);
        useAppContext.mockReturnValue({
            globalContent: { content_elements: [] }
        });

        const { container } = render(<ImageGalleryEmbed />);
        expect(container.firstChild).toBeNull();
    });

    it('should render gallery data correctly and match snapshot', () => {
        isFotoAl100.mockReturnValue(true);

        const mockData = [
            {
                embed: {
                    config: {
                        galleryId: '26AGOYOFKVFD5EYHBN7XVL6T4M',
                        caption: 'Galería de imagenes',
                        diagram: 'grid-1-wide',
                        galleryImages: [
                            {
                                height: 513,
                                resized_url:
                                    '/resizer/v2/ST3FTU5VG5BJNAZV2ERJHZDLA4.jpg?auth=b0d1224066a92ed9d1007a72d1d4c5874bdf93269a9e9fdbdce02dadaf010037',
                                url: 'https://sandbox-resizer.glanacion.com/resizer/v2/ST3FTU5VG5BJNAZV2ERJHZDLA4.jpg?auth=b0d1224066a92ed9d1007a72d1d4c5874bdf93269a9e9fdbdce02dadaf010037&width=768&quality=70&smart=false',
                                width: 768
                            }
                        ]
                    }
                }
            }
        ];

        useAppContext.mockReturnValue({
            globalContent: {
                subtype: 'gallery-embed',
                type: 'custom_embed',
                content_elements: mockData
            }
        });

        const { asFragment, getByText } = render(<ImageGalleryEmbed />);

        expect(getByText(/Galería de imagenes/)).toBeInTheDocument();

        expect(asFragment()).toMatchSnapshot();
    });
});
