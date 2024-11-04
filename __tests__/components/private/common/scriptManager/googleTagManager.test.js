import React from 'react';
import { render } from '@testing-library/react';
import GTM from '../../../../../components/private/common/scriptManager/googleTagManager';

describe('GTM Component', () => {
    const gtmId = 'GTM-XXXX';

    test('renders script tag when location is head', () => {
        const { container } = render(<GTM id={gtmId} location="head" />);

        const scriptTag = container.querySelector('script');
        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag.innerHTML).toContain(gtmId);
    });

    test('renders noscript tag when location is body-top', () => {
        const { container } = render(<GTM id={gtmId} location="body-top" />);

        const noscriptTag = container.querySelector('noscript');
        expect(noscriptTag).toBeInTheDocument();
    });

    test('returns null when location is not head or body-top', () => {
        const { container } = render(<GTM id={gtmId} location="footer" />);
        expect(container.firstChild).toBeNull();
    });
});