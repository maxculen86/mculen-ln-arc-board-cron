/* eslint-disable no-shadow */

import { useContext } from 'react';
import { CommentsContext } from '../context/commentsContext';

const useComments = () => {
    const [state, setState] = useContext(CommentsContext);

    function setCommentsEnabled(value) {
        setState(state => ({ ...state, commentsEnabled: value }));
    }

    function setCommentsCount(count) {
        setState(state => ({ ...state, commentsCount: count }));
    }

    function setCommentsEnabledAndCount(enabled, count) {
        setState(state => ({
            ...state,
            commentsEnabled: enabled,
            commentsCount: count
        }));
    }

    return {
        setCommentsCount,
        setCommentsEnabled,
        setCommentsEnabledAndCount,
        commentsCount: state.commentsCount,
        commentsAllowed: state.commentsEnabled
    };
};

export default useComments;
