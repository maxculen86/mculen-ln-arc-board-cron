import { addForwardSlash } from '../../LN/common/utils/addForwardSlash';

const getCanonicalLink = ({
    arcSite,
    baseUrlByArcType,
    mustUseSiteUrl,
    siteUrl,
    canonicalUrl,
    canonicalSlash
}) =>
    mustUseSiteUrl
        ? siteUrl
        : addForwardSlash(
              `${baseUrlByArcType[arcSite]}${canonicalUrl || canonicalSlash}`
          );
export default getCanonicalLink;
