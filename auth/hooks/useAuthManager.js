import { useContext, useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import isAllowedSection from '../../components/private/LN/common/utils/isAllowedSection';
import {
    listValidSectionsForMvp2Auth0,
    getAuthTokens
} from '../helper/loginHelper';
import getToken from '../../components/private/common/utils/getToken';
import { AuthContext } from '../AuthInitializer';

// TODO: Remover logica que valida secciones habilitadas cuando se implemente MVP2 de auth0 en todo LN
const useAuthManager = () => {
    const isFinishRotation = useContext(AuthContext);
    const [tokens, setTokens] = useState({});
    const { globalContent, arcSite } = useAppContext();
    const isValidSectionForMVP2Auth0 =
        isAllowedSection({
            globalContent,
            listOfAllowedSection: listValidSectionsForMvp2Auth0
        }) || arcSite === 'foodit';

    useEffect(() => {
        if (isValidSectionForMVP2Auth0 && isFinishRotation) {
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

    if (!isValidSectionForMVP2Auth0) {
        return {
            token: getToken(),
            accessToken: getToken('access-token')
        };
    }

    return tokens;
};

export default useAuthManager;
