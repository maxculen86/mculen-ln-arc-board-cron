import React, { useCallback, useEffect, useState } from 'react';
import { Select } from '@ln/common-ui-select';
import PropTypes from 'prop-types';
import { Itemcard } from '@ln/foodit-ui-itemcard';

function ItemCardOption({ disabled, className, ...props }) {
    return (
        <Itemcard
            type="button"
            disabled={disabled}
            className={disabled ? 'card-item-disabled' : className}
            {...props}
        />
    );
}

ItemCardOption.propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string
};

ItemCardOption.defaultProps = {
    disabled: false,
    className: ''
};

export function SelectMenu({
    setSelectedDay,
    setSelectedFood,
    selectedDay,
    selectedFood,
    articleId,
    weeklyMenu,
    menuToEdit
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

    const [activeState, setActiveState] = useState({
        day: false,
        food: false
    });

    const daysMap = Object.fromEntries(days.map(({ id, text }) => [id, text]));
    const mealsMap = Object.fromEntries(
        meals.map(({ id, text }) => [id, text])
    );

    const handleDayChange = e => {
        setActiveState({
            ...activeState,
            day: true
        });
        setSelectedDay(e?.value);
    };

    const handleFoodChange = e => {
        setActiveState({
            ...activeState,
            food: true
        });
        setSelectedFood(e?.value);
    };

    const getDayMealCombinations = () => {
        if (!weeklyMenu || weeklyMenu.length === 0) return [];
        return weeklyMenu
            .filter(item => item?.bookmarkContent?.id === articleId)
            .map(item => ({
                day: item.bookmarkGroup,
                mealType: item.bookmarkContent.food
            }));
    };

    const dayMealCombinations = getDayMealCombinations();

    const isMealDisabled = useCallback(
        mealId => {
            if (!selectedDay) return false;
            return Boolean(
                dayMealCombinations.find(
                    item => item.mealType === mealId && item.day === selectedDay
                )
            );
        },
        [selectedDay, dayMealCombinations]
    );

    const isDayDisabled = useCallback(
        dayId => {
            if (!selectedFood) return false;
            return Boolean(
                dayMealCombinations.find(
                    item => item.day === dayId && item.mealType === selectedFood
                )
            );
        },
        [selectedFood, dayMealCombinations]
    );

    const renderDayOption = useCallback(
        (id, text) => {
            const isDisabled = isDayDisabled(id);

            return function DayOptionRenderer(props) {
                return (
                    <ItemCardOption
                        title={false}
                        disabled={isDisabled}
                        {...(isDisabled && {
                            'aria-disabled': true,
                            'aria-label': `Día ${text} no disponible`
                        })}
                        {...props}
                    />
                );
            };
        },
        [isDayDisabled]
    );

    const renderMealOption = useCallback(
        (id, text) => {
            const isDisabled = isMealDisabled(id);

            return function MealOptionRenderer(props) {
                return (
                    <ItemCardOption
                        title={false}
                        disabled={isDisabled}
                        {...(isDisabled && {
                            'aria-disabled': true,
                            'aria-label': `Comida ${text} no disponible`
                        })}
                        {...props}
                    />
                );
            };
        },
        [isMealDisabled]
    );

    useEffect(() => {
        if (menuToEdit) {
            setSelectedDay(menuToEdit?.bookmarkGroup);
            setSelectedFood(menuToEdit?.bookmarkContent?.food);
        } else {
            setSelectedDay('');
            setSelectedFood('');
        }
    }, [menuToEdit, setSelectedDay, setSelectedFood]);

    return (
        <div className="flex flex-column gap-24">
            <Select
                label={
                    daysMap[selectedDay] && !activeState.day
                        ? daysMap[selectedDay]
                        : 'Seleccionar día'
                }
                floatingLabelText="Seleccionar día"
                className="roboto roboto-regular text-12"
                openClassName="border-secondary-positive"
                hoverClassName="border-accent-lechuga__hover"
                listClassName="p-16 roboto roboto-semibold shadow-modal bg-white border border-all border-thin border-light-100 rounded-8"
                floatingLabelProps={{
                    className: 'bg-white'
                }}
                onChange={handleDayChange}
            >
                <div className="max-h-198 foodit-scrollbar overflow-y-auto">
                    {days.map(({ text, id }) => (
                        <Select.Options
                            key={id}
                            value={id}
                            label={text}
                            className="text-12"
                            as={renderDayOption(id, text)}
                        />
                    ))}
                </div>
            </Select>

            <Select
                label={
                    mealsMap[selectedFood] && !activeState.food
                        ? mealsMap[selectedFood]
                        : 'Seleccionar comida'
                }
                floatingLabelText="Seleccionar comida"
                className="roboto roboto-regular text-12"
                openClassName="border-secondary-positive"
                hoverClassName="border-accent-lechuga__hover"
                listClassName="p-16 roboto roboto-semibold shadow-modal bg-white border border-all border-thin border-light-100 rounded-8"
                floatingLabelProps={{
                    className: 'bg-white'
                }}
                onChange={handleFoodChange}
            >
                {meals.map(({ text, id }) => (
                    <Select.Options
                        key={id}
                        className="text-12"
                        value={id}
                        label={text}
                        as={renderMealOption(id, text)}
                    />
                ))}
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
    ),
    menuToEdit: PropTypes.shape({
        bookmarkGroup: PropTypes.string.isRequired,
        bookmarkContent: PropTypes.shape({
            food: PropTypes.string.isRequired
        }).isRequired
    })
};

SelectMenu.defaultProps = {
    selectedDay: '',
    selectedFood: '',
    weeklyMenu: [],
    menuToEdit: {}
};
