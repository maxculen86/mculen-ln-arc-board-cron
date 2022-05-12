import { useAppContext } from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import { getCustParamsEnconde } from './getDataFormated';

const urlForPrerollAds = device => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { requestUri, globalContent, outputType } = useAppContext();

    const deviceResolution = {
        desktop: 'dsk',
        tablet: 'tab',
        mobile: 'mob'
    };

    const { taxonomy, label = {} } = globalContent || {};
    const { mostrar_banners: mostrarBanners = {} } = label;
    const { text = '' } = mostrarBanners;

    const withPrerolAds = text !== 'No';

    const { sections, tags } = taxonomy || {
        sections: [],
        tags: []
    };

    const custParamsEncoded = getCustParamsEnconde(tags, sections);

    const prerollProfile =
        (outputType === 'amp' && outputType) || deviceResolution[device];

    const site = outputType === 'amp' ? 'AMP/ROS' : `la_nacion_${device}`;

    const url = encodeURIComponent(`${SITE_LANACION}${requestUri}`);
    // TODO: por ahora esta hardcodeado "Nota" en la url. Ver si hace falta hacer
    // alguna logica para completar ese campo
    return withPrerolAds
        ? `https://pubads.g.doubleclick.net/gampad/ads?slotname=/133919216/${site}/Nota/preroll_${
              prerollProfile // eslint-disable-next-line prettier/prettier
          }&sz=640x480|400x300&ciu_szs=300x250&unviewed_position_start=1&output=vast&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=preroll&cust_params=section%3D${
              custParamsEncoded // eslint-disable-next-line prettier/prettier
          }&pod=3&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&url=${url}&description_url=${
              url // eslint-disable-next-line prettier/prettier
          }&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0&correlator=${new Date().getTime()}`
        : '';
};

export default urlForPrerollAds;
