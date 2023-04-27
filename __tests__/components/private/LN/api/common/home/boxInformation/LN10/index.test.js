import { boxInfoBySectionAliasLN10 } from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/index';
import boxInfoAnticipo from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoAnticipo';
import boxInfoApertura from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoApertura';
import boxInfoHashTag from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoHashTag';
import boxInfoExclusiveSuscriptor from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoExclusiveSuscriptor';
import boxInfoAFondo from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoAFondo';
import boxInfoComplete from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoComplete';
import boxInfoBomba from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoBomba';
import boxInfoEditoriales from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoEditoriales';
import boxInfoOpinion from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/boxInfoOpinion';

describe('boxInfoBySectionAliasLN10', () => {
    it('should contain expected keys and values', () => {
        expect(boxInfoBySectionAliasLN10).toEqual({
            'ln-common/ln10_anticipo': boxInfoAnticipo,
            apertura: boxInfoApertura,
            bomba: boxInfoBomba,
            bombita: boxInfoBomba,
            hashtag: boxInfoHashTag,
            'sub-exclusive': boxInfoExclusiveSuscriptor,
            'ln-common/ln10_editorial': boxInfoEditoriales,
            'ln-common/ln10_opinion': boxInfoOpinion,
            afondo: boxInfoAFondo,
            default: boxInfoComplete
        });
    });
});
