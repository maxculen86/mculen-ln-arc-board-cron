import handleShareClick, {
    SHARE_OPTIONS,
    handleWhatsappShare,
    handleClickAudioNews
} from '../../../../../components/features/LN/DS-Toolbar/_helpers';
import {
    copyToClipboard,
    getTwitterTitle,
    popUpCompartirMailTo,
    popUpCompartirNotaFB,
    popUpCompartirNotaTW,
    shareWhatsAppDesktop
} from '../../../../../components/private/LN/common/utils/shareHelper';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';
import getAudioEvents from '../../../../../components/features/LN-10-global/common/utils/getAudioEvents';

jest.mock(
    '../../../../../components/private/LN/common/utils/shareHelper',
    () => ({
        copyToClipboard: jest.fn(),
        getTwitterTitle: jest.fn(mobileTitle => mobileTitle || 'default'),
        popUpCompartirMailTo: jest.fn(),
        popUpCompartirNotaFB: jest.fn(),
        popUpCompartirNotaTW: jest.fn(),
        shareWhatsAppDesktop: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock(
    '../../../../../components/features/LN-10-global/common/utils/getAudioEvents',
    () => jest.fn(() => ({ audio_id: '123', nota_id: '456' }))
);

jest.mock('../../../../../components/features/ui/ln/icon/default', () =>
    jest.fn(() => null)
);

describe('Components - features - LN - DS-Toolbar - _helpers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('SHARE_OPTIONS', () => {
        it('has 5 share options', () => {
            expect(SHARE_OPTIONS).toHaveLength(5);
        });

        it('each option has required properties', () => {
            const requiredProps = ['id', 'label', 'icon', 'tag', 'onClick'];

            SHARE_OPTIONS.forEach(option => {
                requiredProps.forEach(prop => {
                    expect(option).toHaveProperty(prop);
                });
            });
        });

        it('has correct option ids', () => {
            const ids = SHARE_OPTIONS.map(option => option.id);
            expect(ids).toEqual(['whatsapp', 'link', 'facebook', 'x', 'mail']);
        });

        describe('whatsapp option', () => {
            it('calls shareWhatsAppDesktop and datalayer on click', () => {
                const whatsappOption = SHARE_OPTIONS.find(
                    o => o.id === 'whatsapp'
                );
                const params = {
                    requestUri: '/test',
                    host: 'https://example.com',
                    title: 'Test Title'
                };

                whatsappOption.onClick(params);

                expect(shareWhatsAppDesktop).toHaveBeenCalledWith(
                    params.requestUri,
                    params.host
                );
                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'share_note',
                    title: params.title,
                    rest: { tags: 'whatsapp' }
                });
            });
        });

        describe('link option', () => {
            it('calls copyToClipboard, setCopied and datalayer on click', () => {
                const linkOption = SHARE_OPTIONS.find(o => o.id === 'link');
                const setCopied = jest.fn();
                const params = { setCopied, title: 'Test Title' };

                linkOption.onClick(params);

                expect(copyToClipboard).toHaveBeenCalled();
                expect(setCopied).toHaveBeenCalledWith(true);
                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'share_note',
                    title: params.title,
                    rest: { tags: 'link' }
                });
            });
        });

        describe('facebook option', () => {
            it('calls popUpCompartirNotaFB and datalayer on click', () => {
                const fbOption = SHARE_OPTIONS.find(o => o.id === 'facebook');
                const params = {
                    requestUri: '/test',
                    host: 'https://example.com',
                    title: 'Test Title'
                };

                fbOption.onClick(params);

                expect(popUpCompartirNotaFB).toHaveBeenCalledWith(
                    params.requestUri,
                    params.host
                );
                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'share_note',
                    title: params.title,
                    rest: { tags: 'facebook' }
                });
            });
        });

        describe('x option', () => {
            it('calls getTwitterTitle, popUpCompartirNotaTW and datalayer on click', () => {
                const xOption = SHARE_OPTIONS.find(o => o.id === 'x');
                const params = {
                    requestUri: '/test',
                    host: 'https://example.com',
                    title: 'Test Title',
                    mobileTitle: 'Mobile Title'
                };

                xOption.onClick(params);

                expect(getTwitterTitle).toHaveBeenCalledWith(
                    params.mobileTitle,
                    params.title
                );
                expect(popUpCompartirNotaTW).toHaveBeenCalledWith(
                    params.requestUri,
                    params.host,
                    params.mobileTitle
                );
                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'share_note',
                    title: params.title,
                    rest: { tags: 'x' }
                });
            });
        });

        describe('mail option', () => {
            it('calls popUpCompartirMailTo and datalayer on click', () => {
                const mailOption = SHARE_OPTIONS.find(o => o.id === 'mail');
                const params = {
                    requestUri: '/test',
                    host: 'https://example.com',
                    title: 'Test Title'
                };

                mailOption.onClick(params);

                expect(popUpCompartirMailTo).toHaveBeenCalledWith(
                    params.requestUri,
                    params.host
                );
                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'share_note',
                    title: params.title,
                    rest: { tags: 'mail' }
                });
            });
        });
    });

    describe('handleShareClick', () => {
        const defaultParams = {
            shareButton: jest.fn(),
            toggleShareMenu: jest.fn(),
            noteId: 'note-123',
            title: 'Test Title'
        };

        describe('on desktop', () => {
            beforeEach(() => {
                Object.defineProperty(window, 'matchMedia', {
                    writable: true,
                    value: jest.fn().mockImplementation(() => ({
                        matches: false
                    }))
                });
            });

            it('calls toggleShareMenu', () => {
                handleShareClick(defaultParams);

                expect(defaultParams.toggleShareMenu).toHaveBeenCalled();
                expect(defaultParams.shareButton).not.toHaveBeenCalled();
            });

            it('does not send datalayer event', () => {
                handleShareClick(defaultParams);

                expect(addEventToDataLayerV2).not.toHaveBeenCalled();
            });
        });

        describe('on mobile with native share', () => {
            beforeEach(() => {
                Object.defineProperty(window, 'matchMedia', {
                    writable: true,
                    value: jest.fn().mockImplementation(() => ({
                        matches: true
                    }))
                });
                Object.defineProperty(navigator, 'share', {
                    writable: true,
                    value: jest.fn()
                });
            });

            it('calls shareButton', () => {
                handleShareClick(defaultParams);

                expect(defaultParams.shareButton).toHaveBeenCalled();
                expect(defaultParams.toggleShareMenu).not.toHaveBeenCalled();
            });

            it('sends datalayer event with popup-nativo tag', () => {
                handleShareClick(defaultParams);

                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'share_note',
                    articleId: defaultParams.noteId,
                    title: defaultParams.title,
                    rest: { tags: 'popup-nativo' }
                });
            });
        });

        describe('on mobile without native share', () => {
            beforeEach(() => {
                Object.defineProperty(window, 'matchMedia', {
                    writable: true,
                    value: jest.fn().mockImplementation(() => ({
                        matches: true
                    }))
                });
                Object.defineProperty(navigator, 'share', {
                    writable: true,
                    value: undefined
                });
            });

            it('calls toggleShareMenu as fallback', () => {
                handleShareClick(defaultParams);

                expect(defaultParams.toggleShareMenu).toHaveBeenCalled();
                expect(defaultParams.shareButton).not.toHaveBeenCalled();
            });
        });
    });

    describe('handleWhatsappShare', () => {
        it('calls whatsapp onClick with correct params', () => {
            const params = {
                requestUri: '/test',
                title: 'Test Title',
                host: 'https://example.com'
            };

            handleWhatsappShare(params);

            expect(shareWhatsAppDesktop).toHaveBeenCalledWith(
                params.requestUri,
                params.host
            );
            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'share_note',
                title: params.title,
                rest: { tags: 'whatsapp' }
            });
        });
    });

    describe('handleClickAudioNews', () => {
        const defaultParams = {
            onOpenAudioPlayer: jest.fn(),
            globalContent: { _id: 'note-123' },
            globalContentConfig: { query: { uri: '/test' } },
            isSummary: false,
            subscription: true,
            token: 'test-token',
            openBarrier: jest.fn()
        };

        beforeEach(() => {
            jest.clearAllMocks();
        });

        describe('when user is subscribed and has token', () => {
            it('calls onOpenAudioPlayer', () => {
                handleClickAudioNews(defaultParams);

                expect(defaultParams.onOpenAudioPlayer).toHaveBeenCalled();
                expect(defaultParams.openBarrier).not.toHaveBeenCalled();
            });
        });

        describe('when user is not subscribed', () => {
            it('calls openBarrier', () => {
                handleClickAudioNews({
                    ...defaultParams,
                    subscription: false
                });

                expect(defaultParams.openBarrier).toHaveBeenCalled();
                expect(defaultParams.onOpenAudioPlayer).not.toHaveBeenCalled();
            });
        });

        describe('when user has no token', () => {
            it('calls openBarrier', () => {
                handleClickAudioNews({
                    ...defaultParams,
                    token: null
                });

                expect(defaultParams.openBarrier).toHaveBeenCalled();
                expect(defaultParams.onOpenAudioPlayer).not.toHaveBeenCalled();
            });
        });

        it('always sends datalayer event', () => {
            handleClickAudioNews(defaultParams);

            expect(getAudioEvents).toHaveBeenCalledWith(
                defaultParams.globalContent,
                defaultParams.globalContentConfig,
                defaultParams.isSummary
            );
            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'page_listened',
                rest: {
                    audio_id: '123',
                    nota_id: '456',
                    reproduccion: '0'
                }
            });
        });

        it('sends datalayer event even when user is not subscribed', () => {
            handleClickAudioNews({
                ...defaultParams,
                subscription: false
            });

            expect(addEventToDataLayerV2).toHaveBeenCalled();
        });
    });
});
