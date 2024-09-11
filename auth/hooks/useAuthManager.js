import { useContext, useEffect, useState } from 'react';
import { getAuthTokens } from '../helper/loginHelper';
import { AuthContext } from '../AuthInitializer';

const useAuthManager = () => {
    const isFinishRotation = useContext(AuthContext);
    const [tokens, setTokens] = useState({});

    useEffect(() => {
        if (isFinishRotation) {
            const getTokens = async () => {
                try {
                    const { token, accessToken } = await getAuthTokens();
                    setTokens({
                        token,
                        accessToken
                    });
                } catch (error) {
                    console.error('Error during getTokens');
                }
            };

            getTokens();
        }
    }, [isFinishRotation]);

    return tokens;
};

export default useAuthManager;
