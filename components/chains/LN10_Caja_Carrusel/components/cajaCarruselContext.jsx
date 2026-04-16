import React, { createContext, useContext, useReducer, useMemo } from 'react';

const CarouselBoxContext = createContext(undefined);

const initialState = {
    currentIndex: 0,
    isOpenMediaScrollerExpanded: false,
    preferredVideoFiles: {},
    videoMetadata: {}
};

const actionTypes = {
    SET_CURRENT_INDEX: 'SET_CURRENT_INDEX',
    OPEN_MEDIA_SCROLLER: 'OPEN_MEDIA_SCROLLER',
    CLOSE_MEDIA_SCROLLER: 'CLOSE_MEDIA_SCROLLER',
    SET_PREFERRED_VIDEO_FILE: 'SET_PREFERRED_VIDEO_FILE',
    SET_VIDEO_METADATA: 'SET_VIDEO_METADATA'
};

const reducer = (state, action) => {
    if (action.type === actionTypes.SET_PREFERRED_VIDEO_FILE) {
        const { videoId, file } = action.payload || {};
        const currentFile = state.preferredVideoFiles?.[videoId];

        if (!videoId || !file || currentFile === file) return state;

        return {
            ...state,
            preferredVideoFiles: {
                ...state.preferredVideoFiles,
                [videoId]: file
            }
        };
    }

    if (action.type === actionTypes.SET_VIDEO_METADATA) {
        const { videoId, duration, titleJwPlayer } = action.payload || {};
        const current = state.videoMetadata?.[videoId];

        if (
            !videoId ||
            (current?.duration === duration &&
                current?.titleJwPlayer === titleJwPlayer)
        )
            return state;

        return {
            ...state,
            videoMetadata: {
                ...state.videoMetadata,
                [videoId]: { duration, titleJwPlayer }
            }
        };
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

    const setPreferredVideoFile = (videoId, file) => {
        if (!videoId || !file) return;

        dispatch({
            type: actionTypes.SET_PREFERRED_VIDEO_FILE,
            payload: { videoId, file }
        });
    };

    const setVideoMetadata = (videoId, { duration, titleJwPlayer } = {}) => {
        if (!videoId) return;

        dispatch({
            type: actionTypes.SET_VIDEO_METADATA,
            payload: { videoId, duration, titleJwPlayer }
        });
    };

    const {
        currentIndex,
        isOpenMediaScrollerExpanded,
        preferredVideoFiles,
        videoMetadata
    } = state;

    const value = useMemo(
        () => ({
            currentIndex,
            setCurrentIndex,
            preferredVideoFiles,
            setPreferredVideoFile,
            videoMetadata,
            setVideoMetadata,
            isOpenMediaScrollerExpanded,
            onOpenMediaScrollerExpanded,
            onCloseMediaScrollerExpanded
        }),
        [
            currentIndex,
            isOpenMediaScrollerExpanded,
            preferredVideoFiles,
            videoMetadata
        ]
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
