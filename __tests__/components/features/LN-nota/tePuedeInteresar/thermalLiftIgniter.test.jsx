import React from 'react';
import { render } from '@testing-library/react';
import TePuedeInteresar from '../../../../../components/features/LN-nota/tePuedeInteresar/default';
import useTermica from '../../../../../components/private/common/hooks/useTermica';
import useBuildMayInterest from '../../../../../components/features/LN-nota/tePuedeInteresar/_hooks/useBuildMayInterest';

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);
jest.mock(
    '../../../../../components/features/LN-nota/tePuedeInteresar/_hooks/useBuildMayInterest',
    () => jest.fn()
);

const observe = jest.fn();
const unobserve = jest.fn();
const takeRecords = jest.fn(() => {});

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
    takeRecords
}));

describe('Components - Features -  LN-Nota - tePuedeInteresar', () => {
    Object.defineProperty(window, 'performance', {
        value: {
            getEntriesByType: jest.fn().mockReturnValue([{ type: 'navigate' }]),
            measure: jest.fn()
        }
    });

    it('should not render the section if the liftigniter thermal is false', () => {
        useTermica.mockImplementation(() => false);

        const { container } = render(<TePuedeInteresar />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should render the section if the liftigniter thermal is true', () => {
        useTermica.mockImplementation(() => true);

        useBuildMayInterest.mockImplementation(() => ({
            sectionReference: null,
            articles: [
                {
                    _id: '1',
                    headlines: { basic: 'Test Article' },
                    promo_items: {
                        basic: { url: 'https://example.com/image.jpg' }
                    }
                }
            ],
            isReady: true
        }));

        const { getByText } = render(<TePuedeInteresar />);
        expect(getByText('Te puede interesar')).toBeInTheDocument();
    });
});
