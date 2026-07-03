import { useState, useEffect } from 'react';

const eventBus = new EventTarget();

let latestPortionsState = {
    currentPortion: null,
    defaultPortion: null,
    calculatedValue: null
};

const usePortions = (
    eventName = 'recipe-portions',
    currentPortion = null,
    defaultPortion = null
) => {
    const [currentPortionState, setCurrentPortionState] = useState(
        currentPortion !== null
            ? currentPortion
            : latestPortionsState.currentPortion
    );
    const [defaultPortionState, setDefaultPortionState] = useState(
        defaultPortion !== null
            ? defaultPortion
            : latestPortionsState.defaultPortion
    );

    const initialPortionsValue = (() => {
        if (currentPortion !== null && defaultPortion !== null) {
            return Math.max(currentPortion, defaultPortion);
        }
        if (latestPortionsState.calculatedValue !== null) {
            return latestPortionsState.calculatedValue;
        }
        return 1;
    })();

    const [portionsValue, setPortionsValue] = useState(initialPortionsValue);

    const updatePortions = (newCurrentPortion, newDefaultPortion) => {
        const event = new CustomEvent(eventName, {
            detail: {
                currentPortion: newCurrentPortion,
                defaultPortion: newDefaultPortion
            }
        });
        eventBus.dispatchEvent(event);

        setCurrentPortionState(newCurrentPortion);
        setDefaultPortionState(newDefaultPortion);
        setPortionsValue(Math.max(newCurrentPortion, newDefaultPortion));
    };

    useEffect(() => {
        if (currentPortion !== null && defaultPortion !== null) {
            updatePortions(currentPortion, defaultPortion);
        }
    }, [currentPortion, defaultPortion]);

    useEffect(() => {
        const handlePortionsUpdate = event => {
            const {
                currentPortion: eventCurrentPortion,
                defaultPortion: eventDefaultPortion
            } = event.detail || {};

            if (
                eventCurrentPortion !== undefined &&
                eventDefaultPortion !== undefined
            ) {
                setCurrentPortionState(eventCurrentPortion);
                setDefaultPortionState(eventDefaultPortion);

                const calculatedValue = Math.max(
                    eventCurrentPortion,
                    eventDefaultPortion
                );
                setPortionsValue(calculatedValue);

                latestPortionsState = {
                    currentPortion: eventCurrentPortion,
                    defaultPortion: eventDefaultPortion,
                    calculatedValue
                };
            }
        };

        eventBus.addEventListener(eventName, handlePortionsUpdate);

        return () => {
            eventBus.removeEventListener(eventName, handlePortionsUpdate);
        };
    }, [eventName, currentPortionState, defaultPortionState]);

    return {
        portionsValue,
        currentPortion: currentPortionState,
        defaultPortion: defaultPortionState,
        updatePortions
    };
};

export default usePortions;
