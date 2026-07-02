import { useState, useEffect } from 'react';
import isSSR from '../../../private/LN/common/utils/isSSR';

const MOBILE_QUERY = '(max-width: 1279px)';

export default function useIsMobile(query = MOBILE_QUERY) {
    const [isMobile, setIsMobile] = useState(() => {
        if (isSSR()) return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        if (isSSR()) return undefined;
        const mql = window.matchMedia(query);
        const onChange = event => setIsMobile(event.matches);

        setIsMobile(mql.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, [query]);

    return isMobile;
}
