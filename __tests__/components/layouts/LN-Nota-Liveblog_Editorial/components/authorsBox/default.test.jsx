import React from 'react';
import { render } from '@testing-library/react';
import { useLiveblogAuthors } from '../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/authorsBox/hook/useLiveblogAuthors';
import { scrollToFirstPostOf } from '../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/getUniqueAuthorsFromPosts';
import LiveblogAuthorsBox from '../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/authorsBox/default';

jest.mock(
    '../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/authorsBox/hook/useLiveblogAuthors',
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

describe('LiveblogAuthorsBox', () => {
    it('should match snapshot when shouldShow=true and authors exist', () => {
        useLiveblogAuthors.mockReturnValue({
            shouldShow: true,
            authors: [
                { id: '1', name: 'Author One', photo: '/photo1.jpg' },
                { id: '2', name: 'Author Two', photo: '/photo2.jpg' },
                { id: '3', name: 'Author Three', photo: '/photo3.jpg' }
            ]
        });

        const { container } = render(<LiveblogAuthorsBox />);
        expect(container).toMatchSnapshot();
    });

    it('should render null when shouldShow=false', () => {
        useLiveblogAuthors.mockReturnValue({
            shouldShow: false,
            authors: []
        });

        const { container } = render(<LiveblogAuthorsBox />);
        expect(container.firstChild).toBeNull();
    });
});
