import { storyBox } from '../LN10/boxes/storyBox';
import { bannerBox } from '../LN10/boxes/bannerBox';
import { anexoMobileBox } from '../LN10/boxes/anexoMobileBox';
import { anticipoBox } from '../LN10/boxes/anticipoBox';
import { sectionAcuBox } from '../LN10/boxes/sectionAcumuladoBox';
import { titleBox } from './boxes/titleBox';
import { dolarBox } from './boxes/dolarBox';
import { emptyBox } from './boxes/emptyBox';

export const boxTypesLN10v2 = {
    0: storyBox,
    1: bannerBox,
    2: anexoMobileBox,
    3: anticipoBox,
    4: titleBox,
    5: dolarBox,
    6: sectionAcuBox,
    7: storyBox,
    8: emptyBox
};
export default boxTypesLN10v2;
