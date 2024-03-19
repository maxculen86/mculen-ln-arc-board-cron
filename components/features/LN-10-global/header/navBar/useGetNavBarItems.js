import { useEffect, useState } from 'react';
import { getNavbarItems } from './_helper';
import { useHeaderContext } from '../context';
import useTermica from '../../../../private/common/hooks/useTermica';

export const useGetNavBarItems = () => {
    const withBookmark = useTermica('bookmark_web');
    const [data, setData] = useState(
        getNavbarItems(withBookmark, isSubscribed, toggleDesplegable)
    );

    const { toggleDesplegable, isSubscribed } = useHeaderContext();

    useEffect(() => {
        setData(getNavbarItems(withBookmark, isSubscribed, toggleDesplegable));
    }, [isSubscribed]);

    return { data };
};
