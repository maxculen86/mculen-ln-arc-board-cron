import getValidElementForPreload from '../../../../../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/common/helper-WebApi';
import { getMockRenderables } from '../../../../../../../../../../__mocks__/data/renderables/renderablesForPreload';
describe('Tests getValidElementForPreload', () => {
    it('should return LN10_Caja_Bomba', () => {
        const renderables = getMockRenderables();
        const resp = getValidElementForPreload('LN10-Home_Main', renderables);
        expect(resp.type).toBe('LN10_Caja_Bomba');
        expect(resp.props.type).toBe('LN10_Caja_Bomba');
    });

    it('should return LN10_Caja_Apertura', () => {
        const renderables = getMockRenderables({ hideBomba: true });
        const resp = getValidElementForPreload('LN10-Home_Main', renderables);
        expect(resp.type).toBe('LN10_Caja_Apertura');
        expect(resp.props.type).toBe('LN10_Caja_Apertura');
    });

    it('should return [] because renderables is empty', () => {
        const resp = getValidElementForPreload('LN10-Home_Main', []);
        expect(resp.length).toBe(0);
    });

    it('should return [] because layout is empty', () => {
        const resp = getValidElementForPreload('', []);
        expect(resp.length).toBe(0);
    });
});
