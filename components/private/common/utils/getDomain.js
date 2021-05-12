import { SITE_LANACION } from 'fusion:environment';

const getDomain = (globalContent = {}) => {
    // Si viene con "/" al final, la saco
    return SITE_LANACION.replace(/\/$/, '');
};

export default getDomain;
