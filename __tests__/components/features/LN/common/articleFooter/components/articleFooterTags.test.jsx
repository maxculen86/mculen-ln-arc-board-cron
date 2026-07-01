import React from 'react';
import { render, screen } from '@testing-library/react';
import Tags from '../../../../../../../components/features/LN/common/articleFooter/components/articleFooterTags';

jest.mock('@ln/ds-common-scrollarea', () => {
    const Scrollarea = ({ children }) => (
        <div data-testid="scrollarea">{children}</div>
    );
    Scrollarea.Content = ({ children }) => (
        <div data-testid="scrollarea-content">{children}</div>
    );
    Scrollarea.Arrow = ({ children }) => (
        <div data-testid="scrollarea-arrow">{children}</div>
    );
    Scrollarea.Gradient = () => <div data-testid="scrollarea-gradient" />;
    return { Scrollarea };
});

jest.mock('@ln/ds-common-link', () => ({
    Link: ({ children, href }) => <a href={href}>{children}</a>
}));

jest.mock(
    '../../../../../../../components/features/ui/ln/icon/default',
    () =>
        function MockIcon({ name }) {
            return <i data-testid="icon" data-name={name} />;
        }
);

const sampleTags = [
    { href: '/economia', title: 'Economía', children: 'Economía' },
    { href: '/dolar', title: 'Dólar hoy', children: 'Dólar hoy' },
    { href: '/inflacion', title: 'Inflación', children: 'Inflación' }
];

describe('Tags', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when there are no tags', () => {
        it('should render null when tags is an empty array', () => {
            const { container } = render(<Tags tags={[]} />);

            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('when tags are provided', () => {
        it('should render a link per tag', () => {
            render(<Tags tags={sampleTags} />);

            expect(screen.getAllByRole('link')).toHaveLength(sampleTags.length);
        });

        it('should render a bullet separator between tags but not before the first one', () => {
            render(<Tags tags={sampleTags} />);

            const separators = screen
                .getAllByTestId('icon')
                .filter(icon => icon.dataset.name === 'bullet-filled');

            expect(separators).toHaveLength(sampleTags.length - 1);
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with a list of tags', () => {
            const { asFragment } = render(<Tags tags={sampleTags} />);

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
