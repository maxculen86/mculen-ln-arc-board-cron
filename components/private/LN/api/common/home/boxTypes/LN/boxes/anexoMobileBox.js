import { anexoMobileBox as anexoBoxCommon } from '../../common/anexoMobileBox';
import { cardAnexoHtmlOrUrl as Anexo } from '../../../../article/cardAnexo/index';

export const anexoMobileBox = (element, featureInfo) => {
    return anexoBoxCommon(element, featureInfo, Anexo);
};

export default anexoMobileBox;
