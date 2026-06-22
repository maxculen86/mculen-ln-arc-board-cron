import getRenderState from '../../../../../../../components/private/LN/common/utils/segmentation/getRenderState';

const SEGMENTATION_CONFIG_MESSAGE =
    'Configurá experimento + al menos una lista de dígitos + al menos una variante (TEST o CONTROL).';

const baseArgs = (overrides = {}) => ({
    hasSection: true,
    isAdmin: false,
    segmentationConfigError: false,
    segmentAndHide: false,
    ready: true,
    activeSegment: 'test',
    ...overrides
});

describe('getRenderState', () => {
    // ─── hasSection guard ────────────────────────────────────────────

    it('returns shouldRender=false when hasSection is false', () => {
        expect(getRenderState(baseArgs({ hasSection: false }))).toEqual({
            shouldRender: false
        });
    });

    // ─── segmentationConfigError (admin only) ────────────────────────

    it('returns a warning for admin when segmentationConfigError is true', () => {
        const result = getRenderState(
            baseArgs({ isAdmin: true, segmentationConfigError: true })
        );

        expect(result).toEqual({
            shouldRender: false,
            warning: {
                type: 'warning',
                message: SEGMENTATION_CONFIG_MESSAGE
            }
        });
    });

    it('returns shouldRender=true without warning for non-admin when segmentationConfigError is true', () => {
        const result = getRenderState(
            baseArgs({ isAdmin: false, segmentationConfigError: true })
        );

        expect(result).toEqual({ shouldRender: true });
        expect(result.warning).toBeUndefined();
    });

    // ─── segmentAndHide / ready / activeSegment ──────────────────────

    it('returns shouldRender=false when segmentAndHide is true', () => {
        expect(getRenderState(baseArgs({ segmentAndHide: true }))).toEqual({
            shouldRender: false
        });
    });

    it('returns shouldRender=false when ready is false', () => {
        expect(getRenderState(baseArgs({ ready: false }))).toEqual({
            shouldRender: false
        });
    });

    it('returns shouldRender=false when activeSegment is null', () => {
        expect(getRenderState(baseArgs({ activeSegment: null }))).toEqual({
            shouldRender: false
        });
    });

    // ─── activeFilter (optional) ─────────────────────────────────────

    it('returns shouldRender=false without warning for non-admin when activeFilter is empty string', () => {
        const result = getRenderState(baseArgs({ activeFilter: '' }));

        expect(result).toEqual({ shouldRender: false });
    });

    it('returns a warning for admin when activeFilter is empty string', () => {
        const result = getRenderState(
            baseArgs({
                isAdmin: true,
                activeFilter: '',
                activeSegment: 'control'
            })
        );

        expect(result).toEqual({
            shouldRender: false,
            warning: {
                type: 'warning',
                message: 'No configuraste el origen para la variante CONTROL.'
            }
        });
    });

    it('skips the activeFilter branch when activeFilter is not provided (null default)', () => {
        const result = getRenderState(baseArgs({ isAdmin: true }));

        expect(result).toEqual({ shouldRender: true });
        expect(result.warning).toBeUndefined();
    });

    // ─── renderError (optional) ──────────────────────────────────────

    it('returns shouldRender=false with warning for admin when renderError is set', () => {
        const renderError = { type: 'error', message: 'Not enough articles.' };
        const result = getRenderState(baseArgs({ isAdmin: true, renderError }));

        expect(result).toEqual({ shouldRender: false, warning: renderError });
    });

    it('returns shouldRender=false without warning for non-admin when renderError is set', () => {
        const renderError = { type: 'error', message: 'Not enough articles.' };
        const result = getRenderState(baseArgs({ renderError }));

        expect(result).toEqual({ shouldRender: false });
    });

    // ─── Happy path ──────────────────────────────────────────────────

    it('returns shouldRender=true when all conditions are met', () => {
        expect(getRenderState(baseArgs())).toEqual({ shouldRender: true });
    });
});
