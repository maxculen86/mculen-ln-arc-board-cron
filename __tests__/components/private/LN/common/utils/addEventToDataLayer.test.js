import addEventToDataLayer, {
    addEventToDataLayerV2
} from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';
import { scheduleTask } from '../../../../../../components/private/common/utils/scheduleTask';
import isSSR from '../../../../../../components/private/LN/common/utils/isSSR';

jest.mock('../../../../../../components/private/common/utils/scheduleTask');
jest.mock('../../../../../../components/private/LN/common/utils/isSSR');

describe('Private - LN - common - utils - addEventToDataLayer', () => {
    const input = {
        category: 'Header',
        action: 'home_ln10',
        label: 'Economia',
        event: 'e_linkclick'
    };

    beforeEach(() => {
        window.dataLayer = [];
        isSSR.mockReturnValue(false);
    });

    describe('Original addEventToDataLayer function', () => {
        test('should register in dataLayer the event with the specified values', () => {
            delete window.dataLayer;
            global.window.dataLayer = [];
            addEventToDataLayer(input);

            expect(window.dataLayer).toStrictEqual([
                {
                    dynamic_action: 'home_ln10',
                    dynamic_category: 'Header',
                    dynamic_label: 'Economia',
                    event: 'e_linkclick'
                }
            ]);
        });

        test('should return an empty object when the input is undefined', () => {
            delete window.dataLayer;
            global.window.dataLayer = [];

            addEventToDataLayer(undefined);

            expect(window.dataLayer).toStrictEqual([{}]);
        });

        test('should handle window.dataLayer not defined', () => {
            delete window.dataLayer;

            addEventToDataLayer(input);

            expect(window.dataLayer).toBeUndefined();
        });

        test('should not push to dataLayer if isSSR returns true', () => {
            isSSR.mockReturnValue(true);

            addEventToDataLayer(input);

            expect(window.dataLayer).toHaveLength(0);
        });
    });

    describe('addEventToDataLayerV2 function with scheduleTask', () => {
        test('should register in dataLayer the event with the specified values using scheduleTask', () => {
            const mockScheduleTask = jest.fn(callback => callback());
            scheduleTask.mockImplementation(mockScheduleTask);

            addEventToDataLayerV2(input);

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

        test('should not push to dataLayer if isSSR returns true in V2', () => {
            isSSR.mockReturnValue(true);
            const mockScheduleTask = jest.fn(callback => callback());
            scheduleTask.mockImplementation(mockScheduleTask);

            addEventToDataLayerV2(input);

            expect(mockScheduleTask).not.toHaveBeenCalled();
            expect(window.dataLayer).toHaveLength(0);
        });

        test('should return an empty object when the input is undefined in V2', () => {
            const mockScheduleTask = jest.fn(callback => callback());
            scheduleTask.mockImplementation(mockScheduleTask);

            addEventToDataLayerV2(undefined);

            expect(mockScheduleTask).toHaveBeenCalledTimes(1);
            expect(window.dataLayer).toStrictEqual([{}]);
        });

        test('should handle window.dataLayer not defined in V2', () => {
            delete window.dataLayer;
            const mockScheduleTask = jest.fn(callback => callback());
            scheduleTask.mockImplementation(mockScheduleTask);

            addEventToDataLayerV2(input);

            expect(mockScheduleTask).not.toHaveBeenCalled();
        });
    });
});
