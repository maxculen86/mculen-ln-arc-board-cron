import {
    cardRootVariants,
    cardMediaVariants,
    cardContentVariants,
    cardTitleVariants,
    cardDescriptionVariants,
    cardActionVariants,
    cardRibbonVariants
} from '../../../../../../components/features/LN/common/cardPromo/styles';

const SIZES = [18, 24, 32];
const ORIENTATIONS = ['vertical', 'horizontal'];

const SEMANTIC_TOKEN =
    /\btext-(display|heading|subheading|body|label|small)-(lg|md|sm)\b/;

const CARD_VARIANTS = {
    cardRootVariants,
    cardMediaVariants,
    cardContentVariants,
    cardTitleVariants,
    cardDescriptionVariants,
    cardActionVariants
};

const classesOf = result => result.split(' ').filter(Boolean);

describe('cardPromo - variants', () => {
    describe('semantic typography tokens', () => {
        Object.entries(CARD_VARIANTS).forEach(([name, variants]) => {
            SIZES.forEach(size => {
                ORIENTATIONS.forEach(orientation => {
                    it(`should not use a semantic token when ${name} renders size ${size} ${orientation}`, () => {
                        expect(variants({ size, orientation })).not.toMatch(
                            SEMANTIC_TOKEN
                        );
                    });
                });
            });
        });

        SIZES.forEach(size => {
            it(`should not use a semantic token when cardRibbonVariants renders size ${size}`, () => {
                expect(cardRibbonVariants({ size })).not.toMatch(
                    SEMANTIC_TOKEN
                );
            });
        });
    });

    describe('cardRootVariants', () => {
        it('should zero the column gap when size is 18 and orientation is horizontal', () => {
            expect(
                classesOf(
                    cardRootVariants({ size: 18, orientation: 'horizontal' })
                )
            ).toContain('gap-0');
        });
    });

    describe('cardTitleVariants', () => {
        it('should expand the subheading token into raw utilities when size is 24', () => {
            expect(
                classesOf(
                    cardTitleVariants({ size: 24, orientation: 'vertical' })
                )
            ).toEqual(
                expect.arrayContaining([
                    'text-24',
                    'leading-[110%]',
                    'tracking-[-0.3px]',
                    'opsz-50'
                ])
            );
        });

        it('should keep the heading scale steps when size is 32', () => {
            expect(
                classesOf(
                    cardTitleVariants({ size: 32, orientation: 'vertical' })
                )
            ).toEqual(
                expect.arrayContaining([
                    'text-24',
                    'md:text-28',
                    'xl:text-32',
                    'tracking-[-0.6px]'
                ])
            );
        });

        it('should set the font size from raw utilities when size is 18', () => {
            expect(
                classesOf(
                    cardTitleVariants({ size: 18, orientation: 'vertical' })
                )
            ).toContain('text-18');
        });
    });

    describe('cardDescriptionVariants', () => {
        it('should expand the body token into raw utilities when size is 32 and orientation is horizontal', () => {
            expect(
                classesOf(
                    cardDescriptionVariants({
                        size: 32,
                        orientation: 'horizontal'
                    })
                )
            ).toEqual(
                expect.arrayContaining([
                    'text-16',
                    'leading-[140%]',
                    'tracking-[-0.3px]'
                ])
            );
        });

        it('should keep the larger body scale when size is 32 and orientation is vertical', () => {
            expect(
                classesOf(
                    cardDescriptionVariants({
                        size: 32,
                        orientation: 'vertical'
                    })
                )
            ).toEqual(expect.arrayContaining(['text-18', 'tracking-[-0.6px]']));
        });
    });
});
