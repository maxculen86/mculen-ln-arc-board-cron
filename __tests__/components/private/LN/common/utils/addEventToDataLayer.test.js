import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';
import { scheduleTask } from '../../../../../../components/private/common/utils/scheduleTask';
import isSSR from '../../../../../../components/private/LN/common/utils/isSSR';

jest.mock('../../../../../../components/private/common/utils/scheduleTask');
jest.mock('../../../../../../components/private/LN/common/utils/isSSR');

describe('addEventToDataLayerV2', () => {
    const basePayload = {
        category: 'Header',
        action: 'home_ln10',
        label: 'Economia',
        event: 'e_linkclick'
    };
    let mockScheduleTask;

    beforeEach(() => {
        window.dataLayer = [];
        jest.clearAllMocks();
        mockScheduleTask = jest.fn(callback => callback());
        scheduleTask.mockImplementation(mockScheduleTask);
        isSSR.mockReturnValue(false);
    });

    it('should register in dataLayer the event with the specified values using scheduleTask', () => {
        addEventToDataLayerV2(basePayload);

        expect(mockScheduleTask).toHaveBeenCalledTimes(1);
        expect(window.dataLayer).toStrictEqual([
            {
                dynamic_action: 'home_ln10',
                dynamic_category: 'Header',
                dynamic_label: 'Economia',
                event: 'e_linkclick'
            }
        ]);
    });

    it('should merge optional fields and rest payload when scheduling the push', () => {
        const restPayload = {
            custom_field: 'value',
            nested: { foo: 'bar' }
        };

        addEventToDataLayerV2({
            ...basePayload,
            origin: 'ln-qa',
            rest: restPayload
        });

        expect(mockScheduleTask).toHaveBeenCalledTimes(1);
        expect(window.dataLayer).toStrictEqual([
            {
                dynamic_action: 'home_ln10',
                dynamic_category: 'Header',
                dynamic_label: 'Economia',
                event: 'e_linkclick',
                origin: 'ln-qa',
                custom_field: 'value',
                nested: { foo: 'bar' }
            }
        ]);
        expect(window.dataLayer[0]).not.toHaveProperty('rest');
        expect(window.dataLayer[0].nested).toEqual(restPayload.nested);
    });

    it('should not schedule when isSSR returns true', () => {
        isSSR.mockReturnValue(true);

        addEventToDataLayerV2(basePayload);

        expect(mockScheduleTask).not.toHaveBeenCalled();
        expect(window.dataLayer).toHaveLength(0);
    });

    it('should push an empty object when the input is undefined', () => {
        addEventToDataLayerV2(undefined);

        expect(mockScheduleTask).toHaveBeenCalledTimes(1);
        expect(window.dataLayer).toStrictEqual([{}]);
    });

    it('should ignore execution if window.dataLayer is not defined', () => {
        delete window.dataLayer;

        addEventToDataLayerV2(basePayload);

        expect(mockScheduleTask).not.toHaveBeenCalled();
    });
});
