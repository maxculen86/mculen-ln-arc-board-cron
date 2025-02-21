import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import Ticker from '../../../../../components/features/LN-common/LN10_Ticker/default';
import {
    setWarning,
    getUpdatesFromCustomFields
} from '../../../../../components/features/LN-common/LN10_Ticker/_helpers';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});

jest.mock('@ln/contenidos-ui-badge', () => ({
    Badge: jest.fn(() => <div>Mock Badge</div>)
}));

jest.mock(
    '../../../../../components/features/LN-common/LN10_Ticker/_helpers',
    () => ({
        setWarning: jest.fn(),
        getUpdatesFromCustomFields: jest.fn(),
        setUpdatesCustomFields: jest.fn(() => ({}))
    })
);

describe('Ticker Component', () => {
    const mockCustomFields = {
        show: false,
        chapita: 'Breaking News',
        chapitaStyle: 1,
        title0: 'Update 1',
        link0: 'https://example.com/update1'
    };

    const mockContext = {
        isAdmin: false,
        renderables: []
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useAppContext.mockReturnValue(mockContext);
        getUpdatesFromCustomFields.mockReturnValue([
            { title: 'Update 1', link: 'https://example.com/update1' }
        ]);
        setWarning.mockReturnValue({});
    });

    it('should render without crashing', () => {
        render(<Ticker customFields={mockCustomFields} id="ticker-1" />);
        expect(screen.getByTestId('live-component')).toBeInTheDocument();
    });

    it('should display the Badge with correct props if chapita exists', () => {
        render(<Ticker customFields={mockCustomFields} id="ticker-1" />);
        expect(screen.getByText('Mock Badge')).toBeInTheDocument();
    });

    it('should not render if updates array is empty', () => {
        getUpdatesFromCustomFields.mockReturnValue([]);
        const { container } = render(
            <Ticker customFields={mockCustomFields} id="ticker-1" />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should call setWarning with correct arguments', () => {
        render(<Ticker customFields={mockCustomFields} id="ticker-1" />);
        expect(setWarning).toHaveBeenCalledWith({
            hideFeature: false,
            updates: [
                { title: 'Update 1', link: 'https://example.com/update1' }
            ]
        });
    });

    it('should handle isApertura logic correctly', () => {
        useAppContext.mockReturnValue({
            ...mockContext,
            renderables: [{ id: 'ticker-1', sectionName: 'Apertura' }]
        });

        render(<Ticker customFields={mockCustomFields} id="ticker-1" />);
        expect(screen.getByText('Mock Badge')).toBeInTheDocument();
    });
});
