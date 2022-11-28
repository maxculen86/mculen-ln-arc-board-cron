import {
    crtViewTracker,
    handleClickForCTRcomponent
} from '../../../../../components/private/common/utils/noteTracker/ctrTracker';

describe('CTR tracker util', () => {
    describe('ctrViewTracker function', () => {
        test('When navigate, send event to data layer', () => {
            global.window.dataLayer = [];
            Object.defineProperty(window, 'performance', {
                value: {
                    getEntriesByType: jest
                        .fn()
                        .mockReturnValue([{ type: 'navigate' }]),
                    measure: jest.fn()
                }
            });
            crtViewTracker(true, () => {});
            expect(window.dataLayer).toStrictEqual([
                {
                    event: 'CTR view',
                    brand: 'stickyMobile_diag1',
                    position: '101101'
                }
            ]);
        });
        test('On reload, must not send event to data layer', () => {
            delete global.window;
            global.window = {
                dataLayer: []
            };
            Object.defineProperty(window, 'performance', {
                value: {
                    getEntriesByType: jest
                        .fn()
                        .mockReturnValue([{ type: 'reload' }]),
                    measure: jest.fn()
                }
            });
            crtViewTracker(true, () => {});
            expect(window.dataLayer).toStrictEqual([]);
        });
    });
    describe('handleClickForCTRcomponent function', () => {
        test('When navigate and click en X button send event to data layer', () => {
            delete global.window;
            global.window = {
                dataLayer: []
            };
            Object.defineProperty(window, 'performance', {
                value: {
                    getEntriesByType: jest
                        .fn()
                        .mockReturnValue([{ type: 'navigate' }]),
                    measure: jest.fn()
                }
            });
            handleClickForCTRcomponent('close');
            expect(window.dataLayer).toStrictEqual([
                {
                    event: 'CTR close',
                    brand: 'stickyMobile_diag1',
                    position: '101101'
                }
            ]);
        });
        test('When navigate, and click on note must send event to data layer', () => {
            delete global.window;
            global.window = {
                dataLayer: []
            };
            Object.defineProperty(window, 'performance', {
                value: {
                    getEntriesByType: jest
                        .fn()
                        .mockReturnValue([{ type: 'navigate' }]),
                    measure: jest.fn()
                }
            });
            handleClickForCTRcomponent('open');
            expect(window.dataLayer).toStrictEqual([
                {
                    event: 'CTR open note',
                    brand: 'stickyMobile_diag1',
                    position: '101101'
                }
            ]);
        });
        test('On reload, and click on note shouldnt send event to data layer', () => {
            delete global.window;
            global.window = {
                dataLayer: []
            };
            Object.defineProperty(window, 'performance', {
                value: {
                    getEntriesByType: jest
                        .fn()
                        .mockReturnValue([{ type: 'reload' }]),
                    measure: jest.fn()
                }
            });
            handleClickForCTRcomponent('open');
            expect(window.dataLayer).toStrictEqual([]);
        });
    });
});
