import { useAppContext } from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import {
    getCustParamsEncoded,
    getAuthors,
    getAuthorsFromContentElements
} from './getDataFormated';

const urlForPrerollAds = (device, isJw = false) => {
    const { requestUri, globalContent, outputType } = useAppContext();

    const deviceResolution = {
        desktop: 'dsk',
        tablet: 'tab',
        mobile: 'mob'
    };

    const { taxonomy, label = {}, _id, credits, contentElements } =
        globalContent || {};
    const { mostrar_banners: mostrarBanners = {} } = label;
    const { text = '' } = mostrarBanners;

    const withPrerolAds = text !== 'No';

    const { sections, tags } = taxonomy || {
        sections: [],
        tags: []
    };

    const { by: authors = [] } = credits || {};

    const custParamsEncoded = getCustParamsEncoded(
        tags,
        sections,
        authors,
        _id,
        contentElements
    );

    const prerollProfile =
        (outputType === 'amp' && outputType) || deviceResolution[device];

    const site = outputType === 'amp' ? 'AMP/ROS' : `la_nacion_${device}`;

    const url = encodeURIComponent(`${SITE_LANACION}${requestUri}`);

    const prerollUrl = isJw
        ? `https://pubads.g.doubleclick.net/gampad/ads?slotname=/133919216/la_nacion_video/nota/preroll&sz=640x480|400x300&ciu_szs=300x250&unviewed_position_start=1&output=vast&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=preroll&cust_params=tags_nuevos%3D${custParamsEncoded}&pod=3&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&url=${url}&description_url=${url}&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0&correlator=${new Date().getTime()}`
        : `https://pubads.g.doubleclick.net/gampad/ads?slotname=/133919216/${site}/Nota/preroll_${prerollProfile}&sz=640x480|400x300&ciu_szs=300x250&unviewed_position_start=1&output=vast&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=preroll&cust_params=section%3D${custParamsEncoded}&pod=3&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&url=${url}&description_url=${url}&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0&correlator=${new Date().getTime()}`;

    return withPrerolAds ? prerollUrl : '';
};

export default urlForPrerollAds;
