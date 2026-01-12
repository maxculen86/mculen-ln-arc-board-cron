jest.mock(
    './components/features/private-global/common/iconSprite/IconSprite',
    () => 'mock-icon'
);

jest.mock(
    './components/features/ui/ln/icon/default.jsx',
    () => 'mock-ds-common-icon'
);
// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
}));

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
