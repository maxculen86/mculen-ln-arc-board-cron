import { useEffect, useState } from 'react';
import useAuthManager from '../../../../../../auth/hooks/useAuthManager';

export const useGetPropsBellAuth = () => {
    const [props, setProps] = useState({});
    const { token, accessToken } = useAuthManager();

    useEffect(() => {
        if (token && accessToken) {
            setProps({
                userIdToken: token,
                userAccessToken: accessToken
            });
        }
    }, [token, accessToken]);

    return props;
};
