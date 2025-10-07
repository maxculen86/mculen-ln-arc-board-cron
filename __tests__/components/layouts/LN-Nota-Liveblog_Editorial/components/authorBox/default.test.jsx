global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

import React from 'react';
import { screen, render } from '@testing-library/react';
import { useLiveblogAuthors } from '../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/body/authorBox/hook/useLiveblogAuthors';
import { scrollToFirstPostOf } from '../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/getUniqueAuthorsFromPosts';
import AuthorBox from '../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/body/authorBox/default';

const testId = 'author-box';
const baseData = {
    'data-testid': testId
};

const authorList = [
    {
        id: '1',
        name: 'Author One',
        firstName: 'Author',
        lastName: 'One',
        image: { src: '/img1.jpg', alt: 'A1' }
    },
    {
        id: '2',
        name: 'Author Two',
        firstName: 'Author',
        lastName: 'Two',
        image: { src: '/img2.jpg', alt: 'A2' }
    },
    {
        id: '3',
        name: 'Author Three',
        firstName: 'Author',
        lastName: 'Three',
        image: { src: '/img3.jpg', alt: 'A3' }
    }
];

const authorListWithMissingData = [
    {
        id: '1',
        name: '',
        firstName: 'Author',
        lastName: 'One',
        image: { src: '/img1.jpg', alt: 'A1' }
    },
    {
        id: '2',
        name: 'Author Two',
        firstName: 'Author',
        lastName: 'Two',
        image: { src: null, alt: 'A2' }
    },
    {
        name: 'Author Three',
        firstName: 'Author',
        lastName: 'Three',
        image: { src: '/img3.jpg', alt: 'A3' }
    },
    {
        id: '4',
        name: 'Author Four',
        firstName: 'Author',
        lastName: 'Four'
    }
];

jest.mock(
    '../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/body/authorBox/hook/useLiveblogAuthors',
    () => ({
        useLiveblogAuthors: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/getUniqueAuthorsFromPosts',
    () => ({
        scrollToFirstPostOf: jest.fn()
    })
);

describe('AuthorBox', () => {
    it('should match snapshot when shouldShow=true and authors exist', () => {
        useLiveblogAuthors.mockReturnValue({
            shouldShow: true,
            authors: authorList
        });

        render(<AuthorBox {...baseData} />);
        const authorBox = screen.getByTestId(testId);
        expect(authorBox).toBeInTheDocument();
        expect(authorBox).toMatchSnapshot();
    });

    it('should not render when shouldShow=false', () => {
        useLiveblogAuthors.mockReturnValue({
            shouldShow: false,
            authors: []
        });

        render(<AuthorBox {...baseData} />);
        const authorBox = screen.queryByTestId(testId);
        expect(authorBox).not.toBeInTheDocument();
    });

    it('should not render author when name or id is empty', () => {
        useLiveblogAuthors.mockReturnValue({
            shouldShow: true,
            authors: authorListWithMissingData
        });

        const { container } = render(<AuthorBox {...baseData} />);
        const authorList = container.getElementsByClassName('author-button');
        expect(authorList).toHaveLength(2);
    });

    it('renders AuthorButton with placeholder if image missing or is not valid', () => {
        useLiveblogAuthors.mockReturnValue({
            authors: authorListWithMissingData,
            shouldShow: true
        });
        const { container } = render(<AuthorBox {...baseData} />);
        const authorList = container.getElementsByClassName('author-button');
        let placeholderCount = 0;
        Array.from(authorList).forEach(btn => {
            if (btn.querySelector('.avatar-placeholder')) {
                placeholderCount++;
            }
        });
        expect(placeholderCount).toBe(2);
    });
});
