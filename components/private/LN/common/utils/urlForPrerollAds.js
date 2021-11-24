import { useAppContext } from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import { getCustParamsEnconde } from './getDataFormated';

const urlForPrerollAds = device => {
    const { requestUri, globalContent } = useAppContext();
    const deviceResolution = {
        desktop: 'dsk',
        tablet: 'tab',
        mobile: 'mob'
    };
    const { taxonomy } = globalContent || {};
    const { sections, tags } = taxonomy || {
        sections: [],
        tags: []
    };

    const custParamsEncoded = getCustParamsEnconde(tags, sections);

    const url = encodeURIComponent(`${SITE_LANACION}${requestUri}`);
    // TODO: por ahora esta hardcodeado "Nota" en la url. Ver si hace falta hacer
    // alguna logica para completar ese campo
    const adsURL = `https://pubads.g.doubleclick.net/gampad/ads?slotname=/133919216/la_nacion_${device}/Nota/preroll_${
        deviceResolution[device]
    }&sz=640x480|400x300&ciu_szs=300x250&unviewed_position_start=1&output=vast&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=preroll&cust_params=section%3D${
        custParamsEncoded // eslint-disable-next-line prettier/prettier
    }&pod=3&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&url=${url}&description_url=${
        url // eslint-disable-next-line prettier/prettier
    }&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0&correlator=${new Date().getTime()}`;

    return adsURL;
};

export default urlForPrerollAds;
