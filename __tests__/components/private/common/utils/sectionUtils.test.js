import sectionUtils from '../../../../../components/private/common/utils/sectionUtils';
import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

describe('Utils - SectionUtils', () => {
    it('Test de primarySectionTreeResolver', () => {
        const sectionTree = sectionUtils.primarySectionTreeResolver(nota);

        expect(sectionTree.length).toBe(4);
    });
});
