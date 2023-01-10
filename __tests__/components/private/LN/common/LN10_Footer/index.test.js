import React from 'react';
import Footer from '../../../../../../components/private/LN/common/LN10_Footer';
import { render, screen } from '@testing-library/react';
import footerEventLogResult from '../../../../../../__mocks__/data/LN10_Footer/footerEventLogResult.json';

describe('Tests - Footer - LN10', () => {
    global.window.dataLayer = [];

    let component;
    beforeEach(() => {
        component = render(<Footer />);
    });

    test('Match snapshot', () => {
        const { container } = component;

        expect(container).toMatchSnapshot();
    });

    test('should first', () => {
        expect(screen.getAllByRole('link')).toHaveLength(39);
    });

    test('should register in dataLayer the click events of each link', () => {
        const links = screen.getAllByRole('link');
        links.forEach(link => link.click());

        expect(window.dataLayer).toStrictEqual(footerEventLogResult);
    });
});
