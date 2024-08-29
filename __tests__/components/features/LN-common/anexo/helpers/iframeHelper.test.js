import {
    generateUrlWithToken,
    handleIframeProps
} from '../../../../../../components/features/LN-common/anexo/helpers/iframeHelper';
import { getAuthTokens } from '../../../../../../auth/helper/loginHelper';

jest.mock('../../../../../../auth/helper/loginHelper', () => ({
    getAuthTokens: jest.fn()
}));

const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilczdk';
const BASE_URL = 'https://lanacion.agilmenteapp.com/crossword/mini';
const FINAL_URL_WITH_TOKEN = `${BASE_URL}?jwt=${TOKEN}`;

describe('features - LN-common - anexo - helpers - iframeHelper', () => {
    describe('generateUrlWithToken', () => {
        it('should return URL with JWT token if token exists', async () => {
            getAuthTokens.mockResolvedValueOnce({ token: TOKEN });
            const finalUrl = await generateUrlWithToken(BASE_URL);
            expect(finalUrl).toBe(FINAL_URL_WITH_TOKEN);
        });
        it('should return original URL if token does not exist', async () => {
            getAuthTokens.mockResolvedValueOnce({ token: null });
            const finalUrl = await generateUrlWithToken(BASE_URL);
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
            const id = 'f0fXG4p6pSpK2s8';
            await handleIframeProps(id, BASE_URL, true);
            expect(document.getElementById).toHaveBeenCalledWith(`anexo-${id}`);
            expect(
                iframeMock.parentElement.classList.remove
            ).toHaveBeenCalledWith('skeleton-box');
            expect(iframeMock.src).toBe(FINAL_URL_WITH_TOKEN);
        });
        it('should set iframe src with original URL if not a game', async () => {
            const id = 'f0f0raOK8mKx1sc';
            const nonGameUrl =
                'https://especialess3.lanacion.com.ar/21/03/anexo-home-vacunas-test/';
            await handleIframeProps(id, nonGameUrl, false);
            expect(document.getElementById).toHaveBeenCalledWith(`anexo-${id}`);
            expect(
                iframeMock.parentElement.classList.remove
            ).toHaveBeenCalledWith('skeleton-box');
            expect(iframeMock.src).toBe(nonGameUrl);
        });
        it('should handle missing iframe element gracefully', async () => {
            document.getElementById = jest.fn(() => null);
            const id = 'f0fXG4p6pSpK2s8';
            await handleIframeProps(id, BASE_URL, true);
            expect(document.getElementById).toHaveBeenCalledWith(`anexo-${id}`);
        });
    });
});
