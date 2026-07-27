import { DATADOG_CONFIG, GOOGLE_ONE_TAP } from 'fusion:environment';
import { init } from '@ln/user.client.libs';
import get from '../../utils/get';
import handleCookie from '../../../LN/common/utils/handleCookie';

const { getCookie } = handleCookie();

export const SUBSCRIBED_HELPER = {
    LN: '2',
    FOODIT: '22'
};

const siteIds = {
    'la-nacion-ar': 1,
    foodit: 19
};

export const isSubscribed = valueSuscription => {
    const ProductoPremiumId = getCookie('ProductoPremiumId') || '';
    const cookieArray = ProductoPremiumId.split(',');
    return cookieArray.includes(valueSuscription);
};

export const getAuthTokens = async () => {
    const getAccessTokenValidated = get(
        window,
        'UCL.GetAccessTokenValidatedAsync',
        () => {}
    );
    const getToken = get(window, 'UCL.GetIdTokenValidatedAsync', () => {});
    const getAccessToken = get(
        window,
        'UCL.BuildBearerAccessTokenAsync',
        () => {}
    );

    const token = await getToken();
    const accessToken = await getAccessToken();
    const accessTokenValidated = await getAccessTokenValidated();

    return {
        token,
        accessToken,
        accessTokenValidated
    };
};

export const initializeGoogleOneTap = async website => {
    if (website !== 'la-nacion-ar') return;

    try {
        const googleOneTap = get(window, 'UCL.GoogleOneTap');

        if (typeof googleOneTap === 'function') {
            await googleOneTap();
        }
    } catch (error) {
        console.error('Error inicializando Google One Tap:', error);
    }
};

export const logout = (callback = () => {}) => {
    const logoutFunction = window?.UCL?.LogoutAsync;

    logoutFunction({
        embedShortCircuit: true,
        redirect: null,
        isVoluntary: true
    }).then(response => {
        callback(response);
    });

    window?.viafoura?.session?.logout();
};

const initializeAuth = async ({ website = 'la-nacion-ar', setTokens } = {}) => {
    try {
        const datadogConfig = get(DATADOG_CONFIG, website, {});
        const keyDatadog = get(datadogConfig, 'clientTokenLogs', '');
        const serviceDatadog = get(datadogConfig, 'service', 'lanacion-arc');
        const environment = get(datadogConfig, 'env', 'prod');
        const siteId = siteIds[website];

        const methodsUCL =
            init({
                keyDatadog,
                serviceDatadog,
                siteId,
                environment,
                googleIdClient: GOOGLE_ONE_TAP
            }) || {};

        window.UCL = methodsUCL;

        if (getCookie('token')) {
            const { BuildBearerAccessTokenAsync, GetIdTokenValidatedAsync } =
                methodsUCL;

            const token = await GetIdTokenValidatedAsync();
            const accessToken = await BuildBearerAccessTokenAsync();

            setTokens({
                token,
                accessToken
            });
        }
    } catch (error) {
        console.error(
            'Error occurred while executing UCL initialization',
            error
        );
    }
};

export default initializeAuth;
