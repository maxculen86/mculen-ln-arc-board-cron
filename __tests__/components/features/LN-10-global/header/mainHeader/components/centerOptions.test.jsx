import React from 'react';
import { render, screen } from '@testing-library/react';
import { CenterOptions } from '../../../../../../../components/features/LN-10-global/header/mainHeader/components/centerOptions';

jest.mock('@ln/common-ui-header', () => ({
    MainHeader: {
        Brand: ({ href, title, children, className }) => (
            <a href={href} title={title} className={className}>
                {children}
            </a>
        )
    }
}));

jest.mock(
    '../../../../../../../components/features/LN-10-global/header/context',
    () => ({
        useHeaderContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../../components/features/LN-10-global/header/mainHeader/_helper',
    () => ({
        logoCallback: jest.fn()
    })
);

jest.mock(
    '../../../../../../../components/private/common/banners/bannersDivHome',
    () => ({ logoHeader: null })
);

const {
    useHeaderContext
} = require('../../../../../../../components/features/LN-10-global/header/context');

describe('CenterOptions — LN-10-global', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useHeaderContext.mockReturnValue({
            centerOptionsClassNames: 'test-class',
            negative: false
        });
    });

    describe('navigation link', () => {
        it('should render a link pointing to the homepage', () => {
            const { container } = render(<CenterOptions />);
            expect(container.querySelector('a[href="/"]')).toBeInTheDocument();
        });

        it('should render the link with the accessible title', () => {
            render(<CenterOptions />);
            expect(
                screen.getByTitle('Ir a la página principal')
            ).toBeInTheDocument();
        });

        it('should apply className from context to the link', () => {
            render(<CenterOptions />);
            expect(
                screen.getByTitle('Ir a la página principal')
            ).toHaveAttribute('class', 'test-class');
        });
    });

    describe('SVG logo fill', () => {
        it('should apply dark fill when negative is false', () => {
            const { container } = render(<CenterOptions />);
            expect(container.querySelector('path')).toHaveAttribute(
                'fill',
                '#006998'
            );
        });

        it('should apply white fill when negative is true', () => {
            useHeaderContext.mockReturnValue({
                centerOptionsClassNames: 'test-class',
                negative: true
            });
            const { container } = render(<CenterOptions />);
            expect(container.querySelector('path')).toHaveAttribute(
                'fill',
                '#fff'
            );
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with negative false', () => {
            const { asFragment } = render(<CenterOptions />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with negative true', () => {
            useHeaderContext.mockReturnValue({
                centerOptionsClassNames: 'test-class',
                negative: true
            });
            const { asFragment } = render(<CenterOptions />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
