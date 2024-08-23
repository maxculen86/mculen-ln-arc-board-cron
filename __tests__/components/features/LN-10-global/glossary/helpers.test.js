import {
    handleEventWords,
    registeredKeys
} from '../../../../../components/features/LN-10-global/glossary/helpers';
import { scheduleTask } from '../../../../../components/private/common/utils/scheduleTask';
import { getLocationTooltip } from '../../../../../components/features/LN-10-global/glossary/helpers';
import addEventToDataLayer from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/common/utils/scheduleTask',
    () => ({
        scheduleTask: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

describe('features - LN-10-GLOBAL - glossary - helpers', () => {
    describe('handleEventWords', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should add the key to registeredKeys and schedule a task if key is not registered', () => {
            const key = 'testKey';
            handleEventWords(key);

            expect(registeredKeys.has(key)).toBe(true);
            expect(scheduleTask).toHaveBeenCalledTimes(1);
            expect(scheduleTask).toHaveBeenCalledWith(expect.any(Function));

            const scheduledFunction = scheduleTask.mock.calls[0][0];
            scheduledFunction();

            expect(addEventToDataLayer).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: 'palabra_glosario'
            });
        });

        it('should not schedule a task if the key is already registered', () => {
            const key = 'testKey';
            registeredKeys.add(key);
            handleEventWords(key);

            expect(scheduleTask).not.toHaveBeenCalled();
        });
    });

    describe('getLocationTooltip', () => {
        let tooltipRef;
        let eventTarget;

        beforeEach(() => {
            tooltipRef = {
                current: {
                    clientWidth: 100,
                    clientHeight: 50
                }
            };

            eventTarget = {
                getBoundingClientRect: jest.fn(() => ({
                    left: 200,
                    top: 300
                })),
                offsetWidth: 50
            };
            jest.clearAllMocks();
        });

        it('should calculate the correct top and left positions for the tooltip', () => {
            const position = getLocationTooltip(tooltipRef, eventTarget);

            const expectedLeft = `${200 - 100 / 2 + 50 / 2}px`;
            const expectedTop = `${300 - 50 - 8}px`;

            expect(position).toEqual({
                left: expectedLeft,
                top: expectedTop
            });
        });

        it('should return null if tooltipRef is not provided', () => {
            const position = getLocationTooltip(null, eventTarget);
            expect(position).toBeNull();
        });

        it('should return null if eventTarget is not provided', () => {
            const position = getLocationTooltip(tooltipRef, null);
            expect(position).toBeNull();
        });
    });
});
