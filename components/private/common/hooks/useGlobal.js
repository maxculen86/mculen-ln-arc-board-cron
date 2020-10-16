/* eslint-disable no-shadow */

import { useContext, useEffect } from 'react';
// import { useContent } from 'fusion:content';
import { GlobalContext } from '../context/globalContext';

const useGlobal = () => {
    const [state, setState] = useContext(GlobalContext);

    /* const content = useContent({
        source: 'navigationTreeSource',
        query: {
            website: 'la-nacion-ar'
        }
    });

    useEffect(() => {
        setState(state => ({ ...state, contentNavigationTreeSource: content }));
    }, [content, setState]); */

    function setAuth(value) {
        setState(state => ({ ...state, authenticated: value }));
    }

    function setCommentsEnabled(value) {
        setState(state => ({ ...state, commentsEnabled: value }));
    }

    function setCommentsEnabledAndCount(enabled, count) {
        setState(state => ({
            ...state,
            commentsEnabled: enabled,
            commentsCount: count
        }));
    }

    return {
        commentsCount: state.commentsCount,
        setCommentsEnabledAndCount,
        setCommentsEnabled,
        commentsAllowed: state.commentsEnabled,
        setAuth,
        isAuth: state.authenticated
        /* getNavigationTree: () => {
            state.contentNavigationTreeSource
        } */
    };
};

export default useGlobal;
