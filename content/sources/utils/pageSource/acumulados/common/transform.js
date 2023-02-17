import IndexAcuV1 from '../../../../../../components/private/LN/api/v1/global/accumulated';
import IndexAcuV2 from '../../../../../../components/private/LN/api/v2/global/accumulated';
import IndexAcuV1Mobile from '../../../../../../components/private/LN/api/v1/mobile/accumulated';

const transform = (data, params) => {
    const respData = data;
    try {
        const apiData = {
            global: {
                1: IndexAcuV1,
                2: IndexAcuV2
            },
            mobile: {
                1: IndexAcuV1Mobile
            }
        };
        const version = params.versionUri;
        const category = params.categoryUri ? params.categoryUri : 'global';

        const indexAcu = apiData[category][version];

        const acuData = {
            tipoAcumulado: 1,
            name: params.title,
            articles: respData.content_elements,
            paginator: respData.next,
            total: respData.count,
            configuration: params.configuration
        };

        return indexAcu(acuData);
    } catch (error) {
        // eslint-disable-next-line no-console
        let dataStr = '';
        if (typeof respData === 'object' || Array.isArray(respData)) {
            dataStr = JSON.stringify(data);
        }
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - content/apiPageAcumuladosSource : ${dataStr} - siteprops: ${JSON.stringify(
                params
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
