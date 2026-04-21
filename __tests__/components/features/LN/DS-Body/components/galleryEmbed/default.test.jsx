import React from 'react';
import { render } from '@testing-library/react';
import GalleryEmbed from '../../../../../../../components/features/LN/DS-Body/components/galleryEmbed/default';

jest.mock(
    '../../../../../../../components/features/LN/common/galleryEmbed/default',
    () =>
        ({ data }) => (
            <div
                data-testid="gallery-embed-common"
                data-received-data={JSON.stringify(data)}
            />
        )
);

jest.mock(
    '../../../../../../../components/features/LN/common/wrapperBody/default',
    () => ({
        WrapperBody: ({ children, variant }) => (
            <div data-testid="wrapper-body" data-variant={variant}>
                {children}
            </div>
        )
    })
);

describe('Components - features - LN - DS-Body - components - galleryEmbed - default', () => {
    it('should have arcType "gallery-embed"', () => {
        expect(GalleryEmbed.arcType).toBe('gallery-embed');
    });

    it('should render WrapperBody with variant "full-screen"', () => {
        const { getByTestId } = render(<GalleryEmbed />);
        expect(getByTestId('wrapper-body')).toHaveAttribute(
            'data-variant',
            'full-screen'
        );
    });

    it('should pass data prop to GalleryEmbedCommon', () => {
        const mockData = { embed: { config: { galleryId: 'test-123' } } };
        const { getByTestId } = render(<GalleryEmbed data={mockData} />);
        expect(getByTestId('gallery-embed-common')).toHaveAttribute(
            'data-received-data',
            JSON.stringify(mockData)
        );
    });

    it('should render GalleryEmbedCommon inside WrapperBody', () => {
        const { getByTestId } = render(<GalleryEmbed />);
        const wrapper = getByTestId('wrapper-body');
        expect(wrapper).toContainElement(getByTestId('gallery-embed-common'));
    });

    it('should match snapshot', () => {
        const mockData = { embed: { config: { galleryId: 'test-123' } } };
        const { asFragment } = render(<GalleryEmbed data={mockData} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
