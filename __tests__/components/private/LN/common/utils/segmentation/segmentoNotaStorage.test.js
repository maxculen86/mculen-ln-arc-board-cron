import {
    STORAGE_KEY,
    getSegmentoNota,
    removeSegmentoNota,
    upsertSegmentoNota
} from '../../../../../../../components/private/LN/common/utils/segmentation/segmentoNotaStorage';

describe('segmentation - segmentoNotaStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('getSegmentoNota', () => {
        it('returns empty string when nothing is stored', () => {
            expect(getSegmentoNota()).toBe('');
        });

        it('returns the raw stored string', () => {
            localStorage.setItem(STORAGE_KEY, 'Exp01-test');
            expect(getSegmentoNota()).toBe('Exp01-test');
        });

        it('returns empty string when localStorage throws', () => {
            const spy = jest
                .spyOn(Storage.prototype, 'getItem')
                .mockImplementation(() => {
                    throw new Error('blocked');
                });
            expect(getSegmentoNota()).toBe('');
            spy.mockRestore();
        });
    });

    describe('upsertSegmentoNota', () => {
        it('writes a new entry when storage is empty', () => {
            const ok = upsertSegmentoNota('Exp01', 'test');
            expect(ok).toBe(true);
            expect(localStorage.getItem(STORAGE_KEY)).toBe('Exp01-test');
        });

        it('appends a new experiment with pipe separator', () => {
            localStorage.setItem(STORAGE_KEY, 'Exp01-test');
            upsertSegmentoNota('Exp02', 'control');
            expect(localStorage.getItem(STORAGE_KEY)).toBe(
                'Exp01-test|Exp02-control'
            );
        });

        it('replaces the value of an existing experiment without duplicating', () => {
            localStorage.setItem(STORAGE_KEY, 'Exp01-test|Exp02-control');
            upsertSegmentoNota('Exp01', 'control');
            expect(localStorage.getItem(STORAGE_KEY)).toBe(
                'Exp01-control|Exp02-control'
            );
        });

        it('preserves order when replacing an existing entry', () => {
            localStorage.setItem(STORAGE_KEY, 'A-test|B-control|C-test');
            upsertSegmentoNota('B', 'test');
            expect(localStorage.getItem(STORAGE_KEY)).toBe(
                'A-test|B-test|C-test'
            );
        });

        it('handles experiment names containing hyphens', () => {
            upsertSegmentoNota('Mi-Exp-2026', 'test');
            expect(localStorage.getItem(STORAGE_KEY)).toBe('Mi-Exp-2026-test');
            upsertSegmentoNota('Mi-Exp-2026', 'control');
            expect(localStorage.getItem(STORAGE_KEY)).toBe(
                'Mi-Exp-2026-control'
            );
        });

        it('returns false and does not write when experimentName is missing', () => {
            expect(upsertSegmentoNota('', 'test')).toBe(false);
            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });

        it('returns false and does not write when segment is missing', () => {
            expect(upsertSegmentoNota('Exp01', '')).toBe(false);
            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });

        it('returns false when localStorage throws', () => {
            const spy = jest
                .spyOn(Storage.prototype, 'setItem')
                .mockImplementation(() => {
                    throw new Error('quota');
                });
            expect(upsertSegmentoNota('Exp01', 'test')).toBe(false);
            spy.mockRestore();
        });
    });

    describe('removeSegmentoNota', () => {
        it('removes only the requested experiment and preserves the rest', () => {
            localStorage.setItem(STORAGE_KEY, 'Exp01-test|Exp02-control');
            expect(removeSegmentoNota('Exp01')).toBe(true);
            expect(localStorage.getItem(STORAGE_KEY)).toBe('Exp02-control');
        });

        it('removes the storage key when no experiments remain', () => {
            localStorage.setItem(STORAGE_KEY, 'Exp01-test');
            expect(removeSegmentoNota('Exp01')).toBe(true);
            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });

        it('returns false when experimentName is missing', () => {
            localStorage.setItem(STORAGE_KEY, 'Exp01-test');
            expect(removeSegmentoNota('')).toBe(false);
            expect(localStorage.getItem(STORAGE_KEY)).toBe('Exp01-test');
        });
    });
});
