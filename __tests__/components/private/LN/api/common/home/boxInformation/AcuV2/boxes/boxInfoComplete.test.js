import { boxInfoCompleteV2 } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/AcuV2/boxes/boxInfoCompleteV2';
import * as information from '../../../../../../../../../../__mocks__/data/LN10_BoxInformation/information.json';
describe('AcuV2 - boxInfoCompleteV2', () => {
    it('returns null if information is not provided', () => {
        expect(boxInfoCompleteV2(null)).toBeNull();
    });

    it('returns a complete box object', () => {
        const section = 'Section';
        const typeSection = { default: { type: 'default' } };

        const expectedResult = {
            type: 'default',
            diagramacion: 'Layout',
            parameters: {
                title: 'Title',
                url: 'https://example.com'
            }
        };

        expect(boxInfoCompleteV2(information, section, typeSection)).toEqual(
            expectedResult
        );
    });

    it('returns a box object without parameters if information.hideTitle is true', () => {
        const information = {
            hideTitle: true
        };

        const section = 'Section';
        const typeSection = { default: { type: 'default' } };

        const expectedResult = {
            type: 'default',
            diagramacion: null
        };

        expect(boxInfoCompleteV2(information, section, typeSection)).toEqual(
            expectedResult
        );
    });
});
