import GetCajaManual from '../../../../components/private/LN/api/global/components/chains/LN10/getCajaManual';
import CajaWebStories from '../../../../components/chains/LN10_Caja_WebStories/json';
import LN10CajaManual from '../../../../components/chains/LN10_Caja_Manual/json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock(
    '../../../../components/private/LN/api/global/components/common/utils/_helpers.js',
    () => {
        return {
            __esModule: true,
            default: children => {
                if (!children) {
                    return null;
                }
                return children;
            },
            validateChildrensApi: children => {
                if (!children) {
                    return null;
                }
                return children;
            }
        };
    }
);

// jest.mock(
//     '../../../../components/chains/LN10_Caja_WebStories/common/_helper-WebApi.js',
//     () => {
//         return {
//             __esModule: true,
//             default: (layout, childProps = []) => {
//                 if (layout === 'error') {
//                     return { message: 'error lalala' };
//                 }
//                 return null;
//             },
//             filterWebStoriesChildren: (renderables, childrenRenders) => {
//                 return [
//                     {
//                         collection: 'features',
//                         type: 'LN-10/webStory',
//                         props: {
//                             collection: 'features',
//                             type: 'LN-10/webStory',
//                             id: 'f0fYoFVwFIO2A1xc',
//                             name: null,
//                             contentConfig: {
//                                 contentService: '',
//                                 contentConfigValues: {},
//                                 inherit: true
//                             },
//                             customFields: {
//                                 title: 'web ejemplo',
//                                 lead: 'volanta ejemplo',
//                                 imageId: 'UF5S34BB25DD5CWPOCQZGHCO3U',
//                                 link: 'link ejemplo'
//                             },
//                             displayProperties: {},
//                             localEdits: {},
//                             variants: {}
//                         },
//                         key: 'f0fYoFVwFIO2A1xc'
//                     },
//                     {
//                         collection: 'features',
//                         type: 'LN-10/webStory',
//                         props: {
//                             collection: 'features',
//                             type: 'LN-10/webStory',
//                             id: 'f0fCJd2Laznm3TU',
//                             name: null,
//                             contentConfig: {
//                                 contentService: '',
//                                 contentConfigValues: {},
//                                 inherit: true
//                             },
//                             customFields: {
//                                 title: 'web ejemplo',
//                                 lead: 'volanta ejemplo',
//                                 imageId: 'UF5S34BB25DD5CWPOCQZGHCO3U',
//                                 link: 'link ejemplo',
//                                 pbInternal_cloneId: 'f0fCJd2Laznm3TU'
//                             },
//                             displayProperties: {},
//                             localEdits: {},
//                             variants: {}
//                         },
//                         key: 'f0fCJd2Laznm3TU'
//                     },
//                     {
//                         collection: 'features',
//                         type: 'LN-10/webStory',
//                         props: {
//                             collection: 'features',
//                             type: 'LN-10/webStory',
//                             id: 'f0fqFvOcqgjm3QU',
//                             name: null,
//                             contentConfig: {
//                                 contentService: '',
//                                 contentConfigValues: {},
//                                 inherit: true
//                             },
//                             customFields: {
//                                 title: 'web ejemplo',
//                                 lead: 'volanta ejemplo',
//                                 imageId: 'UF5S34BB25DD5CWPOCQZGHCO3U',
//                                 link: 'link ejemplo',
//                                 pbInternal_cloneId: 'f0fqFvOcqgjm3QU'
//                             },
//                             displayProperties: {},
//                             localEdits: {},
//                             variants: {}
//                         },
//                         key: 'f0fqFvOcqgjm3QU'
//                     },
//                     {
//                         collection: 'features',
//                         type: 'LN-10/webStory',
//                         props: {
//                             collection: 'features',
//                             type: 'LN-10/webStory',
//                             id: 'f0frTAlGEkgm3On',
//                             name: null,
//                             contentConfig: {
//                                 contentService: '',
//                                 contentConfigValues: {},
//                                 inherit: true
//                             },
//                             customFields: {
//                                 title: 'web ejemplo',
//                                 lead: 'volanta ejemplo',
//                                 imageId: 'UF5S34BB25DD5CWPOCQZGHCO3U',
//                                 link: 'link ejemplo',
//                                 pbInternal_cloneId: 'f0frTAlGEkgm3On'
//                             },
//                             displayProperties: {},
//                             localEdits: {},
//                             variants: {}
//                         },
//                         key: 'f0frTAlGEkgm3On'
//                     }
//                 ];
//             },
//             validateChain: (filteredChildren, children) => {
//                 return '';
//             }
//         };
//     }
// );

jest.mock(
    '../../../../components/private/LN/api/global/components/chains/common/props/validatePropsChains.js',
    () => {
        return {
            __esModule: true,
            validatePropsChains: (props, typeChain, version) => {
                return props;
            }
        };
    }
);

describe('components - chains - LN10_Caja_WebStories - json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn');
        console.warn.mockImplementation(() => null);
    });

    const propsChain = {
        id: 'c0fod8IMHIJV4mB',
        typeChain: 'webstories',
        customFields: {},
        children: [
            {
                _id: 'webstory0',
                additionalProperties: {
                    title: 'web ejemplo',
                    lead: 'volanta ejemplo',
                    imageId: 'UF5S34BB25DD5CWPOCQZGHCO3U',
                    link: 'link ejemplo',
                    imagen: [Object],
                    variant: 'webstories'
                }
            },
            {
                _id: 'webstory1',
                additionalProperties: {
                    title: 'web ejemplo',
                    lead: 'volanta ejemplo',
                    imageId: 'UF5S34BB25DD5CWPOCQZGHCO3U',
                    link: 'link ejemplo',
                    pbInternal_cloneId: 'f0fCJd2Laznm3TU',
                    imagen: [Object],
                    variant: 'webstories'
                }
            },
            {
                _id: 'webstory2',
                additionalProperties: {
                    title: 'web ejemplo',
                    lead: 'volanta ejemplo',
                    imageId: 'UF5S34BB25DD5CWPOCQZGHCO3U',
                    link: 'link ejemplo',
                    pbInternal_cloneId: 'f0fqFvOcqgjm3QU',
                    imagen: [Object],
                    variant: 'webstories'
                }
            },
            {
                _id: 'webstory3',
                additionalProperties: {
                    title: 'web ejemplo',
                    lead: 'volanta ejemplo',
                    imageId: 'UF5S34BB25DD5CWPOCQZGHCO3U',
                    link: 'link ejemplo',
                    pbInternal_cloneId: 'f0frTAlGEkgm3On',
                    imagen: [Object],
                    variant: 'webstories'
                }
            }
        ],
        renderables: [{
            collection: 'sections',
            props: { collection: 'sections', id: 3 },
            children: [
              {
                collection: 'chains',
                type: 'LN10_Caja_WebStories',
                props: [Object],
                children: [Array]
              },
              {
                collection: 'chains',
                type: 'LN10_Caja_Manual',
                props: [Object],
                children: [Array]
              },
              {
                collection: 'features',
                type: 'LN-common/anexo',
                props: [Object]
              },
              {
                collection: 'chains',
                type: 'LN10_Caja_Manual',
                props: [Object],
                children: [Array]
              },
              {
                collection: 'chains',
                type: 'LN10_Caja_Manual',
                props: [Object],
                children: [Array]
              },
              {
                collection: 'chains',
                type: 'LN10_Caja_Collection',
                props: [Object],
                children: []
              },
              {
                collection: 'chains',
                type: 'LN10_Caja_Manual',
                props: [Object],
                children: [Array]
              },
              {
                collection: 'chains',
                type: 'LN10_Caja_Manual',
                props: [Object],
                children: [Array]
              },
              {
                collection: 'chains',
                type: 'LN10_Caja_Collection',
                props: [Object],
                children: []
              }
            ]
          }]
    };

    test('LN10 Caja webstory OK', () => {
        const props = { ...propsChain };
        const customFields = { ...propsChain.customFields };
        customFields.imageId = 'AAAAAABBBBBB';
        props.customFields = customFields;

        // Mock fetchContent in exteded class
        const getCajaManual = Object.getPrototypeOf(LN10CajaManual.prototype);
        getCajaManual.fetchContent = jest.fn();
        const cajaManual = LN10CajaManual;
        cajaManual.prototype.prototype = getCajaManual;

        const resultChain = new CajaWebStories(props);

        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const resultCajaWebStory = resultChain.render();

        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(resultCajaWebStory.information).toMatchObject({
            typeChain: 'webstories'
        });
    });

    test('LN10 Caja webstory when children is invalid', () => {
        const props = { ...propsChain };
        props.children = null;
        const resultChain = new CajaWebStories(props);
        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const result = resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(result).toBeNull();
    });

    test('LN10 Caja webstory when hideCaja is null', () => {
        const props = { ...propsChain };

        const customFields = { ...propsChain.customFields };
        customFields.hideCaja = null;
        props.customFields = customFields;

        const resultChain = new CajaWebStories(props);
        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const result = resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(result.information.hideCaja).toBe(false);
    });

    test('LN10 Caja webstory with validate Error', () => {
        const props = { ...propsChain };
        Object.assign({}, props.children);
        const customFields = { ...propsChain.customFields };
        customFields.layout = 'error';
        props.customFields = customFields;

        const resultChain = new CajaWebStories(props);

        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn.mock.calls[0][0]).toBe('error - ');
    });

    test('LN10 Caja webstory when throw Error', () => {
        const props = { ...propsChain };
        props.flagError = 'error';
        const resultChain = new CajaWebStories(null);
        resultChain.state.containerImage = {
            promo_items: {},
            _id:
                '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        const result = resultChain.render();
        expect(Object.keys(resultChain).sort()).toEqual(
            ['props', 'renderResponse', 'state', 'validate'].sort()
        );
        expect(result.Message).toBe("Cannot read property 'children' of null");
        expect(result.Success).toBe(false);
    });
});
