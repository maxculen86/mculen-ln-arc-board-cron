import homeV1 from '../../../v1/mobile/home/index';

const index = (
    children,
    paramsFromPage = {
        rootPath:
            'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=json'
    }
) => {
    const homeV1Result = homeV1(children, paramsFromPage);
    return [
        {
            metadata: {
                pagination: false
            },
            items: Array.isArray(homeV1Result) ? homeV1Result[0] : []
        }
    ];
};

export default index;
