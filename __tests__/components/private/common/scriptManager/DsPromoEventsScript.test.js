import React from 'react';
import { render } from '@testing-library/react';
import DsPromoEventsScript from '../../../../../components/private/common/scriptManager/DsPromoEventsScript';

jest.mock('fusion:context', () => ({
    useAppContext: () => ({ contextPath: 'pf', deployment: src => src })
}));

describe('DsPromoEventsScript', () => {
    it('should insert the script into the DOM', () => {
        render(<DsPromoEventsScript />);

        const scriptTag = document.getElementById('script-ds-promo-events');

        expect(scriptTag).not.toBeNull();
    });

    it('should point to the dsPromoEventsScript.min.js bundle', () => {
        render(<DsPromoEventsScript />);

        const scriptTag = document.getElementById('script-ds-promo-events');

        expect(scriptTag.getAttribute('src')).toBe(
            'pf/resources/js/LN/dsPromoEventsScript.min.js'
        );
    });
});
