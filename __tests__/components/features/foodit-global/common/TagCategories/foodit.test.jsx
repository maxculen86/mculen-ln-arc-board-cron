import React from 'react';
import { render, screen } from '@testing-library/react';
import { TagCategories } from '../../../../../../components/features/foodit-global/common/TagCategories/foodit';

describe('TagCategories', () => {
    it('should render nothing if tagLinks is empty', () => {
        const { container } = render(<TagCategories tagLinks={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render a list of tag links', () => {
        const tagLinks = [
            { href: '/link1', title: 'Link 1' },
            { href: '/link2', title: 'Link 2' },
            { href: '/link3', title: 'Link 3' }
        ];

        render(<TagCategories tagLinks={tagLinks} />);

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(tagLinks.length);
        tagLinks.forEach((link, index) => {
            expect(links[index]).toHaveAttribute('href', link.href);
            expect(links[index]).toHaveTextContent(link.title);
        });
    });

    it('should render bullet icons between links', () => {
        const tagLinks = [
            { href: '/link1', title: 'Link 1' },
            { href: '/link2', title: 'Link 2' },
            { href: '/link3', title: 'Link 3' }
        ];

        render(<TagCategories tagLinks={tagLinks} />);

        const icons = document.querySelectorAll('i');
        expect(icons).toHaveLength(tagLinks.length - 1);
    });
});
