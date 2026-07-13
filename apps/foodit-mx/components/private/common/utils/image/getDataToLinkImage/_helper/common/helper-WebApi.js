import get from '../../../../get';
import siteProperties from '../../../../../../../../properties/sites/foodit';

export const isHomeLN10 = layout =>
    get(siteProperties, 'layoutsName.HomeLN10', '') === layout;

export default isHomeLN10;
