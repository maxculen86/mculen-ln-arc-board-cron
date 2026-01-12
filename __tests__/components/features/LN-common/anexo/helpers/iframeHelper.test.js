import {
    generateUrlWithToken,
    handleIframeProps
} from '../../../../../../components/features/LN-common/anexo/helpers/iframeHelper';
import { getAuthTokens } from '../../../../../../components/private/common/auth/helper/loginHelper';
import getToken from '../../../../../../components/private/common/utils/getToken';

jest.mock(
    '../../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        getAuthTokens: jest.fn()
    })
);

jest.mock('../../../../../../components/private/common/utils/getToken', () =>
    jest.fn()
);

const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilczdk';
const BASE_URL = 'https://lanacion.agilmenteapp.com/crossword/mini';
const FINAL_URL_WITH_TOKEN = `${BASE_URL}?jwt=${TOKEN}`;

describe('features - LN-common - anexo - helpers - iframeHelper', () => {
    describe('generateUrlWithToken', () => {
        it('should return URL with JWT token if token exists', async () => {
            getAuthTokens.mockResolvedValueOnce({ token: TOKEN });
            getToken.mockReturnValueOnce(TOKEN);
            const finalUrl = await generateUrlWithToken(BASE_URL, true, false);
            expect(finalUrl).toBe(FINAL_URL_WITH_TOKEN);
        });

        it('should return original URL if token does not exist', async () => {
            getAuthTokens.mockResolvedValueOnce({ token: null });
            getToken.mockReturnValueOnce(null);
            const finalUrl = await generateUrlWithToken(BASE_URL, true, false);
            expect(finalUrl).toBe(BASE_URL);
        });
    });

    describe('handleIframeProps', () => {
        let iframeMock;
        beforeEach(() => {
            iframeMock = {
                parentElement: {
                    classList: {
                        remove: jest.fn()
                    }
                },
                src: ''
            };
            document.getElementById = jest.fn(() => iframeMock);
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should set iframe src with JWT token for game URLs', async () => {
            getAuthTokens.mockResolvedValueOnce({ token: TOKEN });
            getToken.mockReturnValueOnce(TOKEN);
            const id = 'f0fXG4p6pSpK2s8';
            await handleIframeProps(id, BASE_URL, true, false);
            expect(document.getElementById).toHaveBeenCalledWith(`anexo-${id}`);
            expect(
                iframeMock.parentElement.classList.remove
            ).toHaveBeenCalledWith('skeleton-box');
            expect(iframeMock.src).toBe(FINAL_URL_WITH_TOKEN);
        });

        it('should append Access Token for game URLs when requested', async () => {
            getAuthTokens.mockResolvedValueOnce({
                token: TOKEN,
                accessToken: 'Bearer ACCESS_TOKEN_XYZ'
            });
            getToken.mockReturnValueOnce(TOKEN);
            const id = 'game-id-123';
            await handleIframeProps(id, BASE_URL, true, true);

            expect(iframeMock.src).toContain('jwt=' + TOKEN);
            expect(iframeMock.src).toContain('access=ACCESS_TOKEN_XYZ');
        });

        it('should allow Access Token for ANY URL if requested', async () => {
            getAuthTokens.mockResolvedValueOnce({
                token: TOKEN,
                accessToken: 'Bearer ACCESS_TOKEN_XYZ'
            });
            getToken.mockReturnValueOnce(TOKEN);

            const id = 'any-domain-id';
            const anyUrl = 'https://any-domain.com/anexo-test/';

            await handleIframeProps(id, anyUrl, true, true);

            expect(iframeMock.src).toContain('jwt=' + TOKEN);
            expect(iframeMock.src).toContain('access=ACCESS_TOKEN_XYZ');
        });

        it('should handle missing iframe element gracefully', async () => {
            document.getElementById = jest.fn(() => null);
            const id = 'f0fXG4p6pSpK2s8';
            await handleIframeProps(id, BASE_URL, true, false);
            expect(document.getElementById).toHaveBeenCalledWith(`anexo-${id}`);
        });
        it('should wait and append Access Token if initially missing (Retry Logic)', async () => {
            getAuthTokens.mockResolvedValueOnce({
                token: TOKEN,
                accessToken: null
            });
            getAuthTokens.mockResolvedValueOnce({
                token: TOKEN,
                accessToken: 'Bearer DELAYED_ACCESS_TOKEN'
            });

            getToken.mockReturnValue(TOKEN);

            const id = 'game-id-retry';
            await handleIframeProps(id, BASE_URL, true, true);

            expect(iframeMock.src).toContain('jwt=' + TOKEN);
            expect(iframeMock.src).toContain('access=DELAYED_ACCESS_TOKEN');
            expect(getAuthTokens).toHaveBeenCalledTimes(2);
        });
    });
});
