import { useEffect, useState } from 'react';
import { getNavbarItems } from './_helper';
import { useHeaderContext } from '../context';
import useTermica from '../../../../private/common/hooks/useTermica';

export const useGetNavBarItems = () => {
    const withBookmark = useTermica('bookmark_web');
    const [data, setData] = useState(
        getNavbarItems(isHome, withBookmark, isSubscribed, toggleDesplegable)
    );

    const { isHome, toggleDesplegable, isSubscribed } = useHeaderContext();

    useEffect(() => {
        setData(
            getNavbarItems(
                isHome,
                withBookmark,
                isSubscribed,
                toggleDesplegable
            )
        );
    }, [isSubscribed]);

    return { data };
};
