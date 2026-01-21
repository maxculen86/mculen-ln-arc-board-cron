import React, { createContext, useContext, useReducer, useMemo } from 'react';

const CarouselBoxContext = createContext(undefined);

const initialState = {
    currentIndex: 0,
    isOpenMediaScrollerExpanded: false
};

const actionTypes = {
    SET_CURRENT_INDEX: 'SET_CURRENT_INDEX',
    OPEN_MEDIA_SCROLLER: 'OPEN_MEDIA_SCROLLER',
    CLOSE_MEDIA_SCROLLER: 'CLOSE_MEDIA_SCROLLER'
};

const reducer = (state, action) => {
    if (
        action.type === actionTypes.SET_CURRENT_INDEX &&
        (typeof action.payload !== 'number' || action.payload < 0)
    ) {
        return state;
    }

    const actions = {
        [actionTypes.SET_CURRENT_INDEX]: {
            ...state,
            currentIndex: action.payload
        },
        [actionTypes.OPEN_MEDIA_SCROLLER]: {
            ...state,
            isOpenMediaScrollerExpanded: true
        },
        [actionTypes.CLOSE_MEDIA_SCROLLER]: {
            ...state,
            isOpenMediaScrollerExpanded: false
        }
    };

    return actions[action.type] || state;
};

function CajaCarruselProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onOpenMediaScrollerExpanded = () =>
        dispatch({ type: actionTypes.OPEN_MEDIA_SCROLLER });
    const onCloseMediaScrollerExpanded = () =>
        dispatch({ type: actionTypes.CLOSE_MEDIA_SCROLLER });

    const setCurrentIndex = index => {
        dispatch({
            type: actionTypes.SET_CURRENT_INDEX,
            payload: index
        });
    };

    const { currentIndex, isOpenMediaScrollerExpanded } = state;

    const value = useMemo(
        () => ({
            currentIndex,
            setCurrentIndex,
            isOpenMediaScrollerExpanded,
            onOpenMediaScrollerExpanded,
            onCloseMediaScrollerExpanded
        }),
        [currentIndex, isOpenMediaScrollerExpanded]
    );

    return (
        <CarouselBoxContext.Provider value={value}>
            {children}
        </CarouselBoxContext.Provider>
    );
}

export const useCajaCarruselContext = () => {
    const context = useContext(CarouselBoxContext);
    if (!context) {
        throw new Error(
            'useCajaCarruselContext must be used within a CajaCarruselProvider'
        );
    }
    return context;
};

export default CajaCarruselProvider;
