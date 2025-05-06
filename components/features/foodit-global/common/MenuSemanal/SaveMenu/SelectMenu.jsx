import React, { useState, useEffect } from 'react';
import { Select } from '@ln/common-ui-select';
import PropTypes from 'prop-types';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import useGetUserConfig from '../../../hooks/useGetUserConfig';
import { useGetWeeklyMenu } from '../hooks/useGetWeeklyMenu';

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
    selectedFood
}) {
    const { isSubscribed: subscription } = useGetUserConfig();
    const { weeklyMenu, setWeeklyMenu } = useGetWeeklyMenu(subscription);
    console.log('SelectMenu weeklyMenu', weeklyMenu);
    console.log('SelectMenu subscription', subscription);

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
        return weeklyMenu.map(item => ({
            day: item.bookmarkGroup,
            mealType: item.bookmarkContent.food
        }));
    };

    const dayMealCombinations = getDayMealCombinations();

    console.log('dayMealCombinations', dayMealCombinations);

    const isMealDisabled = mealId => {
        if (!selectedDay) return false;
        console.log('isMealDisabled for mealId:', mealId);
        return dayMealCombinations.some(
            item => item.mealType === mealId && item.day === selectedDay
        );
    };

    const isDayDisabled = dayId => {
        if (!selectedFood) return false;
        console.log('isDayDisabled for dayId:', dayId);
        return dayMealCombinations.some(
            item => item.day === dayId && item.mealType === selectedFood
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
                        console.log('isDisabled day', isDisabled);

                        return (
                            <Select.Options
                                key={id}
                                value={id}
                                label={text}
                                as={ItemCardForDay}
                                className="text-12"
                                disabled={isDisabled}
                                {...(isDisabled && {
                                    className: 'card-item-disabled'
                                })}
                                {...(isDisabled && {
                                    'aria-disabled': true
                                })}
                                {...(isDisabled && {
                                    'aria-label': `Día ${text} no disponible`
                                })}
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
                    console.log('isDisabled meal', isDisabled);

                    return (
                        <Select.Options
                            key={id}
                            className="text-12"
                            value={id}
                            label={text}
                            as={ItemCardForMeal}
                            disabled={isDisabled}
                            {...(isDisabled && {
                                className: 'card-item-disabled'
                            })}
                            {...(isDisabled && {
                                'aria-disabled': true
                            })}
                            {...(isDisabled && {
                                'aria-label': `Comida ${text} no disponible`
                            })}
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
