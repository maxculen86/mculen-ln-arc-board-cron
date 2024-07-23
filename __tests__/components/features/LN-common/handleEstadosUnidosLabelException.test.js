import { useAppContext } from 'fusion:context';
import { handleUnitedStatesLabelException } from '../../../../components/private/LN/common/utils/bannerHelper';
import get from '../../../../components/private/common/utils/get';

jest.mock('../../../../components/private/common/utils/get', () => jest.fn());

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('handleUnitedStatesLabelException =>', () => {
    it('it should return true and Estados-Unidos section =>', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                label: {
                    eje_subeje: {
                        display: true,
                        text: 'Estados-Unidos'
                    }
                }
            }
        });
        get.mockReturnValue('Estados-Unidos');
        expect(handleUnitedStatesLabelException()).toEqual([
            true,
            'la_nacion_usa'
        ]);
    });

    it('it should return false if not Estados-Unidos =>', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                label: {
                    eje_subeje: {
                        display: true,
                        text: 'Trends'
                    }
                }
            }
        });
        get.mockReturnValue('Trends');
        expect(handleUnitedStatesLabelException()).toEqual(false);
    });
});
