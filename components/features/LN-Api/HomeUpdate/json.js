import Consumer from 'fusion:consumer';
import nodeFetch from 'node-fetch';
import get from '../../../private/common/utils/get';
import { SITE_LANACION } from 'fusion:environment';
import transformv1 from '../../../../content/sources/utils/pageSource/pageHome/v1/mobile/transform';
import homev2 from '../../../private/LN/api/v2/mobile/home';

const resolve = query => {
    const { rootPath, website, ticksCache, versionDeploy } = query;
    const arcSite = website || 'la-nacion-ar';
    const paramasVersionDeploy =
        versionDeploy != null ? `&d=${versionDeploy}` : '';
    const paramsTicks = ticksCache != null ? `&ticks=${ticksCache}` : '';
    return `${rootPath}/?_website=${arcSite}&outputType=json${paramsTicks}${paramasVersionDeploy}`;
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

    return await nodeFetch(resolve(query), opt);
};

class HomeUpdate {
    constructor(props) {
        this.state = {};
        this.props = props;
        this.queryParams = {};
        this.contentVersion = '';

        this.query = props.globalContentConfig.query;
        this.aliasPage = '/homepage';
        this.regexVersionDeploy = new RegExp('[0-9]+');
        this.versionDeploy = get(this.query, 'versionDeploy', null);
        this.versionDeploy =
            this.regexVersionDeploy.exec(this.versionDeploy) &&
            this.regexVersionDeploy.exec(this.versionDeploy).length > 0
                ? this.regexVersionDeploy.exec(this.versionDeploy)[0]
                : null;

        this.cookie = get(this.query, 'useCookie', null);
        this.website = get(this.query, 'website', null);
        this.contentVersion = get(this.query, 'contentVersion', null);
        this.ticksCache = get(this.query, 'ticks', null);

        this.queryParams = {
            rootPath: `${SITE_LANACION}${this.aliasPage}`,
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

            const { information } = resultPage;
            this.queryParams.information = information;

            const resultPageTransform = await transformv1(
                resultPage,
                this.queryParams
            );

            const resultHome = homev2(resultPageTransform, this.queryParams);

            let hashContentVersion = '';

            if (this.state === null) return null;

            if (
                Array.isArray(resultHome) &&
                resultHome[0].hasOwnProperty('metadata') &&
                resultHome[0].metadata.hasOwnProperty('contentVersion')
            ) {
                hashContentVersion = resultHome[0].metadata.contentVersion;

                return {
                    homeUpdated: this.contentVersion !== hashContentVersion,
                    contentVersion: hashContentVersion
                };
            }

            return null;
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(HomeUpdate);
