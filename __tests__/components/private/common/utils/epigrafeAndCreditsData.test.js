import EpigrafeAndCreditsData from '../../../../../components/private/common/utils/epigrafeAndCreditsData';

describe('Common - EpigrafeAndCreditsData', () => {
    const parameterTest = {};
    test('EpigrafeAndCreditsData', () => {
        expect(EpigrafeAndCreditsData(parameterTest)).toStrictEqual('');
    });
});
