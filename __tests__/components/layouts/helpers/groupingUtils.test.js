import {
    isMarker,
    getContentBeforeMarkers,
    groupByMarkers,
    getContentAfterMarkers
} from '../../../../components/layouts/helpers/groupingUtils';

describe('groupingUtils', () => {
    describe('isMarker', () => {
        it('should return true when element matches type and subtype', () => {
            const element = {
                type: 'custom_embed',
                subtype: 'custom-liveblog'
            };
            expect(isMarker(element, 'custom-liveblog')).toBe(true);
        });

        it('should return false when element does not match subtype', () => {
            const element = {
                type: 'custom_embed',
                subtype: 'other-type'
            };
            expect(isMarker(element, 'custom-liveblog')).toBe(false);
        });

        it('should return false when element does not match type', () => {
            const element = {
                type: 'text',
                subtype: 'custom-liveblog'
            };
            expect(isMarker(element, 'custom-liveblog')).toBe(false);
        });

        it('should handle custom type parameter', () => {
            const element = {
                type: 'other_type',
                subtype: 'custom-liveblog'
            };
            expect(isMarker(element, 'custom-liveblog', 'other_type')).toBe(
                true
            );
        });

        it('should return false for null/undefined elements', () => {
            expect(isMarker(null, 'custom-liveblog')).toBe(false);
            expect(isMarker(undefined, 'custom-liveblog')).toBe(false);
        });
    });

    describe('getContentBeforeMarkers', () => {
        const mockElements = [
            { type: 'text', content: 'first' },
            { type: 'text', content: 'second' },
            {
                type: 'custom_embed',
                subtype: 'custom-liveblog',
                _id: 'marker1'
            },
            { type: 'text', content: 'third' }
        ];

        it('should return empty array for non-array input', () => {
            expect(getContentBeforeMarkers(null, 'custom-liveblog')).toEqual(
                []
            );
            expect(
                getContentBeforeMarkers(undefined, 'custom-liveblog')
            ).toEqual([]);
            expect(
                getContentBeforeMarkers('string', 'custom-liveblog')
            ).toEqual([]);
        });

        it('should return all elements when no marker found', () => {
            const elements = [
                { type: 'text', content: 'first' },
                { type: 'text', content: 'second' }
            ];
            expect(
                getContentBeforeMarkers(elements, 'custom-liveblog')
            ).toEqual(elements);
        });

        it('should return elements before first marker', () => {
            const expected = [
                { type: 'text', content: 'first' },
                { type: 'text', content: 'second' }
            ];
            expect(
                getContentBeforeMarkers(mockElements, 'custom-liveblog')
            ).toEqual(expected);
        });

        it('should return empty array when marker is first element', () => {
            const elements = [
                {
                    type: 'custom_embed',
                    subtype: 'custom-liveblog',
                    _id: 'marker1'
                },
                { type: 'text', content: 'first' }
            ];
            expect(
                getContentBeforeMarkers(elements, 'custom-liveblog')
            ).toEqual([]);
        });
    });

    describe('groupByMarkers', () => {
        it('should return empty array for invalid input', () => {
            expect(groupByMarkers(null)).toEqual([]);
            expect(groupByMarkers(undefined)).toEqual([]);
            expect(groupByMarkers([])).toEqual([]);
            expect(groupByMarkers('string')).toEqual([]);
        });

        it('should return empty array when no markers found', () => {
            const elements = [
                { type: 'text', content: 'first' },
                { type: 'text', content: 'second' }
            ];
            expect(groupByMarkers(elements, 'custom-liveblog')).toEqual([]);
        });

        it('should group elements by markers correctly', () => {
            const elements = [
                { type: 'text', content: 'before' },
                {
                    type: 'custom_embed',
                    subtype: 'custom-liveblog',
                    _id: 'marker1'
                },
                { type: 'text', content: 'group1-item1' },
                { type: 'text', content: 'group1-item2' },
                {
                    type: 'custom_embed',
                    subtype: 'custom-liveblog',
                    _id: 'marker2'
                },
                { type: 'text', content: 'group2-item1' }
            ];

            const result = groupByMarkers(
                elements,
                'custom-liveblog',
                'liveblog'
            );

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                id: 'liveblog_marker1',
                items: [
                    {
                        type: 'custom_embed',
                        subtype: 'custom-liveblog',
                        _id: 'marker1'
                    },
                    { type: 'text', content: 'group1-item1' },
                    { type: 'text', content: 'group1-item2' }
                ]
            });
            expect(result[1]).toEqual({
                id: 'liveblog_marker2',
                items: [
                    {
                        type: 'custom_embed',
                        subtype: 'custom-liveblog',
                        _id: 'marker2'
                    },
                    { type: 'text', content: 'group2-item1' }
                ]
            });
        });

        it('should ignore elements before first marker', () => {
            const elements = [
                { type: 'text', content: 'ignore-me' },
                {
                    type: 'custom_embed',
                    subtype: 'custom-liveblog',
                    _id: 'marker1'
                },
                { type: 'text', content: 'include-me' }
            ];

            const result = groupByMarkers(elements, 'custom-liveblog');

            expect(result).toHaveLength(1);
            expect(result[0].items).toHaveLength(2);
            expect(result[0].items[1].content).toBe('include-me');
        });

        it('should use custom groupPrefix', () => {
            const elements = [
                {
                    type: 'custom_embed',
                    subtype: 'custom-liveblog',
                    _id: 'marker1'
                },
                { type: 'text', content: 'content' }
            ];

            const result = groupByMarkers(
                elements,
                'custom-liveblog',
                'custom'
            );

            expect(result[0].id).toBe('custom_marker1');
        });
    });

    describe('getContentAfterMarkers', () => {
        const mockElements = [
            { type: 'text', content: 'first' },
            {
                type: 'custom_embed',
                subtype: 'custom-liveblog',
                _id: 'marker1'
            },
            { type: 'text', content: 'second' },
            { type: 'text', content: 'third' },
            { type: 'text', content: 'after' }
        ];

        it('should return empty array when no groups provided', () => {
            expect(getContentAfterMarkers(mockElements, [])).toEqual([]);
        });

        it('should return content after last group', () => {
            const firstElement = { type: 'text', content: 'first' };
            const markerElement = {
                type: 'custom_embed',
                subtype: 'custom-liveblog',
                _id: 'marker1'
            };
            const secondElement = { type: 'text', content: 'second' };
            const thirdElement = { type: 'text', content: 'third' };
            const afterElement = { type: 'text', content: 'after' };

            const elements = [
                firstElement,
                markerElement,
                secondElement,
                thirdElement,
                afterElement
            ];

            const groups = [
                {
                    items: [markerElement, secondElement, thirdElement]
                }
            ];

            const result = getContentAfterMarkers(elements, groups);
            expect(result).toEqual([afterElement]);
        });

        it('should return empty array when last element is end of content', () => {
            const elements = [
                { type: 'text', content: 'first' },
                { type: 'text', content: 'last' }
            ];
            const groups = [
                {
                    items: [{ type: 'text', content: 'last' }]
                }
            ];

            const result = getContentAfterMarkers(elements, groups);
            expect(result).toEqual([]);
        });

        it('should return empty array when last element is not found', () => {
            const elements = [{ type: 'text', content: 'first' }];
            const groups = [
                {
                    items: [{ type: 'text', content: 'not-found' }]
                }
            ];

            const result = getContentAfterMarkers(elements, groups);
            expect(result).toEqual([]);
        });
    });
});
