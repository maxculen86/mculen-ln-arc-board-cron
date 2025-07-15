//  Run with url http://172.17.0.1/api/mobile/v2/home/updated/e8915bf748c5b97521f6b8984791f1ae1c0652a2d27ab41c4083ff17142a272e/1712661842695/?_website=la-nacion-ar&outputType=json
const fetch = () => ({});

export default {
    fetch,
    params: {
        website: 'text',
        versionUri: 'text',
        namePage: 'text',
        contentVersion: 'text',
        ticks: 'text',
        versionDeploy: 'text',
        useCookie: 'text'
    },
    ttl: 120
};
