const configPlaywright = {
    browsers: ['chromium', 'webkit', 'firefox'],
    exitOnPageError: false,
    launchOptions: {
        headless: true,
        args: ['--no-sandbox']
    },
    launchType: 'LAUNCH'
};

if (process.env.BROWSER) {
    configPlaywright.browsers = [];
    configPlaywright.browsers.push(process.env.BROWSER);
}

const config = {
    verbose: true,
    preset: 'jest-playwright-jsdom',
    setupFiles: ['./config/jestSetup.js'],
    rootDir: '../',
    testEnvironmentOptions: { 'jest-playwright': configPlaywright }
};

module.exports = config;
