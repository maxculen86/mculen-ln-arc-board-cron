import React, { createContext, useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

const CarouselBoxContext = createContext(undefined);

const initialState = {
    currentIndex: 0,
    videosData: [],
    isOpenMediaScrollerExpanded: false
};

const actionTypes = {
    SET_CURRENT_INDEX: 'SET_CURRENT_INDEX',
    SET_VIDEOS_DATA: 'SET_VIDEOS_DATA',
    OPEN_MEDIA_SCROLLER: 'OPEN_MEDIA_SCROLLER',
    CLOSE_MEDIA_SCROLLER: 'CLOSE_MEDIA_SCROLLER'
};

const reducer = (state, action) => {
    const actions = {
        [actionTypes.SET_CURRENT_INDEX]: {
            ...state,
            currentIndex: action.payload
        },
        [actionTypes.SET_VIDEOS_DATA]: {
            ...state,
            videosData: [...state.videosData, action.payload]
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

    const setVideosData = ({ id, title }) => {
        dispatch({
            type: actionTypes.SET_VIDEOS_DATA,
            payload: { id, title }
        });
    };

    const { currentIndex, videosData, isOpenMediaScrollerExpanded } = state;

    const value = useMemo(
        () => ({
            currentIndex,
            videosData,
            isOpenMediaScrollerExpanded,
            setCurrentIndex,
            setVideosData,
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

CajaCarruselProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default CajaCarruselProvider;
