import Consumer from 'fusion:consumer';
import { SITE_LANACION } from 'fusion:environment';
import get from '../../../private/common/utils/get';
import { handleHttpError } from '../../../private/common/utils/handleHttpError';

const resolve = query => {
    const { rootPath, website, ticksCache, versionDeploy } = query;
    const arcSite = website || 'la-nacion-ar';
    const paramasVersionDeploy =
        versionDeploy != null ? `&d=${versionDeploy}` : '';
    const paramsTicks = ticksCache != null ? `&ticks=${ticksCache}` : '';
    return `${rootPath}/?_website=${arcSite}&outputType=jsonv2${paramsTicks}${paramasVersionDeploy}`;
};

const getContentPage = async (query, cookie) => {
    const opt = {
        method: 'GET'
    };

    if (cookie && cookie.trim() !== '') {
        opt.headers = {
            Cookie: cookie
        };
    }

    const response = await global.fetch(resolve(query), opt);

    handleHttpError(response);

    return response;
};

class HomeUpdate {
    constructor(props) {
        this.state = {};
        this.props = props;
        this.queryParams = {};
        this.contentVersion = '';

        this.query = props.globalContentConfig.query;
        this.aliasPage = '/homepage';
        this.regexVD = /[0-9]+/;
        this.vd = get(this.query, 'versionDeploy', null);
        this.vd =
            this.regexVD.exec(this.vd) && this.regexVD.exec(this.vd).length > 0
                ? this.regexVD.exec(this.vd)[0]
                : null;

        this.cookie = get(this.query, 'useCookie', null);
        this.website = get(this.query, 'website', null);
        this.contentVersion = get(this.query, 'contentVersion', null);
        this.ticksCache = get(this.query, 'ticks', null);

        this.queryParams = {
            rootPath: `${SITE_LANACION}`,
            ticksCache: this.ticksCache,
            website: this.website,
            isPage: true,
            versionDeploy: this.versionDeploy,
            cookie: this.cookie
        };

        this.state = getContentPage(this.queryParams, this.cookie);
    }

    async render() {
        try {
            const page = await this.state;
            const resultPage = await page.json();
            if (resultPage?.metadata?.contentVersion !== undefined) {
                return {
                    homeUpdated:
                        this.contentVersion !==
                        resultPage.metadata.contentVersion,
                    contentVersion: resultPage.metadata.contentVersion
                };
            }

            console.warn(
                JSON.stringify({
                    name: 'BackendLnWarn',
                    customType: 'homeUpdateFeature',
                    log_details: {
                        message: 'No se pudo obtener la version del contenido',
                        queryParams: this.queryParams
                    }
                })
            );

            return {
                homeUpdated: false
            };
        } catch (err) {
            console.warn(
                JSON.stringify({
                    name: 'BackendLnWarn',
                    customType: 'homeUpdateFeatureError',
                    log_details: {
                        errorMessage: err.message,
                        queryParams: this.queryParams
                    }
                })
            );
            return {
                homeUpdated: false
            };
        }
    }
}

export default Consumer(HomeUpdate);
