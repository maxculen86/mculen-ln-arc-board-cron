import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Ordered from '../../../../../../components/private/LN/common/lists/ordered';

const BASE_CLASS = 'com-ordered';
const children = [<div key="1">Soy el children</div>, <p key="2">Soy el p</p>];

describe('features - LaNacion - Nota - ordered', () => {
    it('applies extraClass to the ol className', () => {
        const { container } = render(
            <Ordered extraClass="--modifier">{children}</Ordered>
        );
        expect(container.querySelector('ol')).toHaveClass(
            BASE_CLASS,
            '--modifier'
        );
    });

    it('renders only the base class when extraClass is empty', () => {
        const { container } = render(
            <Ordered extraClass="">{children}</Ordered>
        );
        const ol = container.querySelector('ol');
        expect(ol).toHaveClass(BASE_CLASS);
        expect(ol.className).toBe(BASE_CLASS);
    });

    it('matches snapshot', () => {
        const { container } = render(<Ordered>{children}</Ordered>);
        expect(container).toMatchSnapshot();
    });
});
