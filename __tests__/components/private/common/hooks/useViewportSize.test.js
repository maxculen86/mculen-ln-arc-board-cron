import React from 'react';
import useViewportSize from '../../../../../components/private/common/hooks/useViewportSize';

const viewportMock = '';
const setViewportSize = jest.fn().mockImplementation(x => x);
React.useState = jest.fn().mockReturnValue([viewportMock, setViewportSize]);
React.useEffect = jest.fn().mockImplementation(f => f());
afterEach(() => {
    delete global.window;
    delete global.screen;
    delete global.navigator;
    setViewportSize.mockClear();
});

describe('Private - Common - Hooks - useViewportSize', () => {
    it('Should return desktop', () => {
        global.window = {
            opera: 'mock-opera'
        };
        global.screen = {
            width: 1100
        };
        global.navigator = {
            vendor: 'Google Inc.'
        };
        expect(useViewportSize()).toEqual('');
        expect(setViewportSize).toBeCalledTimes(1);
        expect(setViewportSize).toBeCalledWith('desktop');
    });
    it('Should return tablet', () => {
        global.screen = {
            width: 800
        };
        global.navigator = {
            vendor: 'ipad'
        };
        expect(useViewportSize()).toEqual('');
        expect(setViewportSize).toBeCalledTimes(1);
        expect(setViewportSize).toBeCalledWith('tablet');
    });
    it('Should return mobile', () => {
        const isSSR = jest
            .fn()
            .mockReturnValue(() => typeof window === 'undefined');
        global.screen = {
            width: 540
        };
        global.navigator = {
            vendor: 'blackberry'
        };
        expect(useViewportSize()).toEqual('');
        expect(setViewportSize).toBeCalledTimes(1);
        expect(setViewportSize).toBeCalledWith('mobile');
    });
});
