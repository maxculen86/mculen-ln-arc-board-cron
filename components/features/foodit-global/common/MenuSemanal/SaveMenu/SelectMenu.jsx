import React from 'react';
import { Select } from '@ln/common-ui-select';
import PropTypes from 'prop-types';
import { Itemcard } from '@ln/foodit-ui-itemcard';

function ItemCardForDay({ disabled, className, ...props }) {
    return (
        <Itemcard
            type="button"
            disabled={disabled}
            className={disabled ? 'card-item-disabled' : className}
            {...props}
        />
    );
}

ItemCardForDay.propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string
};

ItemCardForDay.defaultProps = {
    disabled: false,
    className: ''
};
function ItemCardForMeal({ disabled, className, ...props }) {
    return (
        <Itemcard
            type="button"
            disabled={disabled}
            className={disabled ? 'card-item-disabled' : className}
            {...props}
        />
    );
}

ItemCardForMeal.propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string
};
ItemCardForMeal.defaultProps = {
    disabled: false,
    className: ''
};

function ItemCardForDayMeal({ disabled, className, ...props }) {
    return (
        <Itemcard
            type="button"
            disabled={disabled}
            className={disabled ? 'card-item-disabled' : className}
            {...props}
        />
    );
}

ItemCardForDayMeal.propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string
};
ItemCardForDayMeal.defaultProps = {
    disabled: false,
    className: ''
};

export function SelectMenu({
    setSelectedDay,
    setSelectedFood,
    selectedDay,
    selectedFood,
    articleId,
    weeklyMenu
}) {
    const days = [
        { id: 'monday', text: 'Lunes' },
        { id: 'tuesday', text: 'Martes' },
        { id: 'wednesday', text: 'Miércoles' },
        { id: 'thursday', text: 'Jueves' },
        { id: 'friday', text: 'Viernes' },
        { id: 'saturday', text: 'Sábado' },
        { id: 'sunday', text: 'Domingo' }
    ];

    const meals = [
        { id: 'breakfast', text: 'Desayuno' },
        { id: 'lunch', text: 'Almuerzo' },
        { id: 'dinner', text: 'Cena' }
    ];

    const handleDayChange = e => {
        setSelectedDay(e?.value);
    };

    const handleFoodChange = e => {
        setSelectedFood(e?.value);
    };

    const getDayMealCombinations = () => {
        if (!weeklyMenu || weeklyMenu.length === 0) return [];
        return weeklyMenu
            .filter(item => item.bookmarkTypeId === articleId)
            .map(item => ({
                day: item.bookmarkGroup,
                mealType: item.bookmarkContent.food
            }));
    };

    const dayMealCombinations = getDayMealCombinations();

    const isMealDisabled = mealId => {
        if (!selectedDay) return false;
        return Boolean(
            dayMealCombinations.find(
                item => item.mealType === mealId && item.day === selectedDay
            )
        );
    };

    const isDayDisabled = dayId => {
        if (!selectedFood) return false;
        return Boolean(
            dayMealCombinations.find(
                item => item.day === dayId && item.mealType === selectedFood
            )
        );
    };

    return (
        <div className="flex flex-column gap-24">
            {/* Day selector - options are disabled based on selected meal */}
            <Select
                label="Seleccionar día"
                className="roboto roboto-regular text-12"
                openClassName="border-secondary-positive"
                hoverClassName="border-accent-lechuga__hover"
                listClassName="p-16 roboto roboto-semibold shadow-modal bg-white border border-all border-thin border-light-100 rounded-8"
                floatingLabelProps={{
                    className: 'bg-white'
                }}
                onChange={handleDayChange}
                value={selectedDay || ''}
            >
                <div className="max-h-198 foodit-scrollbar overflow-y-auto">
                    {days.map(({ text, id }) => {
                        const isDisabled = isDayDisabled(id);

                        return (
                            <Select.Options
                                key={id}
                                value={id}
                                label={text}
                                className="text-12"
                                // eslint-disable-next-line react/no-unstable-nested-components
                                as={props => (
                                    <ItemCardForDay
                                        title={
                                            isDisabled
                                                ? `Día ${text} no disponible`
                                                : text
                                        }
                                        disabled={isDisabled}
                                        {...(isDisabled && {
                                            'aria-disabled': true
                                        })}
                                        {...(isDisabled && {
                                            'aria-label': `Día ${text} no disponible`
                                        })}
                                        {...props}
                                    />
                                )}
                            />
                        );
                    })}
                </div>
            </Select>

            {/* Meal selector - options are disabled based on selected day */}
            <Select
                label="Seleccionar comida"
                className="roboto roboto-regular text-12"
                openClassName="border-secondary-positive"
                hoverClassName="border-accent-lechuga__hover"
                listClassName="p-16 roboto roboto-semibold shadow-modal bg-white border border-all border-thin border-light-100 rounded-8"
                floatingLabelProps={{
                    className: 'bg-white'
                }}
                onChange={handleFoodChange}
                value={selectedFood || ''}
            >
                {meals.map(({ text, id }) => {
                    const isDisabled = isMealDisabled(id);

                    return (
                        <Select.Options
                            key={id}
                            className="text-12"
                            value={id}
                            label={text}
                            // eslint-disable-next-line react/no-unstable-nested-components
                            as={props => (
                                <ItemCardForMeal
                                    title={
                                        isDisabled
                                            ? `Comida ${text} no disponible`
                                            : text
                                    }
                                    disabled={isDisabled}
                                    {...(isDisabled && {
                                        'aria-disabled': true
                                    })}
                                    {...(isDisabled && {
                                        'aria-label': `Comida ${text} no disponible`
                                    })}
                                    {...props}
                                />
                            )}
                        />
                    );
                })}
            </Select>
        </div>
    );
}

SelectMenu.propTypes = {
    setSelectedDay: PropTypes.func.isRequired,
    setSelectedFood: PropTypes.func.isRequired,
    selectedDay: PropTypes.string,
    selectedFood: PropTypes.string,
    articleId: PropTypes.string.isRequired,
    weeklyMenu: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            mealType: PropTypes.string.isRequired,
            recipe: PropTypes.shape({}).isRequired
        })
    )
};

SelectMenu.defaultProps = {
    selectedDay: '',
    selectedFood: '',
    weeklyMenu: []
};
