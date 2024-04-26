jest.mock(
    './components/features/private-global/common/iconSprite/IconSprite',
    () => 'mock-icon'
);

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
