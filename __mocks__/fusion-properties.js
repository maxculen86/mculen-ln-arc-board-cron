/**
 * Global mock for a fusion:consumer when running
 * unit tests of anything using a consumer HOC.
 *
 * In order to use this mock you must do
 * `import Consumer from 'fusion:consumer';`
 * at the top of your unit test file, this will
 * trigger jest to mock the Consumer import below
 * */

jest.mock('fusion:properties', () => {
    return function(source) {
        switch (source) {
            case 'ott':
                return require('./data/properties/ottSiteProps');
            default:
                return {
                    sliderConfig: [
                        {
                            name: 'desktop',
                            lowerRange: 1380,
                            topRange: null,
                            pageSize: 4
                        }
                    ]
                };
        }
    };
});
