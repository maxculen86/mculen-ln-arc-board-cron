import { SITE_LANACION, SITE_OTT } from 'fusion:environment';
import { useAppContext } from 'fusion:context';

const getDomain = (globalContent = {}) => {
    const { arcSite } = useAppContext();
    const domain = arcSite === 'ott' ? SITE_OTT : SITE_LANACION;

    // Si viene con "/" al final, la saco
    return domain.replace(/\/$/, '');
};

export default getDomain;
