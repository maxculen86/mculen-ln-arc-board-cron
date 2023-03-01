import React from 'react';
import { render, screen } from '@testing-library/react';
import footerEventLogResult from '../../../../../__mocks__/data/LN10_Footer/footerEventLogResult.json';
import Footer from '../../../../../components/private/LN10/footer';
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
});
