import {
    openingImage100Variants,
    sectionHeight
} from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/styles';

describe('openingImage100Variants', () => {
    describe('wrapper', () => {
        it('includes base classes for all variants', () => {
            ['below', 'above', 'left', 'centered'].forEach(variant => {
                const result = openingImage100Variants.wrapper({ variant });
                expect(result).toContain('w-full');
                expect(result).toContain('max-w-1366');
                expect(result).toContain('absolute');
                expect(result).toContain('z-10');
            });
        });

        it('positions "below" variant at the bottom', () => {
            const result = openingImage100Variants.wrapper({
                variant: 'below'
            });
            expect(result).toContain('bottom-0');
            expect(result).toContain('mb-80');
            expect(result).toContain('text-center');
        });

        it('positions "above" variant at the top', () => {
            const result = openingImage100Variants.wrapper({
                variant: 'above'
            });
            expect(result).toContain('top-0');
            expect(result).toContain('mt-40');
            expect(result).toContain('text-center');
        });

        it('centers "left" variant vertically', () => {
            const result = openingImage100Variants.wrapper({ variant: 'left' });
            expect(result).toContain('-translate-y-1/2');
            expect(result).toContain('top-1/2');
        });

        it('centers "centered" variant vertically with text-center', () => {
            const result = openingImage100Variants.wrapper({
                variant: 'centered'
            });
            expect(result).toContain('top-1/2');
            expect(result).toContain('-translate-y-1/2');
            expect(result).toContain('text-center');
        });
    });

    describe('container', () => {
        it('includes base flex classes for all variants', () => {
            ['below', 'above', 'left', 'centered'].forEach(variant => {
                const result = openingImage100Variants.container({ variant });
                expect(result).toContain('flex');
                expect(result).toContain('flex-col');
                expect(result).toContain('gap-12');
            });
        });

        it('applies centered max-width for "below" variant', () => {
            const result = openingImage100Variants.container({
                variant: 'below'
            });
            expect(result).toContain('m-auto');
            expect(result).toContain('max-w-835');
            expect(result).toContain('px-24');
        });

        it('applies centered max-width for "above" variant', () => {
            const result = openingImage100Variants.container({
                variant: 'above'
            });
            expect(result).toContain('m-auto');
            expect(result).toContain('max-w-835');
        });

        it('applies centered max-width for "centered" variant', () => {
            const result = openingImage100Variants.container({
                variant: 'centered'
            });
            expect(result).toContain('m-auto');
            expect(result).toContain('max-w-835');
        });

        it('applies constrained width for "left" variant without auto margin', () => {
            const result = openingImage100Variants.container({
                variant: 'left'
            });
            expect(result).toContain('max-w-550');
            expect(result).toContain('px-16');
            expect(result).toContain('md:pr-0');
            expect(result).toContain('md:pl-24');
            expect(result).toContain('md:max-w-635');
            expect(result).toContain('xl:pl-32');
            expect(result).toContain('lg:pr-0');
            expect(result).toContain('2xl:pl-64');
        });
    });

    describe('addons', () => {
        it('aligns items to start for "left" variant', () => {
            const result = openingImage100Variants.addons({ variant: 'left' });
            expect(result).toContain('items-start');
            expect(result).toContain('mr-auto');
        });

        it('returns no alignment override for "below" variant', () => {
            const result = openingImage100Variants.addons({ variant: 'below' });
            expect(result).not.toContain('items-start');
        });

        it('returns no alignment override for "above" variant', () => {
            const result = openingImage100Variants.addons({ variant: 'above' });
            expect(result).not.toContain('items-start');
        });

        it('returns no alignment override for "centered" variant', () => {
            const result = openingImage100Variants.addons({
                variant: 'centered'
            });
            expect(result).not.toContain('items-start');
        });
    });
});

describe('sectionHeight', () => {
    it('is a non-empty string', () => {
        expect(typeof sectionHeight).toBe('string');
        expect(sectionHeight.length).toBeGreaterThan(0);
    });

    it('includes mobile height with CSS variables', () => {
        expect(sectionHeight).toContain('--header-sticky-height');
        expect(sectionHeight).toContain('--header-navbar-height');
    });

    it('includes xl breakpoint height override', () => {
        expect(sectionHeight).toContain('xl:h-');
        expect(sectionHeight).toContain('100vh');
    });
});
