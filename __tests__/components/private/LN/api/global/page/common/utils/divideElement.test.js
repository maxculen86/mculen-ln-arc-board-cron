import { segmentSectionbyDiagramation } from '../../../../../../../../../components/private/LN/api/global/page/common/utils/divideElements';

describe('segmentSectionbyDiagramation', () => {
    it('should return empty array when elements is null or undefined', () => {
        expect(segmentSectionbyDiagramation(null, [])).toEqual(null);
        expect(segmentSectionbyDiagramation(undefined, [])).toEqual(undefined);
    });

    it('should return the same elements array if none of them match the diagramation', () => {
        const elements = [
            {
                information: { layout: 'not-match' },
                articles: [{}, {}, {}]
            },
            {
                information: {
                    layout: 'not-match-either'
                },
                articles: []
            }
        ];
        expect(segmentSectionbyDiagramation(elements, ['match'])).toEqual(
            elements
        );
    });
});
