import { useContent } from 'fusion:content';
import { SITE_LANACION } from 'fusion:environment';

const getDomain = (arcSite, globalContent = {}) => {
    let domainSiteGeneral;
    let domainSiteOfSection;
    const { _id = '', website_url = '' } = globalContent;
    if (_id === '/recetas' || website_url.includes('/recetas')) {
        const data = useContent({
            sourceName: 'navigationTreeSource',
            query: {
                website: arcSite
            }
        });

        if (data) {
            const sectionFinded = data.children.find(sec => sec._id === _id);
            domainSiteOfSection =
                sectionFinded &&
                sectionFinded.site &&
                sectionFinded.site.site_url;
            domainSiteGeneral = data.site && data.site.site_url;
        }
    }

    const domain = domainSiteOfSection || domainSiteGeneral || SITE_LANACION;
    // Si viene con "/" al final, la saco
    return domain && domain.replace(/\/$/, '');
};

export default getDomain;
