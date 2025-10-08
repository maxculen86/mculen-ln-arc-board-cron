import React from 'react';
import {
    checkChangeChildrenForPB,
    setWrappedChildren,
    checkVariants,
    getParentChildren,
    useGetLinks,
    useGetLogo,
    useRoofData,
    setStaticDynamically
} from '../../../../components/chains/utils/_helpers';
import useGetLogoImage from '../../../../components/private/common/hooks/useGetLogoImage';
import { useContent } from 'fusion:content';
import renderablesWithVariants from '../../../../__mocks__/data/renderables/dataWithVariants.json';
import renderablesWithoutVariants from '../../../../__mocks__/data/renderables/data1.json';
import StaticContentV2 from '../../../../components/chains/LN10-global/staticContentV2';

jest.mock('fusion:content', () => ({
    __esModule: true,
    useContent: jest.fn()
}));

jest.mock(
    '../../../../components/private/common/hooks/useGetLogoImage',
    () => ({
        __esModule: true,
        default: jest.fn((id, isHome) => {
            if (id === null || id === undefined) {
                return {
                    caption: '',
                    width: '',
                    height: '',
                    url: ''
                };
            }
            return {
                caption: 'Logo Caption',
                width: '100px',
                height: '50px',
                url: 'https://example.com/logo.png'
            };
        })
    })
);

const childrenWithVariants = [
    { key: 'f0f5lkDRl4911cD' },
    { key: 'f0f2JWjLLLl75AR' },
    { key: 'f0fPoecULLl75Nm' },
    { key: 'f0fmd4f6MLl75SR' },
    { key: 'f0fjat9aMLl75Ax' }
];

describe('Components - Chains - Utils - _helpers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useContent.mockReset();
    });

    describe('checkVariants helper', () => {
        it('should return true when there are variants using children', () => {
            const hasVariants = checkVariants({
                renderables: renderablesWithVariants,
                children: childrenWithVariants
            });

            expect(hasVariants).toEqual(true);
        });

        it('should return false when there are not variants using children', () => {
            const hasVariants = checkVariants({
                renderables: renderablesWithoutVariants,
                children: childrenWithVariants
            });

            expect(hasVariants).toEqual(false);
        });

        it('should return true when there are variants using featureId', () => {
            const hasVariants = checkVariants({
                renderables: renderablesWithVariants,
                featureId: 'f0f5lkDRl4911cD'
            });

            expect(hasVariants).toEqual(true);
        });

        it('should return true when there are not variants using featureId', () => {
            const hasVariants = checkVariants({
                renderables: renderablesWithoutVariants,
                featureId: 'f0f5lkDRl4911cD'
            });

            expect(hasVariants).toEqual(false);
        });

        it('should return false if renderables is an empty array', () => {
            const hasVariants = checkVariants({
                renderables: [],
                featureId: 'f0f5lkDRl4911cD'
            });

            expect(hasVariants).toEqual(false);
        });

        it('should return false without arguments', () => {
            const hasVariants = checkVariants();
            expect(hasVariants).toEqual(false);
        });

        it('should return false when renderables is empty and children is not provided', () => {
            const hasVariants = checkVariants({ renderables: [] });
            expect(hasVariants).toEqual(false);
        });

        it('should return false when children and renderables are both empty', () => {
            const hasVariants = checkVariants({
                children: [],
                renderables: []
            });
            expect(hasVariants).toEqual(false);
        });
    });

    describe('getParentChildren helper', () => {
        it('should return children if the feature id is inside renderable children list', () => {
            const mockParent = renderablesWithVariants.find(
                renderable => renderable.props.id === 'c0fyjWb4m4911Q6'
            );
            const children = getParentChildren(
                'f0f5lkDRl4911cD',
                renderablesWithVariants
            );

            expect(children).toMatchObject(mockParent.children);
        });

        it('should return empty array if the feature id is not inside renderable children list', () => {
            const children = getParentChildren(
                'f0f5lkDRl4911cDx',
                renderablesWithVariants
            );
            expect(children).toEqual([]);
        });

        it('should return empty array without arguments', () => {
            const children = getParentChildren();
            expect(children).toEqual([]);
        });

        it('should return empty array when featureId is not found in renderables', () => {
            const children = getParentChildren(
                'nonExistentFeatureId',
                renderablesWithVariants
            );
            expect(children).toEqual([]);
        });

        it('should return an empty array when renderables is an empty array', () => {
            const renderables = [];
            const children = getParentChildren('featureId', renderables);
            expect(children).toEqual([]);
        });
    });

    describe('checkChangeChildrenForPB helper', () => {
        it('should not update children when features and children are in the same order', () => {
            const features = [
                { props: { id: '1' } },
                { props: { id: '2' } },
                { props: { id: '3' } }
            ];
            const children = [{ key: '1' }, { key: '2' }, { key: '3' }];
            const setUpdateChildrens = jest.fn();
            const layout = 'timeline';

            checkChangeChildrenForPB({
                features,
                children,
                setUpdateChildrens,
                layout
            });

            expect(setUpdateChildrens).not.toHaveBeenCalled();
        });

        it('should update children when features and children are in different order', () => {
            const features = [
                { props: { id: '1' } },
                { props: { id: '2' } },
                { props: { id: '3' } }
            ];
            const children = [{ key: '3' }, { key: '1' }, { key: '2' }];
            const setUpdateChildrens = jest.fn();
            const layout = 'timeline';

            checkChangeChildrenForPB({
                features,
                children,
                setUpdateChildrens,
                layout
            });

            expect(setUpdateChildrens).toHaveBeenCalled();
        });

        it('should not update children when features and children are empty', () => {
            const features = [];
            const children = [];
            const setUpdateChildrens = jest.fn();
            const layout = 'timeline';

            checkChangeChildrenForPB({
                features,
                children,
                setUpdateChildrens,
                layout
            });

            expect(setUpdateChildrens).not.toHaveBeenCalled();
        });

        it('should update children when features and children have different lengths', () => {
            const features = [
                { props: { id: '1' } },
                { props: { id: '2' } },
                { props: { id: '3' } }
            ];
            const children = [{ key: '1' }, { key: '2' }];
            const setUpdateChildrens = jest.fn();
            const layout = 'timeline';

            checkChangeChildrenForPB({
                features,
                children,
                setUpdateChildrens,
                layout
            });

            expect(setUpdateChildrens).toHaveBeenCalled();
        });

        it('should update children when features and children are in different order', () => {
            const features = [
                { props: { id: '1' } },
                { props: { id: '2' } },
                { props: { id: '3' } }
            ];
            const children = [{ key: '3' }, { key: '1' }, { key: '2' }];
            const setUpdateChildrens = jest.fn();
            const layout = 'timeline';

            checkChangeChildrenForPB({
                features,
                children,
                setUpdateChildrens,
                layout
            });

            expect(setUpdateChildrens).toHaveBeenCalled();
        });

        it('should not update children when features and children are empty', () => {
            const features = [];
            const children = [];
            const setUpdateChildrens = jest.fn();
            const layout = 'timeline';

            checkChangeChildrenForPB({
                features,
                children,
                setUpdateChildrens,
                layout
            });

            expect(setUpdateChildrens).not.toHaveBeenCalled();
        });

        it('should not update children when renderables is empty and children is not provided', () => {
            const features = [
                { props: { id: '1' } },
                { props: { id: '2' } },
                { props: { id: '3' } }
            ];
            const children = [];
            const setUpdateChildrens = jest.fn();
            const layout = 'timeline';

            checkChangeChildrenForPB({
                features,
                children,
                setUpdateChildrens,
                layout
            });

            expect(setUpdateChildrens).not.toHaveBeenCalled();
        });

        it('should not update children when children have no keys', () => {
            const features = [
                { props: { id: '1' } },
                { props: { id: '2' } },
                { props: { id: '3' } }
            ];
            const children = [{}, {}, {}];
            const setUpdateChildrens = jest.fn();
            const layout = 'timeline';

            checkChangeChildrenForPB({
                features,
                children,
                setUpdateChildrens,
                layout
            });

            expect(setUpdateChildrens).not.toHaveBeenCalled();
        });
    });

    describe('setWrappedChildren helper', () => {
        it('should return an array of React components when given an array of renderables and features', () => {
            const renderables = [
                { type: 'LN-acumulado/timeline', props: { id: '1' } }
            ];
            const features = [{ key: '1' }];
            const result = setWrappedChildren(renderables, features);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(1);
            expect(React.isValidElement(result[0])).toBe(true);
        });

        it('should wrap a feature with a custom wrapper when the type matches a key in the customWrappers object', () => {
            const renderables = [
                { type: 'LN-acumulado/timeline', props: { id: '1' } }
            ];
            const features = [{ key: '1' }];
            const result = setWrappedChildren(renderables, features);
            expect(result.length).toBe(1);
            expect(result[0].type).toBe('div');
            expect(result[0].props.className).toBe('timeline-home');
            expect(result[0].props.children.type).toBe('div');
            expect(result[0].props.children.props.className).toBe(
                'timeline-content'
            );
            expect(result[0].props.children.props.children).toBe(features[0]);
        });

        it('should return an array of features when the type does not match a key in the customWrappers object', () => {
            const renderables = [{ type: 'other', props: { id: '1' } }];
            const features = [{ key: '1' }];
            const result = setWrappedChildren(renderables, features);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(1);
            expect(result[0]).toBe(features[0]);
        });

        it('should return an empty array when given an empty array of renderables', () => {
            const renderables = [];
            const features = [{ key: '1' }];
            const result = setWrappedChildren(renderables, features);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(0);
        });

        it('should return an empty array when none of the renderables match a feature', () => {
            const renderables = [{ type: 'other', props: { id: '1' } }];
            const features = [{ key: '2' }];
            const result = setWrappedChildren(renderables, features);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(0);
        });
    });

    describe('useGetLinks helper', () => {
        it('should return an empty array when given an empty navigationSection', () => {
            useContent.mockReturnValue({ children: [] });

            const result = useGetLinks({ navigationSection: '' });

            expect(result).toEqual([]);
        });

        it('should return an empty array when useContent returns undefined', () => {
            useContent.mockReturnValue(undefined);

            const result = useGetLinks({ navigationSection: 'section1' });

            expect(result).toEqual([]);
        });

        it('should return an empty array when useContent returns an object without children', () => {
            useContent.mockReturnValue({});

            const result = useGetLinks({ navigationSection: 'section1' });

            expect(result).toEqual([]);
        });
    });

    describe('useGetLogo helper', () => {
        it('should return logo object with correct properties when logo object is returned from useGetLogoImage', () => {
            const result = useGetLogo('logo-id', 'logo-title');

            expect(result).toEqual({
                src: 'https://example.com/logo.png',
                className: 'w-100',
                alt: 'logo-title',
                height: '50px',
                width: '100px'
            });
        });

        it('should return logo object with empty src, alt, height, and width properties when logo object returned from useGetLogoImage is null or undefined', () => {
            const resultNull = useGetLogo(null, 'logo-title');

            expect(resultNull).toEqual({
                src: '',
                alt: 'logo-title',
                className: 'w-100',
                height: '',
                width: ''
            });

            const resultUndefined = useGetLogo(undefined, 'logo-title');

            expect(resultUndefined).toEqual({
                src: '',
                alt: 'logo-title',
                className: 'w-100',
                height: '',
                width: ''
            });
        });
    });

    describe('useRoofData helper', () => {
        it('should return an object with expected properties when all props are provided', () => {
            const props = {
                title: 'Test Title',
                hideTitle: false,
                chainStyle: 'testStyle',
                link: 'testLink',
                logoId: 'testLogoId',
                navigator: 'testNavigator',
                buttonText: 'Test Button Text',
                buttonLogo: 'Test Button Logo',
                linkButton: 'testButtonLink',
                buttonStyle: 'testButtonStyle',
                isAdmin: true,
                isManual: false
            };

            const expected = {
                title: 'Test Title',
                titleLink: 'testLink',
                logo: {
                    src: 'https://example.com/logo.png',
                    alt: 'Test Title',
                    className: 'w-100',
                    height: '50px',
                    width: '100px'
                },
                logoId: 'testLogoId',
                buttonLogo: {
                    src: 'https://example.com/logo.png',
                    alt: 'Test Title',
                    className: undefined,
                    height: '50px',
                    width: '100px'
                },
                buttonText: 'Test Button Text',
                linkButton: 'testButtonLink',
                buttonStyle: 'testButtonStyle',
                hideRoof: false,
                links: [],
                navigationId: 'testNavigator',
                isAdmin: true,
                chainStyle: 'testStyle',
                isManual: false
            };

            const result = useRoofData(props);

            expect(result).toEqual(expected);
        });

        it('should return default values when some props are missing', () => {
            const props = {
                title: 'Test Title',
                navigator: 'testNavigator',
                buttonText: 'Test Button Text',
                isAdmin: true
            };

            const expected = {
                title: 'Test Title',
                titleLink: undefined,
                logo: {
                    src: '',
                    alt: 'Test Title',
                    className: 'w-100',
                    height: '',
                    width: ''
                },
                logoId: undefined,
                buttonLogo: {
                    src: '',
                    alt: 'Test Title',
                    className: undefined,
                    height: '',
                    width: ''
                },
                buttonText: 'Test Button Text',
                linkButton: undefined,
                buttonStyle: undefined,
                hideRoof: undefined,
                links: [],
                navigationId: 'testNavigator',
                isAdmin: true,
                chainStyle: undefined,
                isManual: undefined
            };

            const result = useRoofData(props);
            expect(result).toEqual(expected);
        });

        it('should avoid loading assets when shouldLoadRoof is false', () => {
            useContent.mockReturnValue({ children: [] });

            const props = {
                title: 'Test Title',
                hideTitle: false,
                chainStyle: 'testStyle',
                logoId: 'testLogoId',
                navigator: 'testNavigator',
                buttonLogo: 'Test Button Logo',
                shouldLoadRoof: false,
                isStatic: false
            };

            useRoofData(props);

            expect(useGetLogoImage).toHaveBeenNthCalledWith(1, false, false);
            expect(useGetLogoImage).toHaveBeenNthCalledWith(2, false, false);
            expect(useContent).toHaveBeenCalledWith(
                expect.objectContaining({
                    source: null,
                    staticMode: false
                })
            );
        });

        it('should avoid loading assets when hideTitle is true', () => {
            useContent.mockReturnValue({ children: [] });

            const props = {
                title: 'Test Title',
                hideTitle: true,
                chainStyle: 'testStyle',
                logoId: 'testLogoId',
                navigator: 'testNavigator',
                buttonLogo: 'Test Button Logo',
                isStatic: true
            };

            const result = useRoofData(props);

            expect(useGetLogoImage).toHaveBeenNthCalledWith(1, false, true);
            expect(useGetLogoImage).toHaveBeenNthCalledWith(2, false, true);
            expect(useContent).toHaveBeenCalledWith(
                expect.objectContaining({
                    source: null,
                    staticMode: true
                })
            );
            expect(result.hideRoof).toBe(true);
        });
    });

    describe('setStaticDynamically helper', () => {
        it('should render Component wrapped in StaticContent when exception is falsy', () => {
            const Component = <div>Component</div>;
            const exception = false;
            const props = {};

            const result = setStaticDynamically(Component, exception, props);

            expect(result).toEqual(
                <StaticContentV2 id="">{Component}</StaticContentV2>
            );
        });

        it('should render Component without StaticContent when exception is truthy', () => {
            const Component = <div>Component</div>;
            const exception = true;
            const props = {};

            const result = setStaticDynamically(Component, exception, props);

            expect(result).toEqual(<div>{Component}</div>);
        });

        it('should render Component wrapped in StaticContent when exception is falsy and props are empty', () => {
            const Component = <div>Component</div>;
            const exception = false;
            const props = {};

            const result = setStaticDynamically(Component, exception, props);

            expect(result).toEqual(
                <StaticContentV2 id="">{Component}</StaticContentV2>
            );
        });
    });
});
