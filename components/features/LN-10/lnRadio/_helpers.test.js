import isTodayEnabled from '../../../chains/utils/isTodayEnabled';
import { shouldHideLnRadio } from './_helpers';

jest.mock('../../../chains/utils/isTodayEnabled', () => jest.fn());

describe('Feature - LN-10 - lnRadio - _helpers - shouldHideLnRadio', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should not hide the feature when scheduling is disabled', () => {
        expect(
            shouldHideLnRadio({
                shouldSchedule: false,
                enabledDays: []
            })
        ).toBe(false);
    });

    it('should not hide the feature in admin mode', () => {
        expect(
            shouldHideLnRadio({
                isAdmin: true,
                shouldSchedule: true,
                enabledDays: []
            })
        ).toBe(false);
    });

    it('should hide the feature when scheduling is enabled and no days were configured', () => {
        expect(
            shouldHideLnRadio({
                shouldSchedule: true,
                enabledDays: []
            })
        ).toBe(true);
    });

    it('should hide the feature when today is not enabled', () => {
        isTodayEnabled.mockReturnValue(false);

        expect(
            shouldHideLnRadio({
                shouldSchedule: true,
                enabledDays: ['lunes']
            })
        ).toBe(true);
        expect(isTodayEnabled).toHaveBeenCalledWith(['lunes']);
    });

    it('should keep the feature visible when today is enabled', () => {
        isTodayEnabled.mockReturnValue(true);

        expect(
            shouldHideLnRadio({
                shouldSchedule: true,
                enabledDays: ['viernes']
            })
        ).toBe(false);
        expect(isTodayEnabled).toHaveBeenCalledWith(['viernes']);
    });
});
