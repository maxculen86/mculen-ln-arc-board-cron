import { getAuthTokens } from '../../../../../auth/helper/loginHelper';
import getToken from '../../../../private/common/utils/getToken';

// TODO: REVERTIR CUANDO UCL ESTE ACTUALIZADO incluyendo iframeHelper.test.js

export const generateUrlWithToken = async (url = '') => {
    const { token } = await getAuthTokens();
    const tokenFromCookie = getToken();
    if (!token || !tokenFromCookie) {
        console.error('No se pudo obtener el token JWT');
        return url;
    }
    return `${url}?jwt=${token || tokenFromCookie}`;
};

export const handleIframeProps = async (
    id = '',
    url = '',
    addToken = false
) => {
    const iframeAnexo = document.getElementById(`anexo-${id}`);
    if (!iframeAnexo) return;

    iframeAnexo.parentElement.classList.remove('skeleton-box');

    const finalUrl = addToken ? await generateUrlWithToken(url) : url;

    iframeAnexo.src = finalUrl;
};
