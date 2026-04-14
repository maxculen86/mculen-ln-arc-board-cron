import React from 'react';
import { render } from '@testing-library/react';
import Image from '../../../../../../components/features/LN/common/image/default';
import { getEpigrafe } from '../../../../../../components/private/LN/common/utils/mediaHelper';
import { getImageData } from '../../../../../../components/features/LN/common/image/_helpers/getImageData';

jest.mock(
    '../../../../../../components/private/LN/common/utils/mediaHelper',
    () => ({
        getEpigrafe: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/image/_helpers/getImageData',
    () => ({
        getImageData: jest.fn()
    })
);

jest.mock('../../../../../../components/features/ui/ln/image/default', () => ({
    __esModule: true,
    default: ({
        src,
        alt,
        width,
        height,
        sources,
        srcSet,
        sizes,
        renderImgOnly,
        loading,
        fetchPriority
    }) => (
        <img
            data-testid="image-media"
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            fetchpriority={fetchPriority}
            data-sources={JSON.stringify(sources)}
            {...(srcSet ? { 'data-srcset': srcSet } : {})}
            {...(sizes ? { 'data-sizes': sizes } : {})}
            {...(renderImgOnly ? { 'data-render-img-only': 'true' } : {})}
        />
    )
}));

describe('Image component', () => {
    const dataMock = { id: 'image-data' };

    const pictureSourcesMock = [
        {
            minWidth: 768,
            srcSet: 'https://sandbox-resizer.glanacion.com/resizer/v2/OKE6DQX7ANFLXILFX363CZCMUU.png?auth=ff7acff1f516bd0e275e0a3c3b624921bcd7b57f96e0417ca5138d7b7db069d8&width=780&height=98&quality=70&smart=true'
        }
    ];

    const resizedUrlMock =
        'https://sandbox-resizer.glanacion.com/resizer/v2/OKE6DQX7ANFLXILFX363CZCMUU.png?auth=ff7acff1f516bd0e275e0a3c3b624921bcd7b57f96e0417ca5138d7b7db069d8&width=420&height=53&quality=70&smart=true';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly and matches snapshot', () => {
        getEpigrafe.mockReturnValue({
            caption: 'Image caption',
            credit: 'Image credit'
        });

        getImageData.mockReturnValue({
            src: resizedUrlMock,
            width: 800,
            height: 100,
            alt: '',
            pictureSources: pictureSourcesMock
        });

        const { container } = render(<Image data={dataMock} />);

        expect(container).toMatchSnapshot();
    });

    it('does not set loading and fetchPriority when not provided', () => {
        getImageData.mockReturnValue({
            src: resizedUrlMock,
            width: 800,
            height: 100,
            alt: '',
            pictureSources: pictureSourcesMock
        });

        const { getByTestId } = render(<Image data={dataMock} />);

        const img = getByTestId('image-media');
        expect(img).not.toHaveAttribute('loading');
        expect(img).not.toHaveAttribute('fetchpriority');
    });

    it('sets loading="eager" and fetchPriority="high" when provided', () => {
        getImageData.mockReturnValue({
            src: resizedUrlMock,
            width: 800,
            height: 100,
            alt: '',
            pictureSources: pictureSourcesMock
        });

        const { getByTestId } = render(
            <Image data={dataMock} loading="eager" fetchPriority="high" />
        );

        const img = getByTestId('image-media');
        expect(img).toHaveAttribute('loading', 'eager');
        expect(img).toHaveAttribute('fetchpriority', 'high');
    });

    it('renders hero openings as plain img with srcset and no picture sources', () => {
        getImageData.mockReturnValue({
            src: `${resizedUrlMock}&fallback=1200`,
            srcset: `${resizedUrlMock} 420w, ${resizedUrlMock}&fallback=1200 1200w`,
            sizes: '(min-width: 768px) 880px, 420px',
            width: 1200,
            height: 675,
            alt: 'Hero alt',
            pictureSources: []
        });

        const { getByTestId } = render(
            <Image data={dataMock} isAperturaNota />
        );

        const img = getByTestId('image-media');
        expect(img).toHaveAttribute('data-render-img-only', 'true');
        expect(img).toHaveAttribute(
            'data-srcset',
            `${resizedUrlMock} 420w, ${resizedUrlMock}&fallback=1200 1200w`
        );
        expect(img).toHaveAttribute(
            'data-sizes',
            '(min-width: 768px) 880px, 420px'
        );
        expect(img).toHaveAttribute('data-sources', '[]');
    });
});
