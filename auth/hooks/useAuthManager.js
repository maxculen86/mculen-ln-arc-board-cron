import { useContext, useEffect, useState } from 'react';
import { getAuthTokens } from '../helper/loginHelper';
import { AuthContext } from '../AuthInitializer';

const useAuthManager = () => {
    const valueContext = useContext(AuthContext);
    const [tokens, setTokens] = useState({});

    const isLibUCL = typeof valueContext === 'object';

    useEffect(() => {
        if (!isLibUCL && valueContext) {
            const getTokens = async () => {
                try {
                    const { token, accessToken } = await getAuthTokens();
                    const validatedAccessToken =
                        // TODO: Se pasa la validacion del Bearer undefined al authManager para evitar que lo validen los componentes de newslleter y campanita. Eliminar validacion una vez se migre todo LN a lib UCL
                        accessToken === 'Bearer undefined' ? null : accessToken;
                    setTokens({
                        token,
                        accessToken: validatedAccessToken
                    });
                } catch (error) {
                    console.error('Error during getTokens');
                }
            };

            getTokens();
        }
    }, [valueContext]);

    return isLibUCL ? valueContext : tokens;
};

export default useAuthManager;
