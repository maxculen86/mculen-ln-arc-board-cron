import { SITE_LANACION, SITE_OTT } from 'fusion:environment';
import { useAppContext } from 'fusion:context';

const getDomain = (globalContent = {}) => {
    const { arcSite } = useAppContext();
    // TODO: limpieza OTT - Borrar en iteración 5 de 5
    const domain = arcSite === 'ott' ? SITE_OTT : SITE_LANACION;

    // Si viene con "/" al final, la saco
    return domain.replace(/\/$/, '');
};

export default getDomain;
