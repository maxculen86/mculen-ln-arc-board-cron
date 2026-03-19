import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SelectMenu } from '../../../../../../../components/features/foodit-global/common/MenuSemanal/SaveMenu/SelectMenu';

// Mock dependencies
jest.mock('@ln/common-ui-select', () => {
    const Select = ({ label, onChange, children, className }) => (
        <div data-testid="select" className={className}>
            <div data-testid="select-label">{label}</div>
            <div
                data-testid="select-options"
                onClick={e => {
                    const value = e.target.dataset.value;
                    const optionLabel = e.target.dataset.label;
                    if (value) {
                        onChange?.({ value, label: optionLabel });
                    }
                }}
            >
                {children}
            </div>
        </div>
    );

    Select.Options = ({ value, label, as: Component, className }) => {
        if (Component) {
            return (
                <Component
                    data-value={value}
                    data-label={label}
                    className={className}
                />
            );
        }
        return (
            <div
                data-testid={`option-${value}`}
                data-value={value}
                data-label={label}
                className={className}
            >
                {label}
            </div>
        );
    };

    return { Select };
});

jest.mock('@ln/foodit-ui-itemcard', () => ({
    Itemcard: ({
        disabled = false,
        className = '',
        'data-value': dataValue,
        'data-label': dataLabel,
        ...props
    }) => (
        <div
            data-testid="itemcard"
            data-disabled={disabled}
            data-value={dataValue}
            data-label={dataLabel}
            className={className}
            {...props}
        />
    )
}));

const mockWeeklyMenu = [
    {
        bookmarkId: 'bm1',
        bookmarkGroup: 'monday',
        bookmarkContent: {
            id: 'article-123',
            food: 'lunch'
        }
    },
    {
        bookmarkId: 'bm2',
        bookmarkGroup: 'tuesday',
        bookmarkContent: {
            id: 'article-456',
            food: 'dinner'
        }
    }
];

describe('SelectMenu', () => {
    let props;

    beforeEach(() => {
        props = {
            setSelectedDay: jest.fn(),
            setSelectedFood: jest.fn(),
            selectedDay: '',
            selectedFood: '',
            articleId: 'article-789',
            weeklyMenu: mockWeeklyMenu,
            menuToEdit: {}
        };
    });

    describe('Rendering', () => {
        it('should render two select components (day and food)', () => {
            render(<SelectMenu {...props} />);
            const selects = screen.getAllByTestId('select');
            expect(selects).toHaveLength(2);
        });

        it('should render day select with default label', () => {
            render(<SelectMenu {...props} />);
            const labels = screen.getAllByTestId('select-label');
            expect(labels[0]).toHaveTextContent('Seleccionar día');
        });

        it('should render food select with default label', () => {
            render(<SelectMenu {...props} />);
            const labels = screen.getAllByTestId('select-label');
            expect(labels[1]).toHaveTextContent('Seleccionar comida');
        });

        it('should render all 7 day options', () => {
            render(<SelectMenu {...props} />);
            const itemcards = screen.getAllByTestId('itemcard');
            // 7 days + 3 meals = 10 total
            expect(itemcards.length).toBeGreaterThanOrEqual(7);
        });

        it('should render all 3 meal options', () => {
            render(<SelectMenu {...props} />);
            const itemcards = screen.getAllByTestId('itemcard');
            // 7 days + 3 meals = 10 total
            expect(itemcards).toHaveLength(10);
        });
    });

    describe('Day selection', () => {
        it('should call setSelectedDay when a day is selected', () => {
            render(<SelectMenu {...props} />);
            const selects = screen.getAllByTestId('select-options');
            const daySelect = selects[0];

            // Find and click a day option
            const mondayOption = daySelect.querySelector(
                '[data-value="monday"]'
            );
            fireEvent.click(mondayOption);

            expect(props.setSelectedDay).toHaveBeenCalledWith('monday');
        });

        it('should update label when day is selected', () => {
            const { rerender } = render(<SelectMenu {...props} />);

            // Update props with selected day
            rerender(<SelectMenu {...props} selectedDay="monday" />);

            const labels = screen.getAllByTestId('select-label');
            expect(labels[0]).toHaveTextContent('Lunes');
        });
    });

    describe('Food selection', () => {
        it('should call setSelectedFood when a food is selected', () => {
            render(<SelectMenu {...props} />);
            const selects = screen.getAllByTestId('select-options');
            const foodSelect = selects[1];

            // Find and click a food option
            const lunchOption = foodSelect.querySelector(
                '[data-value="lunch"]'
            );
            fireEvent.click(lunchOption);

            expect(props.setSelectedFood).toHaveBeenCalledWith('lunch');
        });

        it('should update label when food is selected', () => {
            const { rerender } = render(<SelectMenu {...props} />);

            // Update props with selected food
            rerender(<SelectMenu {...props} selectedFood="lunch" />);

            const labels = screen.getAllByTestId('select-label');
            expect(labels[1]).toHaveTextContent('Almuerzo');
        });
    });

    describe('Disabling logic - prevent duplicate day/meal combinations', () => {
        it('should disable a meal if already added to selected day', () => {
            // monday + lunch is already in weeklyMenu for article-123
            render(
                <SelectMenu
                    {...props}
                    selectedDay="monday"
                    articleId="article-123"
                />
            );

            const itemcards = screen.getAllByTestId('itemcard');
            const lunchCard = itemcards.find(
                card => card.dataset.value === 'lunch'
            );

            expect(lunchCard).toHaveAttribute('data-disabled', 'true');
        });

        it('should not disable meals if day is not selected', () => {
            render(<SelectMenu {...props} selectedDay="" />);

            const itemcards = screen.getAllByTestId('itemcard');
            const mealCards = itemcards.filter(
                card =>
                    card.dataset.value === 'lunch' ||
                    card.dataset.value === 'breakfast' ||
                    card.dataset.value === 'dinner'
            );

            mealCards.forEach(card => {
                expect(card).toHaveAttribute('data-disabled', 'false');
            });
        });

        it('should disable a day if already added with selected meal', () => {
            // tuesday + dinner is already in weeklyMenu for article-456
            render(
                <SelectMenu
                    {...props}
                    selectedFood="dinner"
                    articleId="article-456"
                />
            );

            const itemcards = screen.getAllByTestId('itemcard');
            const tuesdayCard = itemcards.find(
                card => card.dataset.value === 'tuesday'
            );

            expect(tuesdayCard).toHaveAttribute('data-disabled', 'true');
        });

        it('should not disable days if food is not selected', () => {
            render(<SelectMenu {...props} selectedFood="" />);

            const itemcards = screen.getAllByTestId('itemcard');
            const dayCards = itemcards.filter(
                card =>
                    card.dataset.value === 'monday' ||
                    card.dataset.value === 'tuesday' ||
                    card.dataset.value === 'wednesday'
            );

            dayCards.forEach(card => {
                expect(card).toHaveAttribute('data-disabled', 'false');
            });
        });

        it('should only disable combinations for the current articleId', () => {
            // article-123 has monday+lunch
            // But we're trying to add a different article (article-789)
            render(
                <SelectMenu
                    {...props}
                    selectedDay="monday"
                    articleId="article-789"
                />
            );

            const itemcards = screen.getAllByTestId('itemcard');
            const lunchCard = itemcards.find(
                card => card.dataset.value === 'lunch'
            );

            // Should NOT be disabled because it's a different article
            expect(lunchCard).toHaveAttribute('data-disabled', 'false');
        });
    });

    describe('Edit mode - menuToEdit prop', () => {
        it('should pre-populate selections when menuToEdit is provided', () => {
            const menuToEdit = {
                bookmarkGroup: 'wednesday',
                bookmarkContent: {
                    food: 'breakfast'
                }
            };

            render(<SelectMenu {...props} menuToEdit={menuToEdit} />);

            waitFor(() => {
                expect(props.setSelectedDay).toHaveBeenCalledWith('wednesday');
                expect(props.setSelectedFood).toHaveBeenCalledWith('breakfast');
            });
        });

        it('should not set values if menuToEdit is empty', () => {
            render(<SelectMenu {...props} menuToEdit={{}} />);

            expect(props.setSelectedDay).not.toHaveBeenCalled();
            expect(props.setSelectedFood).not.toHaveBeenCalled();
        });

        it('should handle partial menuToEdit gracefully', () => {
            const menuToEdit = {
                bookmarkGroup: 'friday'
                // Missing bookmarkContent
            };

            render(<SelectMenu {...props} menuToEdit={menuToEdit} />);

            waitFor(() => {
                expect(props.setSelectedDay).toHaveBeenCalledWith('friday');
                expect(props.setSelectedFood).toHaveBeenCalledWith(undefined);
            });
        });
    });

    describe('Edge cases', () => {
        it('should handle empty weeklyMenu array', () => {
            render(<SelectMenu {...props} weeklyMenu={[]} />);

            const itemcards = screen.getAllByTestId('itemcard');
            // No options should be disabled
            itemcards.forEach(card => {
                expect(card).toHaveAttribute('data-disabled', 'false');
            });
        });

        it('should handle null weeklyMenu', () => {
            render(<SelectMenu {...props} weeklyMenu={null} />);

            const itemcards = screen.getAllByTestId('itemcard');
            // Should not crash, all options available
            itemcards.forEach(card => {
                expect(card).toHaveAttribute('data-disabled', 'false');
            });
        });

        it('should handle undefined articleId', () => {
            render(<SelectMenu {...props} articleId={undefined} />);

            expect(screen.getAllByTestId('itemcard')).toHaveLength(10);
        });

        it('should handle weeklyMenu items without bookmarkContent', () => {
            const malformedMenu = [
                {
                    bookmarkId: 'bm1',
                    bookmarkGroup: 'monday'
                    // Missing bookmarkContent
                }
            ];

            render(<SelectMenu {...props} weeklyMenu={malformedMenu} />);

            // Should not crash
            expect(screen.getAllByTestId('itemcard')).toHaveLength(10);
        });
    });

    describe('Label mapping', () => {
        it('should map day IDs to Spanish labels correctly', () => {
            const { rerender } = render(<SelectMenu {...props} />);

            const dayMappings = [
                { id: 'monday', label: 'Lunes' },
                { id: 'tuesday', label: 'Martes' },
                { id: 'wednesday', label: 'Miércoles' },
                { id: 'thursday', label: 'Jueves' },
                { id: 'friday', label: 'Viernes' },
                { id: 'saturday', label: 'Sábado' },
                { id: 'sunday', label: 'Domingo' }
            ];

            dayMappings.forEach(({ id, label }) => {
                rerender(<SelectMenu {...props} selectedDay={id} />);
                const labels = screen.getAllByTestId('select-label');
                expect(labels[0]).toHaveTextContent(label);
            });
        });

        it('should map food IDs to Spanish labels correctly', () => {
            const { rerender } = render(<SelectMenu {...props} />);

            const foodMappings = [
                { id: 'breakfast', label: 'Desayuno' },
                { id: 'lunch', label: 'Almuerzo' },
                { id: 'dinner', label: 'Cena' }
            ];

            foodMappings.forEach(({ id, label }) => {
                rerender(<SelectMenu {...props} selectedFood={id} />);
                const labels = screen.getAllByTestId('select-label');
                expect(labels[1]).toHaveTextContent(label);
            });
        });
    });
});
