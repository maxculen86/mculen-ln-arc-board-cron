import boxInfoBySectionAliasLN from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN/index';
import { boxInfoComplete } from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN/boxes/boxInfoComplete';
import { boxInfoApertura } from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN/boxes/boxInfoApertura';
import { boxInfoAnticipo } from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN/boxes/boxInfoAnticipo';
import * as information from '../../../../../../../../../__mocks__/data/LN10_BoxInformation/information.json';
describe('boxInfoBySectionAliasLN', () => {
    it('should return boxInfoAnticipo when section alias is "ln-common/cajaanticipo"', () => {
        const section = 'ln-common/cajaanticipo';
        const typeSection = { default: { type: 'default' } };
        const expected = boxInfoAnticipo(information, section, typeSection);
        const result = boxInfoBySectionAliasLN[section](
            information,
            section,
            typeSection
        );
        expect(result).toEqual(expected);
    });

    it('should return boxInfoApertura when section alias is "apertura"', () => {
        const section = 'apertura';
        const typeSection = { default: { type: 'default' } };
        const expected = boxInfoApertura(information, section, typeSection);
        const result = boxInfoBySectionAliasLN[section](
            information,
            section,
            typeSection
        );
        expect(result).toEqual(expected);
    });

    it('should return boxInfoApertura when section alias is "ln-acumulado/timeline"', () => {
        const section = 'ln-acumulado/timeline';
        const typeSection = { default: { type: 'default' } };
        const expected = boxInfoApertura(information, section, typeSection);
        const result = boxInfoBySectionAliasLN[section](
            information,
            section,
            typeSection
        );
        expect(result).toEqual(expected);
    });

    it('should return boxInfoComplete when section alias is not "ln-common/cajaanticipo", "apertura" or "ln-acumulado/timeline"', () => {
        const section = 'default';
        const typeSection = { default: { type: 'default' } };
        const expected = boxInfoComplete(information, section, typeSection);
        const result = boxInfoBySectionAliasLN[section](
            information,
            section,
            typeSection
        );
        expect(result).toEqual(expected);
    });
});
