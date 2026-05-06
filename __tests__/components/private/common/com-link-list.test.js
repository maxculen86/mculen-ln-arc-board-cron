import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ComLinkList from '../../../../components/private/common/com-link-list';

const list = [
    {
        link: 'http://www.google.com',
        target: '_blank',
        textname: 'LN Link Custom',
        title: 'LN Link Custom',
        classCondition: '',
        dataEvent: '',
        dataSection: '',
        size: '',
        style: '',
        withSponsoredLink: false,
        rel: undefined
    },
    {
        link: '/revista-ohlala',
        target: '',
        textname: 'OHLALA',
        title: 'OHLALA',
        classCondition: '',
        dataEvent: '',
        dataSection: '',
        size: '',
        style: '',
        withSponsoredLink: false,
        rel: undefined
    }
];

describe('LN-Private-Common-ComLinkList', () => {
    describe('with empty or no list', () => {
        it('renders nothing when no props', () => {
            const { container } = render(<ComLinkList />);
            expect(container.firstChild).toBeNull();
        });

        it('renders nothing when list is empty', () => {
            const { container } = render(<ComLinkList list={[]} />);
            expect(container.firstChild).toBeNull();
        });
    });

    describe('with a filled list', () => {
        it('renders a ul with the correct base classes', () => {
            const { container } = render(<ComLinkList list={list} />);
            const ul = container.querySelector('ul');
            expect(ul).toBeInTheDocument();
            expect(ul).toHaveClass('com-unordered', '--no-scrollbar');
        });

        it('renders the correct number of list items', () => {
            const { container } = render(<ComLinkList list={list} />);
            const items = container.querySelectorAll('li');
            expect(items).toHaveLength(list.length);
        });

        it('renders link text content', () => {
            render(<ComLinkList list={list} />);
            expect(screen.getByText('LN Link Custom')).toBeInTheDocument();
            expect(screen.getByText('OHLALA')).toBeInTheDocument();
        });

        it('appends extraClass to the ul className', () => {
            const { container } = render(
                <ComLinkList list={list} extraClass="--tags" />
            );
            const ul = container.querySelector('ul');
            expect(ul).toHaveClass('com-unordered', '--no-scrollbar', '--tags');
        });

        it('matches snapshot', () => {
            const { container } = render(<ComLinkList list={list} />);
            expect(container).toMatchSnapshot();
        });
    });
});
