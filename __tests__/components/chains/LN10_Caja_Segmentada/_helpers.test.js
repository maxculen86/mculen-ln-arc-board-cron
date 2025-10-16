import {
    isBoxEnabled,
    hasValidationFailed
} from '../../../../components/chains/LN10_Caja_Segmentada/_helpers';

describe('LN10_Caja_Segmentada helpers', () => {
    describe('isBoxEnabled', () => {
        const baseParams = {
            termica: true,
            configError: null,
            hideCaja: false
        };

        it('returns true when scheduling is disabled even with empty enabledDays', () => {
            expect(
                isBoxEnabled({
                    ...baseParams,
                    enabledDays: [],
                    shouldSchedule: false
                })
            ).toBe(true);
        });

        it('returns false when scheduling is enabled but enabledDays is empty', () => {
            expect(
                isBoxEnabled({
                    ...baseParams,
                    enabledDays: [],
                    shouldSchedule: true
                })
            ).toBe(false);
        });

        it('returns true when scheduling is enabled and today is allowed', () => {
            const diasSemana = [
                'domingo',
                'lunes',
                'martes',
                'miercoles',
                'jueves',
                'viernes',
                'sabado'
            ];
            const today = diasSemana[new Date().getDay()];

            expect(
                isBoxEnabled({
                    ...baseParams,
                    enabledDays: [today],
                    shouldSchedule: true
                })
            ).toBe(true);
        });
    });

    describe('hasValidationFailed', () => {
        const baseArgs = {
            termica: true,
            configError: null,
            hideCaja: false,
            enabledDays: [],
            token: 'token'
        };

        it('returns false for admins regardless of scheduling', () => {
            expect(
                hasValidationFailed({
                    ...baseArgs,
                    isAdmin: true,
                    shouldSchedule: true
                })
            ).toBe(false);
        });

        it('returns false when scheduling is disabled and token exists', () => {
            expect(
                hasValidationFailed({
                    ...baseArgs,
                    isAdmin: false,
                    shouldSchedule: false
                })
            ).toBe(false);
        });

        it('returns true when scheduling is enabled but enabledDays is empty', () => {
            expect(
                hasValidationFailed({
                    ...baseArgs,
                    isAdmin: false,
                    shouldSchedule: true
                })
            ).toBe(true);
        });
    });
});
