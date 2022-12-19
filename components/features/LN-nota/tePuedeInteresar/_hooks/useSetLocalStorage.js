import { useState, useEffect } from 'react';
import {
    getVariablesFromLocalStorage,
    setLocalStorage,
    saveUrlToExclude
} from '../_helpers';

const useSetLocalStorage = url => {
    const [userId, setUserId] = useState();
    const [sessionId, setSessionId] = useState();
    const [excludeItems, setExcludeItems] = useState([]);

    useEffect(() => {
        if (localStorage) {
            const { urls, sid, uid } = getVariablesFromLocalStorage();
            const newUrlsToExclude = saveUrlToExclude(urls, url);
            setLocalStorage(newUrlsToExclude, sid);
            setSessionId(sid);
            if (uid !== 'N/A') setUserId(uid);
            setExcludeItems(urls);
        }
    }, [url]);

    return { userId, sessionId, excludeItems };
};

export default useSetLocalStorage;
