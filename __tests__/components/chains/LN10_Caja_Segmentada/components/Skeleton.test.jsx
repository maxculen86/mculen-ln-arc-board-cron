import React from 'react';
import { render } from '@testing-library/react';
import { SkeletonSegmentedBox } from '../../../../../components/chains/LN10_Caja_Segmentada/components/Skeleton';

jest.mock('@ln/contenidos-ui-bngrid', () => ({
    Bngrid: function MockBngrid({ children, ...props }) {
        return (
            <div data-testid="bngrid" {...props}>
                {children}
            </div>
        );
    }
}));

jest.mock('@ln/common-ui-skeleton', () => ({
    Skeleton: function MockSkeleton(props) {
        return <div data-testid="skeleton" {...props} />;
    }
}));

describe('SkeletonSegmentedBox', () => {
    it('should render without crashing', () => {
        const { container } = render(<SkeletonSegmentedBox />);
        expect(container).toBeInTheDocument();
    });

    it('should render main container with correct structure', () => {
        const { container } = render(<SkeletonSegmentedBox />);
        const mainContainer = container.firstChild;

        expect(mainContainer).toHaveClass('flex', 'flex-column', 'mt-72');
    });

    it('should render Bngrid component', () => {
        const { getByTestId } = render(<SkeletonSegmentedBox />);
        const bngrid = getByTestId('bngrid');

        expect(bngrid).toBeInTheDocument();
    });

    it('should render skeleton elements', () => {
        const { getAllByTestId } = render(<SkeletonSegmentedBox />);
        const skeletons = getAllByTestId('skeleton');

        expect(skeletons.length).toBeGreaterThan(5);
    });

    it('should render article elements for cards', () => {
        const { container } = render(<SkeletonSegmentedBox />);
        const articles = container.querySelectorAll('article');

        expect(articles.length).toBe(4);
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<SkeletonSegmentedBox />);
        expect(asFragment()).toMatchSnapshot();
    });
});
