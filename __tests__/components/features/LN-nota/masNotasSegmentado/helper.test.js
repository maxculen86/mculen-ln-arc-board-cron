import {
    SEGMENTATION_GROUP,
    FILTERS,
    FILTER_LABELS,
    getAdminPreviewSegment,
    resolveContent
} from '../../../../../components/features/LN-nota/masNotasSegmentado/helper';

describe('components - features - LN-nota - masNotasSegmentado - helper', () => {
    describe('constants', () => {
        it('exposes the segmentation group label', () => {
            expect(SEGMENTATION_GROUP).toBe('Segmentación AB');
        });

        it('exposes the list of supported filters', () => {
            expect(FILTERS).toEqual([
                '',
                'byLastNews',
                'byTags',
                'bySectionOrTag',
                'aperturaHome'
            ]);
        });

        it('exposes a label for every filter', () => {
            FILTERS.forEach(filterKey => {
                expect(FILTER_LABELS[filterKey]).toEqual(expect.any(String));
            });
        });
    });

    describe('getAdminPreviewSegment', () => {
        it('returns null when isAdmin is false', () => {
            expect(
                getAdminPreviewSegment({
                    isAdmin: false,
                    segment: null,
                    segmentationConfigError: false,
                    filterTest: 'byLastNews'
                })
            ).toBeNull();
        });

        it('returns null when a real segment is already resolved', () => {
            expect(
                getAdminPreviewSegment({
                    isAdmin: true,
                    segment: 'test',
                    segmentationConfigError: false,
                    filterTest: 'byLastNews'
                })
            ).toBeNull();
        });

        it('returns null when the segmentation config is invalid', () => {
            expect(
                getAdminPreviewSegment({
                    isAdmin: true,
                    segment: null,
                    segmentationConfigError: true,
                    filterTest: 'byLastNews'
                })
            ).toBeNull();
        });

        it('returns "test" for admin preview when filterTest is configured', () => {
            expect(
                getAdminPreviewSegment({
                    isAdmin: true,
                    segment: null,
                    segmentationConfigError: false,
                    filterTest: 'byLastNews'
                })
            ).toBe('test');
        });

        it('returns "control" for admin preview when filterTest is not configured', () => {
            expect(
                getAdminPreviewSegment({
                    isAdmin: true,
                    segment: null,
                    segmentationConfigError: false,
                    filterTest: ''
                })
            ).toBe('control');
        });
    });

    describe('resolveContent', () => {
        const byTagsContent = {
            articles: ['byTags-article'],
            title: 'byTags title',
            sectionTitle: 'OtrasNoticias'
        };
        const otherFilterContent = {
            articles: ['other-article'],
            title: 'other title',
            sectionTitle: 'UltimasNoticias'
        };

        it('returns byTagsContent when activeFilter is "byTags"', () => {
            expect(
                resolveContent({
                    activeFilter: 'byTags',
                    byTagsContent,
                    otherFilterContent
                })
            ).toBe(byTagsContent);
        });

        it('returns byTagsContent when activeFilter is "byTags" even if otherFilterContent is not set', () => {
            expect(
                resolveContent({
                    activeFilter: 'byTags',
                    byTagsContent,
                    otherFilterContent: null
                })
            ).toBe(byTagsContent);
        });

        it('returns otherFilterContent when activeFilter is a different resolved filter', () => {
            expect(
                resolveContent({
                    activeFilter: 'byLastNews',
                    byTagsContent,
                    otherFilterContent
                })
            ).toBe(otherFilterContent);
        });

        it('returns empty content when activeFilter is set but otherFilterContent was not resolved', () => {
            expect(
                resolveContent({
                    activeFilter: 'bySectionOrTag',
                    byTagsContent,
                    otherFilterContent: null
                })
            ).toEqual({ articles: [], title: '', sectionTitle: '' });
        });

        it('returns empty content when activeFilter is empty', () => {
            expect(
                resolveContent({
                    activeFilter: '',
                    byTagsContent,
                    otherFilterContent
                })
            ).toEqual({ articles: [], title: '', sectionTitle: '' });
        });
    });
});
