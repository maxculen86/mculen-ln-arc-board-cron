import sectionUtils from '../../../../../components/private/common/utils/sectionUtils';
import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import siteProps from '../../../../../__mocks__/data/properties/lnSiteProps';

describe('Utils - SectionUtils', () => {
    it('Test de primarySectionTreeResolver', () => {
        const sectionTree = sectionUtils.primarySectionTreeResolver({
            globalContent: nota,
            siteProperties: siteProps
        });

        expect(sectionTree.length).toBe(4);
        expect(sectionTree[0].type).toBe('site');
        expect(sectionTree[1].type).toBe('category');

        expect(sectionTree[0].name).toBe('LA NACION');
        expect(sectionTree[3].name).toBe('Pollo');
    });
});
