import {
    handleShareNativeTrigger,
    SHARE_OPTIONS
} from '../../../../../components/features/LN/DS-Toolbar/_helpers';
import {
    copyToClipboard,
    getTwitterTitle,
    popUpCompartirMailTo,
    popUpCompartirNotaFB,
    popUpCompartirNotaTW
} from '../../../../../components/private/LN/common/utils/shareHelper';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/shareHelper',
    () => ({
        copyToClipboard: jest.fn(),
        getTwitterTitle: jest.fn(mobileTitle => mobileTitle || 'default'),
        popUpCompartirMailTo: jest.fn(),
        popUpCompartirNotaFB: jest.fn(),
        popUpCompartirNotaTW: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock('../../../../../components/features/ui/ln/icon/default', () =>
    jest.fn(() => null)
);

describe('Components - features - LN - DS-Toolbar - _helpers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('SHARE_OPTIONS desktop', () => {
        it('has 4 share options', () => {
            expect(SHARE_OPTIONS).toHaveLength(4);
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
            expect(ids).toEqual([
                'share_option_link',
                'share_option_facebook',
                'share_option_x',
                'share_option_mail'
            ]);
        });

        describe('link option', () => {
            it('calls copyToClipboard, setCopied and datalayer on click', () => {
                const linkOption = SHARE_OPTIONS.find(
                    o => o.id === 'share_option_link'
                );
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
                const fbOption = SHARE_OPTIONS.find(
                    o => o.id === 'share_option_facebook'
                );
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
                const xOption = SHARE_OPTIONS.find(
                    o => o.id === 'share_option_x'
                );
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
                const mailOption = SHARE_OPTIONS.find(
                    o => o.id === 'share_option_mail'
                );
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

    describe('handleShareNativeTrigger', () => {
        const defaultParams = {
            shareNativeTrigger: jest.fn(),
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

            it('does not call shareNativeTrigger', () => {
                handleShareNativeTrigger(defaultParams);

                expect(defaultParams.shareNativeTrigger).not.toHaveBeenCalled();
            });

            it('does not send datalayer event', () => {
                handleShareNativeTrigger(defaultParams);

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

            it('calls shareNativeTrigger', () => {
                handleShareNativeTrigger(defaultParams);

                expect(defaultParams.shareNativeTrigger).toHaveBeenCalled();
            });

            it('sends datalayer event with popup-nativo tag', () => {
                handleShareNativeTrigger(defaultParams);

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

            it('does not call shareNativeTrigger', () => {
                handleShareNativeTrigger(defaultParams);

                expect(defaultParams.shareNativeTrigger).not.toHaveBeenCalled();
            });
        });
    });
});
