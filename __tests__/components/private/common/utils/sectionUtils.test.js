import { getFirstParentSection } from '../../../../../components/private/common/utils/sectionUtils';
import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import siteProps from '../../../../../__mocks__/data/properties/lnSiteProps';

//TODO: hacer tests
describe('Utils - SectionUtils', () => {
    it('getFirstParentSection test', () => {
        const parent = getFirstParentSection({
            _id: '/recetas/platos-principales/carne'
        });
        expect(parent).toBe('recetas');
    });
});
