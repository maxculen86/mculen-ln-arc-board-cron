import boxInfoByLayoutBySectionAlias from '../../../../../../../../components/private/LN/api/common/home/boxInformation/index';
import { boxInfoBySectionAliasLN } from '../../../../../../../../components/private/LN/api/common/home/boxInformation/LN/index';
import { boxInfoBySectionAliasLN10 } from '../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/index';

describe('boxInfoByLayoutBySectionAlias', () => {
    it('should return default boxInfoBySectionAliasLN when layoutPage is not found', () => {
        const layoutPage = 'Non-existent Layout Page';
        const sectionAlias = 'default';
        const expected = boxInfoBySectionAliasLN.default;
        const result = boxInfoByLayoutBySectionAlias(layoutPage, sectionAlias);
        expect(result).toEqual(expected);
    });

    it('should return default boxInfoBySectionAliasLN when sectionAlias is not found', () => {
        const layoutPage = 'LN-Home_Main';
        const sectionAlias = 'Non-existent Section Alias';
        const expected = boxInfoBySectionAliasLN.default;
        const result = boxInfoByLayoutBySectionAlias(layoutPage, sectionAlias);
        expect(result).toEqual(expected);
    });

    it('should return boxInfoBySectionAliasLN when layoutPage is LN-Home_Main and sectionAlias is default', () => {
        const layoutPage = 'LN-Home_Main';
        const sectionAlias = 'default';
        const expected = boxInfoBySectionAliasLN.default;
        const result = boxInfoByLayoutBySectionAlias(layoutPage, sectionAlias);
        expect(result).toEqual(expected);
    });

    it('should return boxInfoBySectionAliasLN10 when layoutPage is LN10-Home_Main and sectionAlias is hashtag', () => {
        const layoutPage = 'LN10-Home_Main';
        const sectionAlias = 'hashtag';
        const expected = boxInfoBySectionAliasLN10.hashtag;
        const result = boxInfoByLayoutBySectionAlias(layoutPage, sectionAlias);
        expect(result).toEqual(expected);
    });
});
