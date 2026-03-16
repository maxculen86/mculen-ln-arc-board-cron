import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBox from '../../../../../components/features/foodit-global/Queryly/_children/filterBox';
import { SearchContext } from '../../../../../components/features/foodit-global/Queryly/_children/searchContext';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        layout: 'otro-layout',
        siteProperties: {
            layoutsName: {
                FooditChatIA: 'foodit-chat-ia'
            }
        }
    }))
}));
describe('FilterBox Component', () => {
    const mockToggleDrawer = jest.fn();
    const mockApplyFilter = jest.fn();
    const mockRemoveFilters = jest.fn();

    const defaultContextValue = {
        data: { listFilters: [] },
        loading: false,
        applyFilter: mockApplyFilter,
        removeFilters: mockRemoveFilters,
        appliedFilters: [],
        filters: []
    };

    const renderComponent = (contextValue = defaultContextValue) => {
        return render(
            <SearchContext.Provider value={contextValue}>
                <FilterBox toggleDrawer={mockToggleDrawer} />
            </SearchContext.Provider>
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should display the skeleton loader when loading is true', () => {
        renderComponent({ ...defaultContextValue, loading: true });
        expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
    });

    it('should display applied filters as chips', () => {
        const appliedFilters = [
            { group: 'category', value: 'filter1' },
            { group: 'category', value: 'filter2' }
        ];

        renderComponent({ ...defaultContextValue, appliedFilters });

        expect(
            screen.getAllByRole('button', { name: /filter1/i })
        ).toHaveLength(1);
        expect(
            screen.getAllByRole('button', { name: /filter2/i })
        ).toHaveLength(1);
    });

    it('should call removeFilters when clicking on a chip', () => {
        const appliedFilters = [{ group: 'category', key: 'filter1' }];

        renderComponent({ ...defaultContextValue, appliedFilters });

        const chipButton = screen.getByRole('button', { name: /filter1/i });
        fireEvent.click(chipButton);

        expect(mockRemoveFilters).toHaveBeenCalledWith({
            nameFilter: 'filter1',
            category: 'category'
        });
    });

    it('should display the "Limpiar filtros" button when filters are applied', () => {
        const appliedFilters = [{ group: 'category', value: 'filter1' }];

        renderComponent({ ...defaultContextValue, appliedFilters });

        const clearFiltersButton = screen.getByRole('button', {
            name: /limpiar filtros/i
        });
        expect(clearFiltersButton).toBeInTheDocument();

        fireEvent.click(clearFiltersButton);
        expect(mockRemoveFilters).toHaveBeenCalledWith({ removeAll: true });
    });

    it('should render the list of filter groups when listFilters has data', () => {
        const listFilters = [
            {
                name: 'Filter Group 1',
                group: 'group1',
                childrens: [{ label: 'Option 1', value: 'value1' }]
            },
            {
                name: 'Filter Group 2',
                group: 'group2',
                childrens: [{ label: 'Option 2', value: 'value2' }]
            }
        ];

        renderComponent({ ...defaultContextValue, data: { listFilters } });

        expect(screen.getByText(/filter group 1/i)).toBeInTheDocument();
        expect(screen.getByText(/filter group 2/i)).toBeInTheDocument();
    });

    it('should not render filter groups if listFilters is empty', () => {
        renderComponent();

        expect(screen.queryByText(/filter group/i)).not.toBeInTheDocument();
    });

    it('should call toggleDrawer when the "Cerrar" button is clicked', () => {
        renderComponent();

        const closeButton = screen.getByRole('button', { name: /cerrar/i });
        fireEvent.click(closeButton);

        expect(mockToggleDrawer).toHaveBeenCalledTimes(1);
    });

    it('should call removeFilters with removeAll when the "Limpiar" button is clicked', () => {
        const appliedFilters = [{ group: 'category', value: 'filter1' }];
        renderComponent({ ...defaultContextValue, appliedFilters });

        const clearButtons = screen.getAllByRole('button', {
            name: /limpiar/i
        });
        const clearButton = clearButtons.find(
            button => button.textContent === 'Limpiar'
        );
        expect(clearButton).not.toBeDisabled();
        fireEvent.click(clearButton);

        expect(mockRemoveFilters).toHaveBeenCalledWith({ removeAll: true });
    });

    it('should render correctly when there are no filters applied', () => {
        renderComponent();

        expect(screen.queryByText(/limpiar filtros/i)).not.toBeInTheDocument();
    });
});
