import React from 'react';
import { render, screen } from '@testing-library/react';
import { Author } from '@ln/contenidos-ui-author';
import { useSignature } from '../../../../../components/features/LN/DS-Signature/hooks/useSignature';
import { getAuthorsNameAndLink } from '../../../../../components/private/common/utils/firmaHelper';
import { getAuthorData } from '../../../../../components/features/LN-nota/signature/signatureHelper';
import StorytellingSignature from '../../../../../components/layouts/LN-nota-storytelling-v2/components/StorytellingSignature';

jest.mock('@ln/contenidos-ui-author', () => ({ Author: jest.fn() }));
jest.mock(
    '../../../../../components/features/LN/DS-Signature/hooks/useSignature',
    () => ({ useSignature: jest.fn() })
);
jest.mock('../../../../../components/private/common/utils/firmaHelper', () => ({
    getAuthorsNameAndLink: jest.fn()
}));
jest.mock(
    '../../../../../components/features/LN-nota/signature/signatureHelper',
    () => ({ getAuthorData: jest.fn() })
);

const GLOBAL_CONTENT = {
    credits: { by: [] },
    content_elements: []
};

const SINGLE_AUTHOR = { name: 'Jane Doe', link: '/autor/jane-doe' };
const MULTI_AUTHORS = [
    { name: 'Jane Doe', link: '/autor/jane-doe' },
    { name: 'John Smith', link: '/autor/john-smith' }
];

const realGetAuthorData = (author, authors, key) =>
    author ? author[key] : authors.map(a => a[key]);

describe('StorytellingSignature', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        Author.mockImplementation(({ author }) => (
            <span data-testid="author">
                {Array.isArray(author) ? author.join(', ') : author}
            </span>
        ));
    });

    describe('when there are no authors', () => {
        beforeEach(() => {
            useSignature.mockReturnValue({ authors: [] });
            getAuthorsNameAndLink.mockReturnValue({ author: false });
        });

        it('should return null', () => {
            const { container } = render(
                <StorytellingSignature globalContent={GLOBAL_CONTENT} />
            );

            expect(container.firstChild).toBeNull();
        });
    });

    describe('when a single author exists', () => {
        beforeEach(() => {
            useSignature.mockReturnValue({ authors: [SINGLE_AUTHOR] });
            getAuthorsNameAndLink.mockReturnValue({ author: SINGLE_AUTHOR });
            getAuthorData.mockImplementation(realGetAuthorData);
        });

        it('should render the Author component', () => {
            render(<StorytellingSignature globalContent={GLOBAL_CONTENT} />);

            expect(screen.getByTestId('author')).toBeTruthy();
        });

        it('should pass variant="default" and size={16} to Author', () => {
            render(<StorytellingSignature globalContent={GLOBAL_CONTENT} />);

            expect(Author.mock.calls[0][0]).toMatchObject({
                variant: 'default',
                size: 16
            });
        });

        it('should pass prefix=false', () => {
            render(<StorytellingSignature globalContent={GLOBAL_CONTENT} />);

            expect(Author.mock.calls[0][0]).toMatchObject({ prefix: false });
        });

        it('should render the centering wrapper', () => {
            const { container } = render(
                <StorytellingSignature globalContent={GLOBAL_CONTENT} />
            );

            expect(container.firstChild.className).toContain('flex');
            expect(container.firstChild.className).toContain('jc-center');
        });
    });

    describe('when multiple authors exist', () => {
        beforeEach(() => {
            useSignature.mockReturnValue({ authors: MULTI_AUTHORS });
            getAuthorsNameAndLink.mockReturnValue({ author: false });
            getAuthorData.mockImplementation(realGetAuthorData);
        });

        it('should render the Author component', () => {
            render(<StorytellingSignature globalContent={GLOBAL_CONTENT} />);

            expect(screen.getByTestId('author')).toBeTruthy();
        });

        it('should pass prefix=true', () => {
            render(<StorytellingSignature globalContent={GLOBAL_CONTENT} />);

            expect(Author.mock.calls[0][0]).toMatchObject({ prefix: true });
        });

        it('should pass author names as an array', () => {
            render(<StorytellingSignature globalContent={GLOBAL_CONTENT} />);

            expect(Author.mock.calls[0][0]).toMatchObject({
                author: ['Jane Doe', 'John Smith']
            });
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with no authors', () => {
            useSignature.mockReturnValue({ authors: [] });
            getAuthorsNameAndLink.mockReturnValue({ author: false });

            const { asFragment } = render(
                <StorytellingSignature globalContent={GLOBAL_CONTENT} />
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with a single author', () => {
            useSignature.mockReturnValue({ authors: [SINGLE_AUTHOR] });
            getAuthorsNameAndLink.mockReturnValue({ author: SINGLE_AUTHOR });
            getAuthorData.mockImplementation(realGetAuthorData);

            const { asFragment } = render(
                <StorytellingSignature globalContent={GLOBAL_CONTENT} />
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with multiple authors', () => {
            useSignature.mockReturnValue({ authors: MULTI_AUTHORS });
            getAuthorsNameAndLink.mockReturnValue({ author: false });
            getAuthorData.mockImplementation(realGetAuthorData);

            const { asFragment } = render(
                <StorytellingSignature globalContent={GLOBAL_CONTENT} />
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
