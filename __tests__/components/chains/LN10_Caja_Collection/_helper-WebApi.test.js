import {
    filteredChildren,
    assignPropsToChildren,
    getBreakingChildren
} from '../../../../components/chains/LN10_Caja_Collection/common/_helper-WebApi';
import getChildrenBySection from '../../../../components/chains/utils/getChildrenBySection';

jest.mock('../../../../components/chains/utils/getChildrenBySection');

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

    describe('getBreakingChildren', () => {
        const renderables = [{ id: 1 }, { id: 2 }];

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return a flattened array of children from both sections', () => {
            getChildrenBySection.mockImplementation(({ section }) => {
                if (section.title === 'Breaking_1')
                    return [{ id: 'a' }, { id: 'b' }];
                if (section.title === 'Breaking_2') return [{ id: 'c' }];
                return [];
            });

            const result = getBreakingChildren(renderables);
            expect(result).toEqual([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);
        });

        it('should handle cases where getChildrenBySection returns null', () => {
            getChildrenBySection.mockReturnValue(undefined);

            const result = getBreakingChildren(renderables);
            expect(result).toEqual([]);
        });
    });
});
