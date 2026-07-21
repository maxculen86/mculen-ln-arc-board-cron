import {
    arrowsClassNames,
    videoContainerExpandedClasses,
    ensureArrowButtonPointerEventsStyle
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/styles';
import {
    HOST_Z_INDEX,
    OVERLAY_Z_INDEX
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/jwPlayerShared';

describe('mediaScrollerExpanded styles - UI regression', () => {
    it('arrowsClassNames keeps z-50 — the track painted over the arrows despite equal z-index, will-change (GPU compositor layer) is what fixes it, not this class', () => {
        expect(arrowsClassNames({ direction: 'left' })).toContain('z-50');
        expect(arrowsClassNames({ direction: 'right' })).toContain('z-50');
    });

    it('ensureArrowButtonPointerEventsStyle keeps .arrow-button clickable above the pointer-events:none JW player host', () => {
        const existingStyle = document.getElementById('arrow-button-pe-style');
        if (existingStyle) existingStyle.remove();

        ensureArrowButtonPointerEventsStyle();

        const style = document.getElementById('arrow-button-pe-style');

        expect(style).not.toBeNull();
        expect(style.textContent).toContain('.arrow-button');
        expect(style.textContent).toContain('pointer-events: auto');
    });

    it('OVERLAY_Z_INDEX is 50 and stacks above HOST_Z_INDEX', () => {
        expect(OVERLAY_Z_INDEX).toBe(50);
        expect(OVERLAY_Z_INDEX).toBeGreaterThan(Number(HOST_Z_INDEX));
    });

    it('videoSocialContainerClassName no longer relies on the dead z-50 utility for vertical', () => {
        const classes = videoContainerExpandedClasses('vertical');

        expect(classes.videoSocialContainerClassName).not.toContain('z-50');
    });

    it('videoSocialContainerClassName no longer relies on the dead z-50 utility for horizontal', () => {
        const classes = videoContainerExpandedClasses('horizontal');

        expect(classes.videoSocialContainerClassName).not.toContain('z-50');
    });
});
