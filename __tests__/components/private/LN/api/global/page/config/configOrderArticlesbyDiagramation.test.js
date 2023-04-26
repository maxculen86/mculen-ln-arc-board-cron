import configOrderArticlesbyDiagramation from '../../../../../../../../components/private/LN/api/global/page/config/configOrderArticlesbyDiagramation';

describe('configOrderArticlesbyDiagramation', () => {
    it('returns the correct box positions for LN10-Home_Main', () => {
        const layout = 'LN10-Home_Main';
        const expectedBoxPositions = {
            bn2Focal1Mas2: [{ keyFrom: 'T3', keyTo: 'T1' }],
            grilla3: [{ keyFrom: 'T3', keyTo: 'T1' }]
        };
        const result = configOrderArticlesbyDiagramation(layout);
        expect(result).toEqual(expectedBoxPositions);
    });

    it('returns an empty object for LN-acumulado', () => {
        const layout = 'LN-acumulado';
        const result = configOrderArticlesbyDiagramation(layout);
        expect(result).toEqual({});
    });
    it('returns an empty object for LN-Home_Main', () => {
        const layout = 'LN-Home_Main';
        const result = configOrderArticlesbyDiagramation(layout);
        expect(result).toEqual({});
    });
    it('returns an empty object for LN-Home_Sports', () => {
        const layout = 'LN-Home_Sports';
        const result = configOrderArticlesbyDiagramation(layout);
        expect(result).toEqual({});
    });
});
