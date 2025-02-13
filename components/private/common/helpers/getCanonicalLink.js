import { addForwardSlash } from '../../LN/common/utils/addForwardSlash';
import { ottProgramsLayouts } from '../utils/getMetasOGHelper';

const getCanonicalLink = ({
    _id,
    arcSite,
    layout,
    baseUrlByArcType,
    mustUseSiteUrl,
    siteUrl,
    canonicalUrl,
    canonicalSlash
}) => {
    if (arcSite === 'ott' && ottProgramsLayouts.includes(layout)) {
        return addForwardSlash(
            _id
                ? `${baseUrlByArcType[arcSite]}/programas${_id}`
                : `${baseUrlByArcType[arcSite]}/programas/`
        );
    }

    return mustUseSiteUrl
        ? siteUrl
        : addForwardSlash(
              `${baseUrlByArcType[arcSite]}${canonicalUrl || canonicalSlash}`
          );
};

export default getCanonicalLink;
