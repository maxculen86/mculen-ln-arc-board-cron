import {
    filteredChildren,
    assignPropsToChildren
} from '../../../../components/chains/LN10_Caja_Collection/common/_helper-WebApi';

describe('chains - LN10_Caja_Collection - _helper-WebApi', () => {
    describe('filteredChildren', () => {
        it('should return the child with type "LN-10/timeline"', () => {
            const children = [
                {
                    collection: 'features',
                    type: 'LN-10/timeline',
                    props: {
                        collection: 'features',
                        type: 'LN-10/timeline',
                        id: 'f0fKCiADYFp853O',
                        name: null,
                        contentConfig: {
                            contentService: '',
                            contentConfigValues: {},
                            inherit: true
                        },
                        customFields: {
                            size: 5,
                            sectionTagType: 'section',
                            sectionTagValue: '/politica',
                            collectionId: '',
                            url: '',
                            title: 'Ultimas noticias',
                            hideTitle: false,
                            source: 'byTagSection',
                            pbInternal_cloneId: 'f0fKCiADYFp853O'
                        },
                        displayProperties: {},
                        localEdits: {},
                        variants: {}
                    }
                },
                {
                    collection: 'features',
                    type: 'LN-10/article',
                    props: {
                        collection: 'features',
                        type: 'LN-10/article',
                        id: 'f0fdBEk1SX3081I',
                        name: null,
                        contentConfig: {
                            contentService: '',
                            contentConfigValues: {},
                            inherit: true
                        },
                        customFields: {
                            variant: 'regular',
                            noteId: 'XVJLNYZZ5FCG5GODV2SCRTPTMY',
                            imageId: '',
                            video: '',
                            title: '',
                            lead: ''
                        },
                        displayProperties: {},
                        localEdits: {},
                        variants: {}
                    }
                }
            ];

            expect(filteredChildren(children)).toEqual({
                collection: 'features',
                type: 'LN-10/timeline',
                props: {
                    collection: 'features',
                    type: 'LN-10/timeline',
                    id: 'f0fKCiADYFp853O',
                    name: null,
                    contentConfig: {
                        contentService: '',
                        contentConfigValues: {},
                        inherit: true
                    },
                    customFields: {
                        size: 5,
                        sectionTagType: 'section',
                        sectionTagValue: '/politica',
                        collectionId: '',
                        url: '',
                        title: 'Ultimas noticias',
                        hideTitle: false,
                        source: 'byTagSection',
                        pbInternal_cloneId: 'f0fKCiADYFp853O'
                    },
                    displayProperties: {},
                    localEdits: {},
                    variants: {}
                }
            });
        });

        it('should return undefined if no child has type "LN-10/timeline"', () => {
            const children = [
                {
                    collection: 'features',
                    type: 'LN-10/article',
                    props: {
                        collection: 'features',
                        type: 'LN-10/article',
                        id: 'f0fdBEk1SX3081I',
                        name: null,
                        contentConfig: {
                            contentService: '',
                            contentConfigValues: {},
                            inherit: true
                        },
                        customFields: {
                            variant: 'regular',
                            noteId: 'XVJLNYZZ5FCG5GODV2SCRTPTMY',
                            imageId: '',
                            video: '',
                            title: '',
                            lead: ''
                        },
                        displayProperties: {},
                        localEdits: {},
                        variants: {}
                    }
                }
            ];

            expect(filteredChildren(children)).toBeUndefined();
        });

        it('should return undefined for an empty array', () => {
            expect(filteredChildren([])).toBeUndefined();
        });
    });

    describe('assignPropsToChildren', () => {
        it('should map children with corresponding childProps', () => {
            const children = ['child1', 'child2'];
            const childProps = [{ prop1: 'value1' }, { prop1: 'value2' }];

            const result = assignPropsToChildren(children, childProps);

            expect(result).toEqual([
                { nodo: 'child1', prop1: 'value1' },
                { nodo: 'child2', prop1: 'value2' }
            ]);
        });

        it('should handle case when childProps is shorter than children', () => {
            const children = ['child1', 'child2'];
            const childProps = [{ prop1: 'value1' }];

            const result = assignPropsToChildren(children, childProps);

            expect(result).toEqual([
                { nodo: 'child1', prop1: 'value1' },
                { nodo: 'child2' }
            ]);
        });

        it('should handle case when childProps is undefined', () => {
            const children = ['child1', 'child2'];

            const result = assignPropsToChildren(children);

            expect(result).toEqual([{ nodo: 'child1' }, { nodo: 'child2' }]);
        });

        it('should handle case when children is undefined', () => {
            const result = assignPropsToChildren();

            expect(result).toEqual([]);
        });
    });
});
