import React from 'react';
import { render, screen } from '@testing-library/react';
import Interstitial from '../../../../../../components/features/LN-10-global/common/body/interstitial/default';
import config from '../../../../../../properties/sites/la-nacion-ar';
import { useAppContext } from 'fusion:context';

// Mock useAppContext
jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

const { layoutsName = {} } = config || {};

const testId = 'interstitial';

const baseData = {
    data: {
        url: 'https://ejemplo.com',
        content: 'Texto del botón'
    },
    'data-testid': testId
};

const emptyData = {
    ...baseData,
    data: {}
};

const onlyUrlData = {
    ...baseData,
    data: { url: 'https://ejemplo.com' }
};

const onlyContentData = {
    ...baseData,
    data: { content: 'Texto del botón' }
};

describe('Interstitial', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue({ layout: undefined });
    });

    it('renders correctly and matches snapshot', () => {
        render(<Interstitial {...baseData} />);
        const interstitial = screen.getByTestId(testId);
        expect(interstitial).toBeInTheDocument();
        expect(interstitial).toMatchSnapshot();
    });

    it('does not render if url and content are missing', () => {
        render(<Interstitial {...emptyData} />);
        const interstitial = screen.queryByTestId(testId);
        expect(interstitial).not.toBeInTheDocument();
    });

    it('does not render if only url is present', () => {
        render(<Interstitial {...onlyUrlData} />);
        const interstitial = screen.queryByTestId(testId);
        expect(interstitial).not.toBeInTheDocument();
    });

    it('does not render if only content is present', () => {
        render(<Interstitial {...onlyContentData} />);
        const interstitial = screen.queryByTestId(testId);
        expect(interstitial).not.toBeInTheDocument();
    });

    it('renders with FotoAl100 layout and matches snapshot', () => {
        useAppContext.mockReturnValue({ layout: layoutsName.FotoAl100 });
        render(<Interstitial {...baseData} />);
        const interstitial = screen.queryByTestId(testId);
        expect(interstitial).toBeInTheDocument();
        expect(interstitial).toMatchSnapshot();
    });
});
