import configDiagramationsByLayout from '../../../../../../../../components/private/LN/api/global/page/config/configDiagramationsByLayout';
import LN10HomeMainDiagramation from '../../../../../../../../components/layouts/config/api-diagramations/LN10-Home_Main.json';
import LNHomeMainDiagramation from '../../../../../../../../components/layouts/config/api-diagramations/LN-Home_Main.json';
describe('configDiagramationsByLayout', () => {
    it('returns the diagramation for LN-Home_Main layout', () => {
        const layout = 'LN-Home_Main';
        const result = configDiagramationsByLayout(layout);
        expect(result).toEqual(LNHomeMainDiagramation);
    });

    it('returns the diagramation for LN10-Home_Main layout', () => {
        const layout = 'LN10-Home_Main';
        const result = configDiagramationsByLayout(layout);
        expect(result).toEqual(LN10HomeMainDiagramation);
    });

    it('returns an empty object for an LN-Home_Sports layout', () => {
        const layout = 'LN-Home_Sports';
        const result = configDiagramationsByLayout(layout);
        expect(result).toEqual({});
    });
    it('returns an empty object for an LN-acumulado layout', () => {
        const layout = 'LN-acumulado';
        const result = configDiagramationsByLayout(layout);
        expect(result).toEqual({});
    });
});
