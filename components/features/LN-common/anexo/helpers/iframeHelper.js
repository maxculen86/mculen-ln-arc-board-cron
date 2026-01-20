import { getAuthTokens } from '../../../../private/common/auth/helper/loginHelper';
import getToken from '../../../../private/common/utils/getToken';

// TODO: Migrar al hook useAuthManager para gestionar los tokens durante el montaje
// del componente. El uso actual de getAuthTokens en carga inicial debe
// reservarse únicamente para acciones disparadas bajo demanda.
export const waitForAccessToken = async (retries = 5, delay = 300) => {
    const { accessToken } = await getAuthTokens();

    if (accessToken) {
        return accessToken;
    }

    if (retries <= 0) {
        return null;
    }

    await new Promise(resolve => {
        setTimeout(resolve, delay);
    });
    return waitForAccessToken(retries - 1, delay);
};

export const generateUrlWithToken = async (
    url = '',
    addIdToken = false,
    addAccessToken = false
) => {
    if (!addIdToken && !addAccessToken) return url;

    const initialTokens = await getAuthTokens();
    const { token } = initialTokens;
    let { accessToken } = initialTokens;

    const tokenFromCookie = getToken();

    const [baseUrl, existingQueryString] = url.split('?');
    const params = new URLSearchParams(existingQueryString || '');

    if (addIdToken) {
        const idToken = token || tokenFromCookie;
        if (idToken) params.set('jwt', idToken);
    }

    if (addAccessToken) {
        if (!accessToken && (token || tokenFromCookie)) {
            accessToken = await waitForAccessToken();
        }

        if (accessToken) {
            params.set('access', accessToken.replace('Bearer ', ''));
        }
    }

    const queryString = params.toString();
    const result = queryString ? `${baseUrl}?${queryString}` : url;
    return result;
};

export const handleIframeProps = async (
    id = '',
    url = '',
    addIdToken = false,
    addAccessToken = false
) => {
    const iframeAnexo = document.getElementById(`anexo-${id}`);
    if (!iframeAnexo) {
        return;
    }

    iframeAnexo.parentElement.classList.remove('skeleton-box');

    iframeAnexo.src = await generateUrlWithToken(
        url,
        addIdToken,
        addAccessToken
    );
};
