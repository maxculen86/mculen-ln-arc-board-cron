import {
    getSectionId,
    getSectionParentId,
    getRankingType
} from '../../../../../components/features/LN-common/ranking/_helper';

describe('Features - LN - Common - Ranking - _helper', () => {
    describe('function => getSectionId', () => {
        it('when globalContent is falsy should return ""', () => {
            const sectionId = getSectionId();
            expect(sectionId).toBe('');
        });

        describe('used from a home page', () => {
            it('should return ""', () => {
                const sectionId = getSectionId({});
                expect(sectionId).toBe('');
            });
        });

        describe('used from a story', () => {
            it('when has category in 1 level should return only the category', () => {
                const sectionId = getSectionId({
                    type: 'story',
                    taxonomy: { primary_section: { _id: '/economia' } }
                });
                expect(sectionId).toBe('economia');
            });

            it('when has category in 2 levels should return category/subcategory', () => {
                const sectionId = getSectionId({
                    type: 'story',
                    taxonomy: { primary_section: { _id: '/economia/campo' } }
                });
                expect(sectionId).toBe('economia/campo');
            });

            it('when has category in 3 levels or more should return category/subcategory', () => {
                const sectionId = getSectionId({
                    type: 'story',
                    taxonomy: {
                        primary_section: { _id: '/economia/campo/agricultura' }
                    }
                });
                expect(sectionId).toBe('economia/campo');
            });
        });

        describe('from an accum', () => {
            it('when has category in 1 level should return only the category', () => {
                const sectionId = getSectionId({
                    node_type: 'section',
                    _id: '/economia'
                });
                expect(sectionId).toBe('economia');
            });

            it('when has category in 2 levels should return category/subcategory', () => {
                const sectionId = getSectionId({
                    node_type: 'section',
                    _id: '/economia/campo'
                });
                expect(sectionId).toBe('economia/campo');
            });

            it('when has category in 3 levels or more should return category/subcategory', () => {
                const sectionId = getSectionId({
                    node_type: 'section',
                    _id: '/economia/campo/agricultura'
                });
                expect(sectionId).toBe('economia/campo');
            });

            it('when has a category that ends in "/" should return the sectionId without "/"', () => {
                expect(
                    getSectionId({
                        node_type: 'section',
                        _id: '/economia/'
                    })
                ).toBe('economia');

                expect(
                    getSectionId({
                        node_type: 'section',
                        _id: '/economia/campo/'
                    })
                ).toBe('economia/campo');

                expect(
                    getSectionId({
                        node_type: 'section',
                        _id: '/economia/campo/agricultura/'
                    })
                ).toBe('economia/campo');
            });
        });

        describe('used from distributors, tags or authors', () => {
            it('should return ""', () => {
                expect(getSectionId({ node_type: 'author' })).toBe('');
                expect(getSectionId({ node_type: 'tags' })).toBe('');
                expect(
                    getSectionId({
                        node_type: 'distributor'
                    })
                ).toBe('');
            });
        });

        describe('used from a missing section in the ranking configuration file', () => {
            it('should return ""', () => {
                const sectionId = getSectionId({
                    node_type: 'section',
                    taxonomy: { primary_section: { _id: 'nueva-seccion' } }
                });
                expect(sectionId).toBe('');
                expect(sectionId).toBe('');
            });
        });
    });

    describe('function => getSectionParentId', () => {
        it('when sectionId is falsy should return ""', () => {
            expect(getSectionParentId()).toBe('');
        });

        it('when sectionId is "" should return ""', () => {
            expect(getSectionParentId('')).toBe('');
            expect(getSectionParentId('/')).toBe('');
        });

        it('when sectionId has category in 1 level should return ""', () => {
            expect(getSectionParentId('economia')).toBe('');
        });
        it('when sectionId has category in 2 levels should return only parent category', () => {
            expect(getSectionParentId('economia/campo')).toBe('economia');
        });

        it('when sectionId has category in 3 levels should return only parent category', () => {
            expect(getSectionParentId('economia/campo/agricultura')).toBe(
                'economia'
            );
        });
    });

    describe('function => getRankingType', () => {
        it('when globalContent is undefined should return "home"', () => {
            expect(getRankingType()).toBe('home');
        });

        it('when is used from home, distributors, tags or authors should return "home"', () => {
            expect(getRankingType({})).toBe('home');
            expect(getRankingType({ node_type: 'tags' })).toBe('home');
            expect(getRankingType({ node_type: 'distributor' })).toBe('home');
            expect(getRankingType({ node_type: 'author' })).toBe('home');
        });

        it('when is used from a story should return "nota"', () => {
            expect(
                getRankingType({
                    type: 'story',
                    taxonomy: {
                        primary_section: { _id: '/economia/campo' }
                    }
                })
            ).toBe('nota');
        });

        it('when is used from an accu should return "acumulado"', () => {
            expect(getRankingType({ node_type: 'section' })).toBe('acumulado');
        });
    });
});
