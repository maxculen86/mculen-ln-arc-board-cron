import { useState, useEffect } from 'react';

const eventBus = new EventTarget();

let ingredientsStore = {
    ingredientsLists: []
};

const useIngredientsList = (
    eventName = 'ingredients-list',
    initialIngredientsList = null
) => {
    const [ingredientsLists, setIngredientsLists] = useState(
        initialIngredientsList !== null
            ? initialIngredientsList
            : ingredientsStore.ingredientsLists
    );

    const updateIngredientsData = newIngredientsList => {
        if (!newIngredientsList) return;

        ingredientsStore.ingredientsLists = newIngredientsList;

        const event = new CustomEvent(eventName, {
            detail: {
                ingredientsLists: newIngredientsList
            }
        });

        eventBus.dispatchEvent(event);

        setIngredientsLists(newIngredientsList);
    };

    useEffect(() => {
        if (initialIngredientsList !== null) {
            updateIngredientsData(initialIngredientsList);
        }
    }, [initialIngredientsList]);

    useEffect(() => {
        const handleIngredientsUpdate = event => {
            const { ingredientsLists: eventIngredientsList } =
                event.detail || {};

            if (eventIngredientsList !== undefined) {
                setIngredientsLists(eventIngredientsList);

                ingredientsStore = {
                    ingredientsLists: eventIngredientsList
                };
            }
        };

        eventBus.addEventListener(eventName, handleIngredientsUpdate);

        return () => {
            eventBus.removeEventListener(eventName, handleIngredientsUpdate);
        };
    }, [eventName, ingredientsLists]);

    return {
        ingredientsLists,
        updateIngredientsData
    };
};

export default useIngredientsList;
